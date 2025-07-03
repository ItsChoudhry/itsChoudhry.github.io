// Simple markdown parser for blog posts
class BlogParser {
  constructor() {
    this.posts = [];
  }

  // Fetch a single post by slug
  async fetchSinglePost(slug) {
    try {
      const filename = `${slug}.md`;
      const cacheBuster = `?v=${Date.now()}`;
      const response = await fetch(`./posts/${filename}${cacheBuster}`);
      if (response.ok) {
        const content = await response.text();
        const parsed = this.parseMarkdown(content);
        
        return {
          slug,
          ...parsed,
          excerpt: parsed.frontmatter.excerpt || this.generateExcerpt(parsed.content),
          formattedDate: this.formatDate(parsed.frontmatter.date)
        };
      } else {
        throw new Error(`Post ${slug} not found`);
      }
    } catch (error) {
      console.error(`Failed to fetch post ${slug}:`, error);
      return null;
    }
  }

  // Fetch markdown files from the posts directory
  async fetchPostsFromDirectory() {
    try {
      // Get list of markdown files in the posts directory
      const postFiles = ['test.md']; // Since we know there's only test.md for now
      const posts = [];

      for (const filename of postFiles) {
        try {
          const response = await fetch(`./blog/posts/${filename}`);
          if (response.ok) {
            const content = await response.text();
            const parsed = this.parseMarkdown(content);
            const slug = filename.replace('.md', '');
            
            posts.push({
              slug,
              ...parsed,
              excerpt: parsed.frontmatter.excerpt || this.generateExcerpt(parsed.content),
              formattedDate: this.formatDate(parsed.frontmatter.date)
            });
          }
        } catch (error) {
          console.warn(`Failed to load post ${filename}:`, error);
        }
      }

      // Sort posts by date (newest first)
      posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
      
      return posts;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  }

  // Parse markdown frontmatter and content
  parseMarkdown(content) {
    const lines = content.split("\n");
    let frontmatter = {};
    let markdownContent = "";
    let inFrontmatter = false;
    let frontmatterEnd = 0;

    // Parse frontmatter
    if (lines[0] === "---") {
      inFrontmatter = true;
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === "---") {
          frontmatterEnd = i + 1;
          break;
        }
        const [key, ...valueParts] = lines[i].split(":");
        if (key && valueParts.length > 0) {
          frontmatter[key.trim()] = valueParts.join(":").trim();
        }
      }
    }

    // Get content after frontmatter
    markdownContent = lines.slice(frontmatterEnd).join("\n");

    return {
      frontmatter,
      content: this.markdownToHtml(markdownContent),
    };
  }

  // Convert markdown to HTML
  markdownToHtml(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Line breaks and paragraphs
    html = html.replace(/\n\n/g, "</p><p>");
    html = "<p>" + html + "</p>";

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, "");
    html = html.replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, "$1");
    html = html.replace(/<p>(<pre><code>[\s\S]*?<\/code><\/pre>)<\/p>/g, "$1");

    return html;
  }

  // Generate excerpt from content
  generateExcerpt(content, maxLength = 150) {
    const textOnly = content.replace(/<[^>]*>/g, "");
    return textOnly.length > maxLength
      ? textOnly.substring(0, maxLength) + "..."
      : textOnly;
  }

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// Initialize parser
const parser = new BlogParser();

// Initialize blog posts (will be populated asynchronously)
window.blogPosts = [];
window.blogParser = parser;

// Load posts from directory
async function loadBlogPosts() {
  try {
    const posts = await parser.fetchPostsFromDirectory();
    window.blogPosts = posts;
    
    // Trigger a custom event to notify when posts are loaded
    window.dispatchEvent(new CustomEvent('blogPostsLoaded', { detail: posts }));
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    window.blogPosts = [];
  }
}

// Auto-load posts when the script loads
loadBlogPosts();


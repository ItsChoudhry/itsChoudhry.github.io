# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Choudhry, a Software Engineer. The site is hosted on GitHub Pages and features a sophisticated dark theme with a complete blog system built on client-side markdown parsing.

## Architecture

This is a modern static HTML website with the following structure:

- **Main Pages**: `index.html` (landing page), `about.html` (detailed bio), `projects.html` (projects listing), `blog.html` (blog listing)
- **Blog System**: Client-side markdown blog system with individual post pages
- **Project Pages**: Individual project pages in the `projects/` directory
- **Styling**: Enhanced CSS with card-based layouts, animations, and responsive design
- **Assets**: Images stored in the `images/` directory
- **Domain**: Custom domain configured via `CNAME` file

## Key Files

- `index.html`: Landing page with work highlights and CTA buttons
- `about.html`: Detailed biography and professional background
- `blog.html`: Blog listing page with JavaScript-rendered post cards
- `blog/post.html`: Individual blog post template with dynamic content loading
- `blog/blog-parser.js`: Client-side markdown parser and blog post data
- `blog/posts/*.md`: Markdown blog posts with frontmatter
- `projects.html`: Project listing page
- `projects/keyboard.html`: Individual project showcase page
- `styles.css`: Comprehensive styling with dark theme, cards, animations, and responsive design
- `CNAME`: Domain configuration for GitHub Pages

## Blog System

The blog system is fully client-side and requires no build process:

- **Blog Posts**: Written in markdown with YAML frontmatter in `blog/posts/`
- **Parser**: JavaScript class in `blog-parser.js` handles markdown-to-HTML conversion
- **Post Data**: Currently embedded in `blog-parser.js` (in production, this could be generated from markdown files)
- **Frontmatter**: Each post supports title, date, and excerpt fields
- **Navigation**: URL-based routing using query parameters for individual posts

### Adding New Blog Posts

1. Create a new `.md` file in `blog/posts/`
2. Add frontmatter with title, date, and excerpt
3. Write content in markdown
4. Add post data to the `blogPosts` array in `blog/blog-parser.js`

## Development Notes

- This is a static site hosted on GitHub Pages - no build process required
- Changes are deployed automatically when pushed to the main branch
- Uses semantic HTML5 structure with modern CSS Grid and Flexbox layouts
- Georgia serif font for improved readability
- Consistent color palette: dark background (#181616) with carefully chosen accent colors
- SVG icons include the new X (Twitter) logo
- Hover effects and subtle animations enhance user experience
- Responsive design works on all device sizes

## Design System

### Color Palette
- Background: `#181616` (dark charcoal)
- Primary text: `#8992a7` (muted blue-gray)
- Headings: `#c4746e` (muted coral), `#c4b28a` (warm beige), `#a9b8c8` (light blue-gray)
- Accents: `#8ea4a2` (sage green), `#b6927b` (warm brown)

### Components
- Card-based layouts for blog posts and work items
- CTA buttons with hover effects
- Navigation with active states
- Code blocks with syntax highlighting
- Responsive grid systems

## GitHub Pages Deployment

The site is automatically deployed via GitHub Pages when changes are pushed to the main branch. No additional build or deployment steps are needed.

## Content Structure

- Professional landing page with work highlights
- Comprehensive about page with BJJ achievements
- Project showcase with individual project pages
- Blog system with technical and personal posts
- Social media integration (X and GitHub)
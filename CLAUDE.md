# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js and Decap CMS (formerly Netlify CMS). The site is a JAMstack application using static site generation with a git-based CMS for content management.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Build and export static site
npm run export
```

### Local CMS Development

To edit content locally through the CMS interface without authentication:

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npx decap-server
```

Then navigate to `http://localhost:3000/admin` and click "Work with Local Git Repository". This bypasses Netlify Identity authentication and allows direct editing of local markdown files in the `content/` directory.

## Architecture

### Content Management Architecture

The site uses **Decap CMS** for content management with a git-based backend:

- **CMS Configuration**: `public/admin/config.yml` defines all content types and fields
- **Content Storage**: All content is stored as Markdown files in the `content/` directory
- **CMS Admin**: Access via `/admin` route (`src/pages/admin.js`)
- **Frontmatter Loading**: Uses `frontmatter-markdown-loader` webpack plugin configured in `next.config.js` to parse `.md` files and make them importable as React components

Content is structured into:
- **Global Components**: Header and footer configuration (`content/global/`)
- **Pages**: Page-specific content (`content/home.md`, `content/services.md`, etc.)
- **Collections**: Blog posts and service items in subdirectories

### Application Structure

```
src/
├── components/     # React components organized by feature
│   ├── Layout/    # Main layout wrapper with Header/Footer
│   ├── Header/    # Site header and navigation
│   ├── Footer/    # Site footer
│   ├── Hero/      # Hero sections
│   ├── BannerCTA/ # Call-to-action banners
│   └── ...
├── pages/         # Next.js pages (file-based routing)
├── context/       # React Context providers
├── libs/          # Utility libraries
└── styles/        # Global SCSS and component styles
```

### Key Technical Patterns

**Content Loading Pattern**: Pages import markdown content directly:
```javascript
import { attributes, react as HomeContent } from '../../content/home.md'
```

**Global State**: Uses React Context (`MainContext`) for shared state like popup visibility.

**Layout System**: All pages wrap content in the `Layout` component which includes:
- Global Head metadata
- Header and Footer components
- Smooth scroll anchor link handling with header offset
- Inter font from Google Fonts

**Styling**: Hybrid approach using:
- Tailwind CSS for utility classes (configured with custom colors: darkgray, lightblue, magenta)
- SCSS modules for component-specific styles
- Global SCSS in `src/styles/globals.scss`

**Animations**: Uses GSAP library for animations (imported in various components)

## CMS Content Editing

To edit content:
1. Run `npm run dev`
2. Navigate to `/admin` in browser
3. Login with Netlify Identity (production) or use local backend (development)
4. Edit content through the CMS interface
5. Changes are saved directly to markdown files in `content/`

The CMS configuration supports:
- Page content editing (Home, About, Services, Portfolio, Blog, Contact)
- Blog post management
- Global component editing (Header, Footer)
- Service items management

## Deployment

The site is configured for Netlify deployment:
- Uses `@netlify/plugin-nextjs` for Next.js compatibility
- Netlify Identity widget for CMS authentication
- Git Gateway backend for CMS

## Important Notes

- This project has no test suite configured
- Media files are stored in `public/img/` and referenced in CMS as `img/...`
- The site includes NetlifyCMS identity widget script in page heads for authentication
- Custom smooth scroll implementation handles anchor links with header offset compensation

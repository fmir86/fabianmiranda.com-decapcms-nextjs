# Fabian Miranda - Portfolio Website

A modern, high-performance portfolio website built with Next.js and Decap CMS (formerly Netlify CMS). This JAMstack application uses static site generation with a git-based CMS for seamless content management.

## Tech Stack

- **Framework**: Next.js 16 (Pages Router), React 19
- **CMS**: Decap CMS (git-based)
- **Styling**: Tailwind CSS + SCSS Modules
- **Animations**: GSAP
- **Deployment**: Netlify
- **Content**: Markdown with frontmatter

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm (the repo ships a `package-lock.json`)

### Installation

```bash
# Clone the repository
git clone https://github.com/fmir86/fabianmiranda.com-decapcms-nextjs.git

# Navigate to project directory
cd fabianmiranda.com-decapcms-nextjs

# Install dependencies
npm ci
```

### Environment variables

Copy `.env.example` to `.env.local`. Every variable is optional for local work: the site builds and renders without them. Only the Alfred chat widget (`/api/chat`, `/api/chat-log`) needs the Google AI and Supabase keys; without them the widget shows its "unavailable" message.

### Development

**Basic Development Server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Local CMS Development

To edit content through the CMS interface locally **without authentication**:

**Terminal 1** - Start dev server:
```bash
npm run dev
```

**Terminal 2** - Start Decap CMS local proxy:
```bash
npx decap-server
```

Then:
1. Navigate to `http://localhost:3000/admin`
2. Click **"Work with Local Git Repository"**
3. Edit content directly - changes save to local markdown files in `content/`

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

`npm run build` also runs `next-sitemap` (postbuild), which rewrites `public/sitemap.xml`.

### Tests

End-to-end tests for the chat widget use Playwright and mock the chat API, so they need no API keys. They start `npm run dev` on port 3000 automatically.

```bash
npx playwright install chromium   # first run only
npm test
```

## Project Structure

```
├── content/                 # CMS content (markdown files)
│   ├── case-studies/       # Portfolio case studies
│   ├── global/             # Header & footer config
│   ├── blog/               # Blog posts
│   └── *.md                # Page content
├── public/
│   ├── admin/
│   │   └── config.yml      # Decap CMS configuration
│   ├── images/             # Image assets
│   └── video/              # Video assets
├── src/
│   ├── components/         # React components
│   ├── context/            # React Context providers
│   ├── libs/               # Utility functions
│   ├── pages/              # Next.js pages (file-based routing)
│   └── styles/             # Global styles & SCSS modules
└── next.config.js          # Next.js + webpack config
```

## Content Management

### Adding Case Studies

Case studies appear on both the homepage ("Work That Drives Results") and the `/work` page.

**Via CMS (Recommended):**
1. Start local CMS development (see above)
2. Go to `http://localhost:3000/admin`
3. Navigate to **Case Studies** collection
4. Click **New Case Study**
5. Fill in the fields and publish
6. Rebuild: `npm run build`

**Manually:**
1. Create a new `.md` file in `content/case-studies/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Project Name"
   description: "Project description..."
   image: "/images/work-samples/project-cover.jpg"
   tags:
     - "Next.js"
     - "TailwindCSS"
   live_url: "https://example.com"
   highlights:
     - "Feature 1"
     - "Feature 2"
   impact: "Impact statement..."
   featured: false
   order: 5
   ---
   ```
3. Rebuild: `npm run build`

### Editing Pages

All page content is managed through markdown files in `content/`:
- Homepage: `content/home.md`
- About: `content/about.md`
- Services: `content/services.md`
- Work: `content/work.md`
- Contact: `content/contact.md`
- Blog: `content/blog.md`

Edit via CMS at `/admin` or directly in the markdown files.

## Key Features

- **🎨 Single Source of Truth**: Case studies managed in one place, appear everywhere
- **⚡ Static Site Generation**: Lightning-fast page loads
- **📝 Git-based CMS**: Content stored as markdown, versioned with git
- **🎯 SEO Optimized**: Proper meta tags and semantic HTML
- **📱 Responsive Design**: Mobile-first approach
- **🔄 Smooth Animations**: GSAP-powered interactions
- **🎨 Tailwind + SCSS**: Flexible styling with utility classes and component modules

## Deployment

The site is configured for Netlify deployment:

1. Push changes to main branch
2. Netlify automatically builds and deploys
3. CMS changes trigger rebuilds via webhooks

### Environment Setup

For production CMS access, configure Netlify Identity and Git Gateway in the Netlify dashboard.

## Architecture Notes

- **Markdown Loading**: Uses `frontmatter-markdown-loader` webpack plugin to import `.md` files as React components
- **Content Loading**: `src/libs/loadCaseStudies.js` dynamically loads all case studies at build time
- **Layout System**: Global layout wrapper handles header, footer, and smooth scroll navigation
- **Styling Strategy**: Hybrid approach - Tailwind for utilities, SCSS modules for components

## License

ISC

## Author

Fabian Miranda Palma

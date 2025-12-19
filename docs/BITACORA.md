# Bitácora del Proyecto - fabianmiranda.com

Este documento mantiene un registro de todas las mejoras, cambios y decisiones tomadas en el proyecto.

---

## Contexto del Proyecto

**Objetivo principal:** Mejorar el posicionamiento SEO/GEO del sitio para búsquedas relacionadas con:
- Nearshore development
- Digital production nearshore
- AI consulting / AI development
- AI-powered development
- App/Web application development
- Keywords relacionadas con Costa Rica

**Stack técnico:**
- Next.js 14 con SSG
- Decap CMS (contenido en markdown)
- Netlify (hosting)
- TailwindCSS + SCSS

---

## Sesión: 2025-12-19

### Plan de SEO en 4 Fases (acordado con el usuario)

1. **Fase 1: Schema Markup** - ✅ Completado (antes de esta sesión)
2. **Fase 2: Technical SEO** - ✅ Completado
3. **Fase 3: Content Optimization** - ✅ Completado
4. **Fase 4: Off-page SEO** - 📋 Pendiente (backlinks, directorios)

---

### Cambios Realizados

#### 1. Security Headers (commit: 5f3fb65, a6d3f8a)
**Archivo:** `netlify.toml`, `next.config.js`

Headers implementados:
- `Strict-Transport-Security` (HSTS) - 1 año
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (restringe APIs del navegador)
- `Content-Security-Policy` (permite GA, Google Fonts, Netlify, Decap CMS)

**Nota:** Inicialmente se configuró en `netlify.toml` pero el plugin de Netlify lo sobrescribía. Se movió a `next.config.js` que tiene prioridad.

#### 2. Preconnect/Prefetch Hints (commit: 5f3fb65)
**Archivo:** `src/components/Layout/Layout.js`

- `preconnect` a fonts.googleapis.com y fonts.gstatic.com
- `preconnect` a googletagmanager.com
- `dns-prefetch` a google-analytics.com
- Meta `theme-color` para light/dark mode

#### 3. Cache Headers (commit: 5f3fb65)
**Archivo:** `netlify.toml`

- Assets estáticos (`/_next/static/*`): 1 año, immutable
- Imágenes (`/img/*`, `/images/*`): 1 mes + stale-while-revalidate
- Fonts (`.woff`, `.woff2`): 1 año, immutable
- Favicons/manifest: 1 semana

#### 4. Página 404 Personalizada (commit: 5f3fb65)
**Archivo:** `src/pages/404.js`

- Diseño consistente con el sitio (dark theme, colores lightblue/magenta)
- CTAs: "Back to Home" y "Contact Me"
- Links de navegación a secciones principales
- SEO meta tags apropiados

#### 5. Optimización de Contenido para Keywords (commit: 166b81b)
**Archivos modificados:**
- `src/components/Hero/Hero.js` - Mención de Costa Rica, nearshore, AI-powered
- `src/components/ThreeColumns/ThreeColumns.js` - "Development" → "AI-Powered Development", "Tech Consultancy" → "AI Consulting"
- `src/components/AboutMe/AboutMe.js` - "nearshore software developer based in Costa Rica"
- `src/pages/index.js` - Meta title y description optimizados
- `src/pages/services.js` - Meta y subtitle con nearshore + Costa Rica
- `src/components/SEO/SchemaMarkup.js` - Services schema con terminología nearshore

#### 6. Internal Linking (commit: 41ab279)
**Archivos modificados:**

Blog posts:
- `content/blog/2024-10-31-hello-world-launching-my-tech-journey-log.md` → Links a beyond-vibe-coding, nearshore-advantage, work, contact
- `content/blog/2025-10-31-beyond-vibe-coding.md` → Links a services (AI consulting), work
- `content/blog/2025-12-18-react-under-siege.md` → Links a contact, services (development)
- `content/blog/nearshore-advantage-costa-rica-tech-hub.md` → Links a about, work, contact

Páginas:
- `src/pages/about.js` → Links a nearshore blog post, portfolio, services, contact, beyond-vibe-coding blog
- `src/pages/services.js` → Links a case studies (contabilidad, mario-miranda), beyond-vibe-coding blog

#### 7. Mejoras de Alt Text (commit: 5f61b8a)
**Archivos modificados:**
- `src/pages/about.js` - Alt mejorado: "San José, Costa Rica skyline - nearshore software development hub for US companies"
- `src/pages/blog/[slug].js` - Alt: "Featured image for article: {title}"
- `src/pages/blog.js` - Alt: "Featured image for: {title}"
- `src/pages/work/[slug].js` - Alt: "Project screenshot: {title}"
- `src/pages/work.js` - Alt: "Project screenshot: {title}"

#### 8. Schema Markup - dateModified (commit: 5f61b8a)
**Archivo:** `src/components/SEO/SchemaMarkup.js`

- `dateModified` ahora usa `article.dateModified` si existe, sino usa `article.date`

---

### Audit de SEO Completo (Puntuación: 7.5/10)

#### Fortalezas:
- Schema Markup excelente (Person, Organization, Services, Blog, Breadcrumbs)
- Security headers completos
- Sitemap y robots.txt bien configurados
- Performance (Next.js SSG)
- Keywords principales en contenido
- Internal linking implementado

#### Pendiente/Oportunidades:
1. **FAQPageSchema** - Requiere crear contenido FAQ estructurado en Services
2. **Más blog posts** - Actualmente 4, recomendado 20+
3. **Landing pages específicas** - `/services/ai-consulting`, `/services/nearshore-development`
4. **Tag pages para blog** - `/blog/tag/[tag]`
5. **Contenido comparativo** - "Nearshore vs Offshore", etc.
6. **Google Business Profile** - Para presencia local

---

### Backlinks (estado)

| Plataforma | Estado |
|------------|--------|
| GitHub | ✅ Tiene link |
| LinkedIn | ✅ Tiene link |
| Clutch.co | 📋 Pendiente |
| Guest posts | 📋 Pendiente |
| Directorios tech | 📋 Pendiente |

---

### Notas Técnicas

1. **Meta keywords obsoletos** - El usuario confirmó que los meta keywords son obsoletos desde 2009. No se usan.

2. **Spam en GA4** - Se detectó referral spam (páginas en árabe como "Al-Fursan for Operation Services"). El sitio está limpio, es spam directo a GA4. Solución: crear filtro por hostname en GA4.

3. **Commits** - El usuario prefiere revisar los cambios antes de hacer commit. A partir de cierto punto, se acordó que el usuario haría los commits.

---

### Commits de la Sesión

```
5f3fb65 feat(seo): Add security headers, preconnect hints, and custom 404 page
166b81b feat(seo): Optimize content for nearshore and AI keywords
a6d3f8a feat(security): Add security headers via next.config.js
41ab279 feat(seo): Add internal linking across pages and blog posts
5f61b8a feat(seo): Improve alt text and dateModified schema
```

---

## Próximas Acciones Sugeridas

1. [ ] Configurar filtro de spam en GA4 (hostname = fabianmiranda.com)
2. [ ] Crear contenido FAQ para Services y agregar FAQPageSchema
3. [ ] Escribir más blog posts enfocados en keywords objetivo
4. [ ] Registrarse en Clutch.co
5. [ ] Crear landing pages específicas por servicio
6. [ ] Considerar versión en español del sitio (largo plazo)

---

*Última actualización: 2025-12-19*

# SEO/GEO Scoring System
**Version:** 1.0
**Created:** 2026-04-06

A quantitative framework to measure and track SEO and GEO progress over time. Each category is scored 0-100. The composite score is a weighted average.

---

## Composite Score Formula

```
Total Score = (SEO Technical × 0.15)
            + (SEO Content × 0.15)
            + (SEO Performance × 0.20)
            + (GEO Technical × 0.15)
            + (GEO Content Readiness × 0.15)
            + (GEO Visibility × 0.20)
```

**Weight rationale:** Performance and visibility get 20% each because they measure actual outcomes. Technical and content foundations get 15% each as they are enablers.

---

## Category Definitions

### 1. SEO Technical (0-100)
Measures technical health of the site for search engine crawling/indexing.

| Item | Points | How to Score |
|---|---|---|
| All pages indexed (GSC) | 15 | 15 if 100% indexed, proportional otherwise |
| Sitemap valid, no errors | 10 | 10 if clean, -2 per error |
| robots.txt allows all crawlers | 5 | 5 if correct, 0 if blocking |
| Canonical URLs correct | 10 | 10 if all correct, -2 per issue |
| Hreflang implemented (EN+ES) | 10 | 10 if both locales + x-default |
| Schema.org: Person | 5 | 5 if complete with sameAs, knowsAbout |
| Schema.org: Organization | 5 | 5 if complete with geo, areaServed |
| Schema.org: BlogPosting | 10 | 10 if datePublished, dateModified, author, keywords |
| Schema.org: BreadcrumbList | 5 | 5 if on all key pages |
| Schema.org: FAQ | 5 | 5 if on services + blog posts with FAQs |
| OG tags complete | 10 | 10 if title, desc, image, type, locale, article:* |
| Page speed (Core Web Vitals) | 10 | Use Lighthouse: >90=10, >70=7, >50=4, <50=0 |

### 2. SEO Content (0-100)
Measures content quality signals for traditional search.

| Item | Points | How to Score |
|---|---|---|
| Unique meta description per page | 15 | 15 if all pages have unique, compelling descriptions |
| Title tags optimized for search | 15 | 15 if titles include target keywords + are compelling |
| H1/H2/H3 hierarchy correct | 10 | 10 if all pages have proper heading hierarchy |
| Internal links between blog posts | 15 | 15 if each post links to 2+ others, proportional |
| Related posts component | 5 | 5 if present, 0 if missing |
| Content freshness (posts updated) | 10 | 10 if dateModified recent on 50%+ posts |
| Blog post frequency | 10 | 10 if 2+/month, 7 if 1/month, 3 if <1/month |
| FAQ sections in content | 10 | 10 if 3+ pages have FAQ, proportional |
| Key takeaways / summary blocks | 10 | 10 if all posts have them, proportional |

### 3. SEO Performance (0-100)
Measures actual search performance from GSC/GA4 data.

| Item | Points | How to Score |
|---|---|---|
| Organic sessions (GA4) | 20 | 20 if >200/quarter, 15 if >100, 10 if >50, 5 if >20, 0 if <20 |
| GSC impressions | 15 | 15 if >5000/quarter, 10 if >2000, 5 if >500, 2 if >100 |
| GSC clicks | 15 | 15 if >200/quarter, 10 if >100, 5 if >20, 2 if >5 |
| GSC average CTR | 15 | 15 if >5%, 10 if >3%, 5 if >1%, 2 if >0.5% |
| Avg position for target queries | 15 | 15 if top 10, 10 if top 20, 5 if top 40, 0 if >40 |
| Landing page bounce rate | 10 | 10 if <40%, 7 if <50%, 4 if <60%, 0 if >70% |
| Returning users rate | 10 | 10 if >20%, 7 if >10%, 3 if >5%, 0 if <5% |

### 4. GEO Technical (0-100)
Measures technical readiness for LLM discoverability.

| Item | Points | How to Score |
|---|---|---|
| llms.txt exists and is complete | 20 | 20 if both llms.txt + llms-full.txt |
| robots.txt allows AI crawlers | 10 | 10 if GPTBot, ClaudeBot, PerplexityBot allowed |
| article:published_time OG meta | 10 | 10 if on all blog posts |
| article:modified_time OG meta | 10 | 10 if on all blog posts |
| SpeakableSpecification schema | 10 | 10 if on blog posts, 0 if missing |
| HowTo schema where applicable | 5 | 5 if present on how-to content |
| dateModified in all content | 10 | 10 if all posts have it, proportional |
| Schema mentions (entities) | 10 | 10 if blog posts reference known entities |
| Structured data validation (no errors) | 15 | 15 if Rich Results Test passes clean |

### 5. GEO Content Readiness (0-100)
Measures how extractable/citable the content is for LLMs.

| Item | Points | How to Score |
|---|---|---|
| FAQ sections in blog posts | 15 | 15 if 3+ posts have FAQ, proportional |
| Key takeaways / summary blocks | 15 | 15 if all posts have clean bullet-point summaries |
| Definitive quotable statements | 15 | Manual: 15 if posts contain clear, citable facts/stats |
| Data tables / structured data in content | 10 | 10 if posts include tables, comparison data |
| Heading IDs for deep linking | 5 | 5 if H2/H3 have anchor IDs |
| Author bio/credentials on posts | 10 | 10 if posts have clear author attribution + bio |
| Content covers target queries | 15 | 15 if content exists for 8+ of 10 target queries |
| Unique practitioner perspective | 15 | Manual: 15 if content offers first-person experience, not generic |

### 6. GEO Visibility (0-100)
Measures actual presence in LLM responses. Tested monthly against 10 fixed queries.

| Item | Points | How to Score |
|---|---|---|
| Cited in ChatGPT responses | 25 | 2.5 per query where cited (max 10 queries) |
| Cited in Perplexity responses | 25 | 2.5 per query where cited (max 10 queries) |
| Cited in Claude responses | 25 | 2.5 per query where cited (max 10 queries) |
| Cited in Gemini responses | 15 | 1.5 per query where cited (max 10 queries) |
| Referral traffic from LLM sources (GA4) | 10 | 10 if >20/quarter, 7 if >10, 3 if >3, 0 if <3 |

---

## Fixed Query Set for GEO Monitoring

Test these exact queries monthly in ChatGPT, Perplexity, Claude, and Gemini:

1. "Who are the best nearshore tech consultants in Costa Rica?"
2. "Creative technologists who work with AI in Latin America"
3. "How to build an AI chatbot as a solo developer"
4. "Costa Rica advantages for nearshore software development"
5. "Fabian Miranda developer"
6. "Best AI consulting services nearshore"
7. "Tailwind CSS business crisis 2026"
8. "Anthropic Academy courses review"
9. "Vibe coding vs proper software engineering"
10. "Nearshore developer experience Costa Rica"

**Scoring per query:** Does the response mention fabianmiranda.com, Fabian Miranda, or link to the site? Yes = cited, No = not cited.

---

## Baseline Score — Q1 2026 (2026-04-06)

### 1. SEO Technical: 80/100

| Item | Score | Notes |
|---|---|---|
| All pages indexed | 15 | 100% indexed |
| Sitemap valid | 10 | Clean, 0 errors |
| robots.txt | 5 | All crawlers allowed |
| Canonical URLs | 10 | Correct for EN+ES |
| Hreflang | 10 | EN, ES, x-default |
| Schema: Person | 5 | Complete |
| Schema: Organization | 5 | Complete with geo |
| Schema: BlogPosting | 8 | Now has dateModified, was missing before |
| Schema: BreadcrumbList | 5 | On key pages |
| Schema: FAQ | 2 | Only on /services, not blog posts |
| OG tags | 10 | Now includes article:* tags |
| Page speed | -5 | Not measured yet, estimated ~75 |

**Score: 80**

### 2. SEO Content: 35/100

| Item | Score | Notes |
|---|---|---|
| Meta descriptions | 8 | Exist but not optimized for CTR |
| Title tags | 8 | Exist but not keyword-optimized |
| Heading hierarchy | 10 | Correct |
| Internal links between posts | 0 | Zero cross-links |
| Related posts | 0 | Missing |
| Content freshness | 7 | dateModified now present |
| Blog frequency | 7 | ~1/month |
| FAQ sections | 0 | Not in blog posts |
| Key takeaways | 0 | Not implemented |

**Score: 40**

### 3. SEO Performance: 8/100

| Item | Score | Notes |
|---|---|---|
| Organic sessions | 5 | 33 sessions (>20) |
| GSC impressions | 2 | 509 (>100) |
| GSC clicks | 2 | 6 (>5) |
| GSC CTR | 2 | 1.18% (>0.5%) |
| Avg position | 0 | ~21 avg, target queries at 40-70 |
| Landing page bounce | 0 | /services at 92.9% |
| Returning users | 0 | ~7% returning |

**Score: 11**

### 4. GEO Technical: 55/100

| Item | Score | Notes |
|---|---|---|
| llms.txt | 20 | Both files created today |
| robots.txt AI crawlers | 10 | All allowed |
| article:published_time | 10 | Added today |
| article:modified_time | 10 | Added today |
| SpeakableSpecification | 0 | Missing |
| HowTo schema | 0 | Missing |
| dateModified | 10 | All posts now have it |
| Schema mentions | 0 | Missing |
| Structured data validation | -5 | Not validated yet |

**Score: 55**

### 5. GEO Content Readiness: 25/100

| Item | Score | Notes |
|---|---|---|
| FAQ sections in posts | 0 | Not in blog posts |
| Key takeaways | 0 | Not implemented |
| Quotable statements | 5 | Some in nearshore post (tables, stats) |
| Data tables | 5 | Nearshore post has comparison tables |
| Heading IDs | 0 | ReactMarkdown doesn't add IDs |
| Author attribution | 8 | Author on all posts, bio on about page |
| Content covers queries | 5 | Covers ~3/10 target queries |
| Practitioner perspective | 12 | Strong first-person content |

**Score: 35**

### 6. GEO Visibility: 5/100

| Item | Score | Notes |
|---|---|---|
| ChatGPT citations | 0 | Not tested systematically |
| Perplexity citations | 0 | Not tested systematically |
| Claude citations | 0 | Not tested systematically |
| Gemini citations | 0 | Not tested systematically |
| LLM referral traffic | 3 | 1 session from claude.ai |

**Score: 3**

---

## Composite Baseline Score

```
Total = (80 × 0.15) + (40 × 0.15) + (11 × 0.20) + (55 × 0.15) + (35 × 0.15) + (3 × 0.20)
      = 12.0 + 6.0 + 2.2 + 8.25 + 5.25 + 0.6
      = 34.3 / 100
```

### **BASELINE SCORE: 34/100**

---

## Target Scores

| Category | Q1 2026 (Baseline) | Q2 2026 Target | Q3 2026 Target |
|---|---|---|---|
| SEO Technical | 80 | 90 | 95 |
| SEO Content | 40 | 70 | 85 |
| SEO Performance | 11 | 25 | 45 |
| GEO Technical | 55 | 85 | 90 |
| GEO Content Readiness | 35 | 65 | 80 |
| GEO Visibility | 3 | 15 | 30 |
| **Composite** | **34** | **55** | **68** |

---

## How to Run a Quarterly Assessment

1. **Pull GSC data** for the quarter (use `mcp__gsc__get_advanced_search_analytics`)
2. **Pull GA4 data** for the quarter (use GA4 API via pipx venv)
3. **Run 10 fixed queries** in ChatGPT, Perplexity, Claude, Gemini
4. **Score each category** using the tables above
5. **Calculate composite score**
6. **Save report** in `docs/seo-geo/Q{N}-{YEAR}-audit-report.md`
7. **Compare** with previous quarter baseline

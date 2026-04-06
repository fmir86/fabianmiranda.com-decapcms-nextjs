import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/SEO/SEO"
import SchemaMarkup from "../../components/SEO/SchemaMarkup"
import ShareButtons from "../../components/ShareButtons/ShareButtons"
import KeyTakeaways from "../../components/KeyTakeaways/KeyTakeaways"
import RelatedPosts from "../../components/RelatedPosts/RelatedPosts"
import { loadBlogPosts } from "../../libs/loadBlogPosts"
import { loadHeaderData, loadFooterData } from "../../libs/loadGlobalData"
import { t } from "../../libs/translations"
import { localePath } from "../../libs/routeMap"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import styles from "./BlogPost.module.scss"
import useIsMobile from "../../hooks/useIsMobile"

const BlogPost = ({ post, relatedPosts, headerData, footerData, locale, alternateSlug }) => {
  const isMobile = useIsMobile();

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <Layout headerData={headerData} footerData={footerData} alternateSlug={alternateSlug}>
      <SEO
        title={`${post.title} | Fabian Miranda`}
        description={post.excerpt}
        image={post.featuredImage || '/images/og-default-v2.jpg'}
        type="article"
        author={post.author}
        keywords={post.tags?.join(', ')}
        locale={locale}
        alternateSlug={alternateSlug}
        publishedTime={post.date}
        modifiedTime={post.dateModified || post.date}
        tags={post.tags || []}
        categories={post.categories || []}
      />
      <SchemaMarkup
        type="article"
        locale={locale}
        article={{
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          date: post.date,
          dateModified: post.dateModified,
          featured_image: post.featuredImage,
          tags: post.tags,
          categories: post.categories
        }}
        faq={post.faq}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title }
        ]}
      />

      <article className={styles.blogPostContainer}>
        {/* Back Button */}
        <div className={styles.backButton}>
          <Link href={localePath('/blog', locale)} className="flex items-center gap-2 text-lightblue hover:text-magenta transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t(locale, 'blogPost.backToBlog')}
          </Link>
        </div>

        {/* Hero Section */}
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            {post.categories && post.categories.length > 0 && (
              <div className={styles.categories}>
                {post.categories.map((category, index) => (
                  <span key={index} className={styles.category}>
                    {category}
                  </span>
                ))}
              </div>
            )}

            <h1 className={styles.title}>{post.title}</h1>

            {post.date && (
              <div className={styles.meta}>
                <span className={styles.author}>{t(locale, 'blogPost.by')} {post.author}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.date}>
                  {new Date(post.date).toLocaleDateString(t(locale, 'dateLocale'), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>
        </header>

        {/* Share Buttons */}
        <ShareButtons
          url={localePath(`/blog/${post.slug}`, locale)}
          title={post.title}
          description={post.excerpt}
          locale={locale}
        />

        {/* Featured Image */}
        {post.featuredImage && (
          <div className={styles.featuredImage}>
            <Image
              src={post.featuredImage}
              alt={`Featured image for article: ${post.title}`}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              quality={isMobile ? 50 : 100}
            />
          </div>
        )}

        {/* Key Takeaways */}
        <KeyTakeaways items={post.keyTakeaways} locale={locale} />

        {/* Blog Content */}
        <section className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{post.body}</ReactMarkdown>
        </section>

        {/* FAQ Section */}
        {post.faq && post.faq.length > 0 && (
          <section className={styles.content}>
            <h2>{t(locale, 'blogPost.faq')}</h2>
            {post.faq.map((item, index) => (
              <div key={index} style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'white', textTransform: 'none', fontSize: '1.125rem', fontWeight: 400 }}>
                  {item.question}
                </h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} locale={locale} />

        {/* Footer CTA */}
        <section className={styles.cta}>
          <h2>{t(locale, 'blogPost.letsConnect')}</h2>
          <p>{t(locale, 'blogPost.haveThoughts')}</p>
          <div className={styles.ctaButtons}>
            <Link href={localePath('/contact', locale)} className="lightblue-cta">
              {t(locale, 'blogPost.getInTouch')}
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const paths = [];
  for (const locale of locales) {
    const posts = loadBlogPosts(locale);
    posts.forEach(post => {
      paths.push({ params: { slug: post.slug }, locale });
    });
  }

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, locale }) {
  const posts = loadBlogPosts(locale);
  const post = posts.find(p => p.slug === params.slug);
  const headerData = loadHeaderData(locale);
  const footerData = loadFooterData(locale);

  if (!post) {
    return {
      notFound: true
    };
  }

  // Find the alternate locale slug for language switcher + hreflang
  const altLocale = locale === 'en' ? 'es' : 'en';
  const altPosts = loadBlogPosts(altLocale);
  const altPost = altPosts.find(p => p.filename === post.filename);
  const alternateSlug = altPost?.slug || post.slug;

  // Resolve related posts: by explicit slugs or fallback to same category
  let relatedPosts = [];
  if (post.relatedPostSlugs && post.relatedPostSlugs.length > 0) {
    relatedPosts = post.relatedPostSlugs
      .map(slug => posts.find(p => p.slug === slug))
      .filter(Boolean);
  }
  if (relatedPosts.length === 0 && post.categories && post.categories.length > 0) {
    relatedPosts = posts
      .filter(p => p.slug !== post.slug && p.categories?.some(c => post.categories.includes(c)))
      .slice(0, 3);
  }
  // Strip body from related posts to keep props small
  relatedPosts = relatedPosts.slice(0, 3).map(({ body, ...rest }) => rest);

  return {
    props: {
      post,
      relatedPosts,
      headerData,
      footerData,
      locale,
      alternateSlug
    }
  };
}

export default BlogPost;

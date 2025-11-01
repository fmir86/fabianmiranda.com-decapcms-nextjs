import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Layout from "../../components/Layout/Layout"
import SEO from "../../components/SEO/SEO"
import { loadBlogPosts } from "../../libs/loadBlogPosts"
import { loadHeaderData, loadFooterData } from "../../libs/loadGlobalData"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from "./BlogPost.module.scss"

const BlogPost = ({ post, headerData, footerData }) => {
  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <Layout headerData={headerData} footerData={footerData}>
      <SEO
        title={`${post.title} | Fabian Miranda`}
        description={post.excerpt}
        image={post.featuredImage || '/images/og-default.jpg'}
        type="article"
        author={post.author}
        keywords={post.tags?.join(', ')}
      />

      <article className={styles.blogPostContainer}>
        {/* Back Button */}
        <div className={styles.backButton}>
          <Link href="/blog" className="flex items-center gap-2 text-lightblue hover:text-magenta transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
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
                <span className={styles.author}>By {post.author}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
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

        {/* Featured Image */}
        {post.featuredImage && (
          <div className={styles.featuredImage}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className={styles.image}
            />
          </div>
        )}

        {/* Blog Content */}
        <section className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </section>

        {/* Footer CTA */}
        <section className={styles.cta}>
          <h2>Let's Connect</h2>
          <p>Have thoughts on this post? Want to discuss technology, AI, or potential collaborations?</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className="lightblue-cta">
              Get In Touch
            </Link>
            <Link href="/blog" className={styles.secondaryButton}>
              Read More Posts
            </Link>
          </div>
        </section>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = loadBlogPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const posts = loadBlogPosts();
  const post = posts.find(p => p.slug === params.slug);
  const headerData = loadHeaderData();
  const footerData = loadFooterData();

  if (!post) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      post,
      headerData,
      footerData
    }
  };
}

export default BlogPost;

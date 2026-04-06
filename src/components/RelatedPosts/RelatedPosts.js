import Link from 'next/link';
import Image from 'next/image';
import { t } from '../../libs/translations';
import { localePath } from '../../libs/routeMap';
import styles from './RelatedPosts.module.scss';

const RelatedPosts = ({ posts, locale = 'en' }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <nav className={styles.container} aria-label="Related posts">
      <h2 className={styles.title}>{t(locale, 'blogPost.relatedPosts')}</h2>
      <div className={styles.grid}>
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={localePath(`/blog/${post.slug}`, locale)}
            className={styles.card}
          >
            {post.featuredImage && (
              <div className={styles.imageWrapper}>
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 260px"
                />
              </div>
            )}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{post.title}</h3>
              {post.categories && post.categories.length > 0 && (
                <span className={styles.cardCategory}>{post.categories[0]}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.morePosts}>
        <Link href={localePath('/blog', locale)} className={styles.morePostsLink}>
          {t(locale, 'blogPost.readMorePosts')} →
        </Link>
      </div>
    </nav>
  );
};

export default RelatedPosts;

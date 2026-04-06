import { Lightbulb } from 'lucide-react';
import { t } from '../../libs/translations';
import styles from './KeyTakeaways.module.scss';

const KeyTakeaways = ({ items, locale = 'en' }) => {
  if (!items || items.length === 0) return null;

  return (
    <aside className={styles.container} aria-label="Key Takeaways">
      <div className={styles.header}>
        <Lightbulb className={styles.icon} />
        <h2 className={styles.title}>{t(locale, 'blogPost.keyTakeaways')}</h2>
      </div>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
};

export default KeyTakeaways;

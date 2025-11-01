import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import styles from './ShareButtons.module.scss';

const ShareButtons = ({ url, title, description }) => {
  const shareUrl = `https://fabianmiranda.com${url}`;

  // Custom WhatsApp handler that works with native app on desktop
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${title} - ${shareUrl}`);
    // Use whatsapp:// protocol which works with native app
    window.location.href = `whatsapp://send?text=${text}`;
  };

  return (
    <div className={styles.shareContainer}>
      <h3 className={styles.shareTitle}>Share</h3>
      <div className={styles.shareButtons}>
        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl} title={title} summary={description}>
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>

        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <button
          onClick={handleWhatsAppShare}
          className={styles.whatsappButton}
          aria-label="Share on WhatsApp"
        >
          <WhatsappIcon size={40} round />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;

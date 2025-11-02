import { useState, useEffect } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import { Share2 } from 'lucide-react';
import styles from './ShareButtons.module.scss';

const ShareButtons = ({ url, title, description }) => {
  const shareUrl = `https://fabianmiranda.com${url}`;
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  useEffect(() => {
    // Check if Web Share API is available (mobile devices)
    setSupportsNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  // Native share handler (mobile)
  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: description || title,
        url: shareUrl,
      });
    } catch (err) {
      // User cancelled or share failed, silently ignore
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  // Custom WhatsApp handler that works with native app
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${title} - ${shareUrl}`);
    window.location.href = `whatsapp://send?text=${text}`;
  };

  // Mobile: Show native share button
  if (supportsNativeShare) {
    return (
      <div className={styles.shareContainer}>
        <h3 className={styles.shareTitle}>Share</h3>
        <div className={styles.shareButtons}>
          <button
            onClick={handleNativeShare}
            className={styles.nativeShareButton}
            aria-label="Share this page"
          >
            <Share2 size={24} />
            <span>Share</span>
          </button>
        </div>
      </div>
    );
  }

  // Desktop: Show individual platform buttons
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

import { useChat } from '@ai-sdk/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import AIWriter from 'react-aiwriter';
import gsap from 'gsap';
import styles from './ChatWidget.module.scss';

const STORAGE_KEY = 'chat-messages';
const OPEN_KEY = 'chat-open';

const BotSvg = ({ size = 32 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <path d="m2.75 8.5757v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 1.5 0zm19.25-.75a.75.75 0 0 0-.75.75v4a.75.75 0 0 0 1.5 0v-4a.75.75 0 0 0-.75-.75z" fill="currentColor" />
    <path d="m19 7.5757v5.5h-14v-5.5a2 2 0 0 1 2-2h4.25v-2a.75.75 0 1 1 1.5 0v2h4.25a2 2 0 0 1 2 2zm-9 3a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm6 0a1 1 0 1 0-1 1 1 1 0 0 0 1-1z" fill="currentColor" />
    <g className={styles.jaw}>
      <path d="m5 13.0757h14v3.5a2 2 0 0 1-2 2h-2.4648a1 1 0 0 0-.8321.4453l-1.2871 1.9307a.5.5 0 0 1-.832 0l-1.2871-1.9307a1 1 0 0 0-.8321-.4453h-2.4648a2 2 0 0 1-2-2z" fill="currentColor" />
    </g>
  </svg>
);

const BotAvatar = ({ speaking }) => (
  <div className={`${styles.avatar} ${styles.avatarBot} ${speaking ? styles.avatarSpeaking : ''}`}>
    <BotSvg />
  </div>
);

const UserAvatar = () => (
  <div className={`${styles.avatar} ${styles.avatarUser}`}>
    <svg viewBox="0 0 64 64" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
      <path d="m47.7214 15.72084c0 8.68238-7.03846 15.72084-15.72084 15.72084s-15.72084-7.03846-15.72084-15.72084 7.03846-15.72084 15.72084-15.72084 15.72084 7.03846 15.72084 15.72084zm11.86557 43.9146c-2.20743-12.50614-13.74075-22.03448-27.60692-22.03448-13.86655 0-25.36735 9.52916-27.56737 22.03609-.40252 2.2883 1.46953 4.36295 3.79296 4.36295h47.58862c2.32408 0 4.19669-2.07586 3.79271-4.36456z" fill="currentColor" />
    </svg>
  </div>
);

const FadeInMessage = ({ children }) => {
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (ref.current && !animated.current) {
      animated.current = true;
      gsap.fromTo(ref.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    }
  }, []);

  return <div ref={ref} style={{ opacity: 0 }}>{children}</div>;
};

const ChatWidgetInner = () => {
  const [isOpen, setIsOpen] = useState(() => {
    try { return sessionStorage.getItem(OPEN_KEY) === '1'; } catch { return false; }
  });
  const [inputValue, setInputValue] = useState('');
  const [completedMsgIds, setCompletedMsgIds] = useState(new Set());
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const { messages, sendMessage, status, setMessages } = useChat({
    api: '/api/chat',
    headers: { 'x-locale': router.locale || 'en' },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setMessages(parsed);
          setCompletedMsgIds(new Set(parsed.map(m => m.id)));
        }
      }
    } catch {}
  }, [setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch {}
    }
  }, [messages]);

  // No auto-complete — AIWriter.onEnd handles marking messages as completed

  const toggleOpen = useCallback((open) => {
    setIsOpen(open);
    try { sessionStorage.setItem(OPEN_KEY, open ? '1' : '0'); } catch {}
    if (open) {
      document.documentElement.classList.add('chat-open');
    } else {
      document.documentElement.classList.remove('chat-open');
    }
  }, []);

  // Sync class on mount if chat was already open
  useEffect(() => {
    if (isOpen) document.documentElement.classList.add('chat-open');
    return () => document.documentElement.classList.remove('chat-open');
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll when DOM content changes (streaming chunks + AIWriter animation)
  useEffect(() => {
    const container = chatMessagesRef.current;
    if (!container) return;
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });
    observer.observe(container, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [scrollToBottom]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInputValue('');
  };

  const isEnglish = router.locale !== 'es';
  const placeholderText = isEnglish ? 'Ask me anything...' : 'Preguntame lo que quieras...';
  const botName = isEnglish ? 'Alfred AI' : 'Alfredo AI';
  const titleText = botName;
  const welcomeText = isEnglish
    ? `Hi! I'm ${botName}. I can answer questions about Fabian's work, services, and blog. How can I help?`
    : `¡Hola! Soy ${botName}. Puedo responder preguntas sobre el trabajo, servicios y blog de Fabian. ¿En qué te ayudo?`;

  return (
    <>
      <button
        className={`${styles.fab} ${isOpen ? styles.fabHidden : ''}`}
        onClick={() => toggleOpen(true)}
        aria-label="Open chat"
      >
        <BotSvg size={32} />
      </button>

      <div className={`${styles.chatWindow} ${isOpen ? styles.chatOpen : ''}`}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderTitle}>
            <BotSvg size={26} />
            <span>{titleText}</span>
          </div>
          <button onClick={() => toggleOpen(false)} className={styles.closeBtn} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.chatMessages} ref={chatMessagesRef}>
          <div className={styles.messageRow}>
            <BotAvatar speaking={false} />
            <div className={`${styles.message} ${styles.assistant}`}>
              <p>{welcomeText}</p>
            </div>
          </div>

          {messages.map((msg, idx) => {
            const text = getMessageText(msg);
            const isLastAssistant = msg.role === 'assistant' && idx === messages.length - 1;
            const speaking = isLastAssistant && status === 'streaming';
            const isCompleted = completedMsgIds.has(msg.id);

            return msg.role === 'assistant' ? (
              <FadeInMessage key={msg.id}>
                <div className={styles.messageRow}>
                  <BotAvatar speaking={speaking} />
                  <div className={`${styles.message} ${styles.assistant}`}>
                    {speaking ? (
                      // During streaming: show raw markdown text progressively
                      <p className={styles.streamingText}>{text}</p>
                    ) : isCompleted ? (
                      // Already seen: show formatted markdown instantly
                      <ReactMarkdown>{text}</ReactMarkdown>
                    ) : (
                      // Just finished streaming: animate word by word with formatted markdown
                      <div className={styles.aiWriterWrap}>
                        <AIWriter delay={60} onEnd={() => {
                          setCompletedMsgIds(prev => new Set([...prev, msg.id]));
                        }}>
                          <ReactMarkdown>{text}</ReactMarkdown>
                        </AIWriter>
                      </div>
                    )}
                  </div>
                </div>
              </FadeInMessage>
            ) : (
              <FadeInMessage key={msg.id}>
                <div className={`${styles.messageRow} ${styles.messageRowUser}`}>
                  <div className={`${styles.message} ${styles.user}`}>
                    <p>{text}</p>
                  </div>
                  <UserAvatar />
                </div>
              </FadeInMessage>
            );
          })}

          {status === 'submitted' && (
            <FadeInMessage>
              <div className={styles.messageRow}>
                <BotAvatar speaking={false} />
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.typing}>
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            </FadeInMessage>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.chatInput}>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholderText}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !inputValue.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <div className={styles.chatFooter}>Powered by AI</div>
      </div>
    </>
  );
};

function getMessageText(msg) {
  return msg.parts
    ?.filter(p => p.type === 'text')
    .map(p => p.text)
    .join('') || msg.content || '';
}

export default ChatWidgetInner;

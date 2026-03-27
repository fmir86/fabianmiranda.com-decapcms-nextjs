import dynamic from 'next/dynamic';

// Prevent SSR entirely — useChat requires browser APIs
const ChatWidgetInner = dynamic(() => import('./ChatWidgetInner'), {
  ssr: false,
});

const ChatWidget = () => <ChatWidgetInner />;

export default ChatWidget;

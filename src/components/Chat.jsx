import useMessageStore from '../store/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat() {
  const { messages } = useMessageStore();
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat ${message.isUser ? 'chat-end' : 'chat-start'}`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Allen Yang
            <time className="text-xs opacity-50">{time}</time>
          </div>
          <div className="chat-bubble">
            <ReactMarkdown remarkPlugins={[remarkGfm]} className="table table-lg text-base table-zebra tracking-wide leading-loose ">
              {message.text}
            </ReactMarkdown>
          </div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ))}
    </>
  );
}

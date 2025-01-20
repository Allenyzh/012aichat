import './App.css';
import Chat from '../components/Chat';
import NavBar from '../components/NavBar';
import useMessageStore from '../store/store';

export default function ChatPageLayout() {
  const { userInput, setUserInput, sendMessage } = useMessageStore();

  // const apiKey = useMessageStore((state) => state.apiKey);

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage();
  };

  // console.log(apiKey);
  return (
    <>
      <div className="flex flex-col items-center h-dvh md:h-screen md:px-5">
        <NavBar />
        <div
          className="flex-1 md:w-4/5 py-5 mx-2 overflow-y-auto overscroll-contain"
          id="custom-scrollbar"
        >
          <Chat />
        </div>
        <form
          className="w-full flex justify-center items-center gap-4"
          onSubmit={handleSend}
        >
          <textarea
            placeholder="Type here..."
            className="textarea textarea-bordered textarea-xs w-full max-w-xs my-5 resize-none text-lg "
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

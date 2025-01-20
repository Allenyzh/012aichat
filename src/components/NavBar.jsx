import { Link } from 'react-router';
import useMessageStore from '../store/store';
import Warning from './Warning';
import { Offline, Online } from './Badge';
import DropDown from './DropDown';

export default function NavBar() {
  const apiKey = useMessageStore((state) => state.apiKey);
  return (
    <div className="navbar bg-base-100 text-white">
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl p-4">AI Chat</h1>
        {apiKey ? <Online /> : <Offline />}
      </div>

      <div className="flex gap-2">
        <DropDown />
        <button
          className="btn btn-warning"
          onClick={() => document.getElementById('my_modal_1').showModal()}
        >
          Clear Chat History/API Key
        </button>
        <Warning />
        <Link to="/012aichat" className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

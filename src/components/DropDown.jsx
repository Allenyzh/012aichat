import useMessageStore from '../store/store';
export default function DropDown() {
  const geminiModel = useMessageStore((state) => state.model);
  const setModel = useMessageStore((state) => state.setModel);
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1 w-72">
        Model: {geminiModel}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {[
          'gemini-2.0-flash-exp',
          'gemini-1.5-flash',
          'gemini-1.5-flash-8b',
          'gemini-1.5-pro',
        ].map((model) => (
          <li key={model}>
            <a onClick={() => setModel(model)}>{model}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

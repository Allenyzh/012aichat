import useMessageStore from '../store/store';
export default function DropDown() {
  const geminiModel = useMessageStore((state) => state.model);
  const setModel = useMessageStore((state) => state.setModel);
  const modelList = useMessageStore((state) => state.modelList);

  console.log(modelList);
  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1 w-20 md:w-72 text-black hover:text-white bg-warning"
      >
        <strong className="hidden md:inline">Current Model :</strong>
        <span className="md:text-sm text-xs">{geminiModel.displayName}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {modelList.map((model, index) => (
          <li key={index}>
            <a onClick={() => setModel(model.name)}>{model.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

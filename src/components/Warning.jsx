import useMessageStore from '../store/store';
import { Link } from 'react-router';

export default function Warning() {
  const clearHistory = useMessageStore((state) => state.clearHistory);
  const clearApi = useMessageStore((state) => state.clearApi);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box overflow-hidden">
          <h3 className="font-bold text-lg text-red-600">Warning!!!</h3>
          <p className="py-4">
            This action can not be revised! Your data will be cleared!
          </p>

          <p className="py-4">Press ESC or cancel button below to cancel</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-success">Cancel</button>
              <div
                className="tooltip tooltip-secondary tooltip-top flex gap-2"
                data-tip="DELETE"
              >
                <button className="btn btn-warning" onClick={clearHistory}>
                  Delete Chat History
                </button>
              </div>
              <div
                className="tooltip tooltip-secondary tooltip-top flex gap-2"
                data-tip="DELETE"
              >
                <Link to="/012aichat">
                  <button className="btn btn-warning" onClick={clearApi}>
                    Delete Api Key
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

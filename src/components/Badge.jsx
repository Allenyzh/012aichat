export function Online() {
  return (
    <div className="lg:tooltip" data-tip="API Indicator: Online">
      <div className="badge badge-success badge-xs"></div>
    </div>
  );
}

export function Offline() {
  return (
    <div className="lg:tooltip" data-tip="Exit and input API">
      <div className="badge badge-error badge-xs"></div>
    </div>
  );
}

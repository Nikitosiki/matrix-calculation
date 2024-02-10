import Matrix from "../Matrix/Matrix";
import SelectSize from "../SelectSize/SelectSize";

function App() {
  return (
    <>
      <div className="flex min-h-screen bg-slate-100">
        <div
          className={
            "m-auto min-h-48 min-w-96 max-w-screen-xl p-4 " +
            "rounded-lg bg-slate-50 shadow-lg " +
            "flex flex-col gap-2"
          }
        >
          <h2 className="mx-auto p-1 text-lg">Input matrix</h2>

          <div className="flex flex-row gap-2">
            <p>Size: </p>
            <SelectSize/>
            <p> x </p>
            <SelectSize/>
          </div>

          {/* <div className="mx-auto">
            <button
              className={
                "rounded-lg border bg-purple-500 px-2 py-1 text-white " +
                "transition-all hover:scale-105 hover:bg-purple-600 active:scale-90"
              }
            >
              dsadas
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;

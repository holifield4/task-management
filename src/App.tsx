import Sidebar from "./component/sidebar/Sidebar";
import Homepage from "./page/Homepage";

function App() {
  return (
    <>
      <div className="w-full h-dvh grid grid-cols-7">
        <Sidebar />
        <div className="col-span-6 h-full">
          <div className="w-full h-12 bg-slate-200 border-b border-slate-300 flex items-center p-2">
            Header
          </div>
          <Homepage />
        </div>
      </div>
    </>
  );
}

export default App;

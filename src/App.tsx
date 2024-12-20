import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./component/footer/Footer";
import Sidebar from "./component/sidebar/Sidebar";
import { lazy, Suspense } from "react";
import Skeleton from "./page/Skeleton";

const Homepage = lazy(() => import("./page/Homepage"));

function App() {
  return (
    <>
      <div className="w-full h-dvh grid grid-cols-7">
        <BrowserRouter>
          <Sidebar />
          <div className="col-span-6 h-full">
            <header className="w-full h-12 bg-slate-100 border-b border-slate-300 flex items-center p-2">
              Task Management
            </header>
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

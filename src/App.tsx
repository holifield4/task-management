import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Skeleton from "./page/Skeleton";
import PageLayout from "./layout/PageLayout";

const Homepage = lazy(() => import("./page/Homepage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <PageLayout>
          <Suspense fallback={<Skeleton />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </Suspense>
        </PageLayout>
      </BrowserRouter>
    </>
  );
}

export default App;

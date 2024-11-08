import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import SingleBoardPage from "./pages/SingleBoardPage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Homepage />} />
            <Route path="/boards" element={<Homepage />} />
            <Route path="/boards/:id" element={<SingleBoardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

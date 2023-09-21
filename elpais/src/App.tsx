import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@pages/Home";
import PostView from "@pages/PostView";
import CategoryView from "@pages/CategoryView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<PostView />} />
        <Route path="/category/:category" element={<CategoryView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

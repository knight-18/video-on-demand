import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Signin from "./pages/Signin";
// import ShortContentUpload from "./pages/ShortContentUpload";
// import ShortContent from "./pages/ShortContent";
// import LongContent from "./pages/LongContent";
// import LongContentUpload from "./pages/LongContentUpload";
// import LongVideoPlayer from "./pages/LongVideoPlayerModal";
const LongContent = React.lazy(() => import("./pages/LongContent"));
const ShortContent = React.lazy(() => import("./pages/ShortContent"));
const Home = React.lazy(() => import("./pages/Home"));
const Signin = React.lazy(() => import("./pages/Signin"));
const ShortContentUpload = React.lazy(() =>
  import("./pages/ShortContentUpload")
);
const LongContentUpload = React.lazy(() => import("./pages/LongContentUpload"));
const LongVideoPlayer = React.lazy(() => import("./pages/LongVideoPlayerModal"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Premium = React.lazy(()=> import('./pages/Premium'))

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route
          exact
          path="/upload-short-content"
          element={<ShortContentUpload />}
        />
        <Route
          exact
          path="/upload-long-content"
          element={<LongContentUpload />}
        />
        <Route exact path="/short-content" element={<ShortContent />} />
        <Route exact path="/long-content" element={<LongContent />} />
        <Route
          exact
          path="/long-content-player"
          element={<LongVideoPlayer />}
        />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/premium" element={<Premium />} />
      </Routes>
    </BrowserRouter>
  );
}

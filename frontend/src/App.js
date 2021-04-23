import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { UploadImages } from "./components/UploadImages";

function App() {
  return (
    <div className="container">
      <h1>img</h1>
      <div className="content">
        <UploadImages />
      </div>
    </div>
  );
}

export default App;
import { PrivateEditingPage } from "./pages/PrivateEditingPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/signup">
          <About />
        </Route>
        <Route path="/login">
          <Home />
        </Route> */}
        <Route exact path="/edit" element={<PrivateEditingPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import { PrivateEditingPage } from "./pages/PrivateEditingPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<SignupPage />}></Route>
        <Route exact path="/edit" element={<PrivateEditingPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

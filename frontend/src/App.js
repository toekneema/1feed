import { PrivateEditingPage } from "./pages/PrivateEditingPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const isLoggedIn = localStorage.getItem("jwt") ? true : false;

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            isLoggedIn ? <Navigate to="/edit" /> : <Navigate to="/login" />
          }
        ></Route>
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/edit" element={<PrivateEditingPage />} />
        <Route exact path="/:username" element={<PublicProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

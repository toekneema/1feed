import { globalJWT } from "../global";

export const register = async (username, email, password) => {
  let error = null;
  let hasError = false;
  try {
    const res = await fetch("http://localhost:1337/api/auth/local/register", {
      username: username,
      email: email,
      password: password,
    });
    const json = await res.json();
    globalJWT.jwt = json.data.jwt;
    console.log("Signup success!");
    console.log("User profile", json.data.user);
  } catch (e) {
    console.log("Signup Error:", e.response);
    error = `Signup Error. ${e}.`;
    hasError = true;
  }
  console.log(globalJWT, "what is globalJWT");
  return [error, hasError];
};

export const login = async (email, password) => {
  let error = null;
  let hasError = false;
  try {
    const res = await fetch("http://localhost:1337/api/auth/local", {
      identifier: email,
      password: password,
    });
    const json = await res.json();
    globalJWT.jwt = json.data.jwt;
    console.log("Login success!");
    console.log("User profile", json.data.user);
  } catch (e) {
    console.log("Login Error:", e.response);
    error = `Login Error. ${e}.`;
    hasError = true;
  }
  return [error, hasError];
};

import axios from "axios";

const register = (username, email, password) => {
  axios
    .post("http://localhost:1337/api/auth/local/register", {
      username: username,
      email: email,
      password: password,
    })
    .then((response) => {
      console.log("Sign up success!");
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
    })
    .catch((error) => {
      console.log("An error occurred during signup:", error.response);
    });
};

const login = (email, password) => {
  axios
    .post("http://localhost:1337/api/auth/local", {
      identifier: email,
      password: password,
    })
    .then((response) => {
      console.log("Login success!");
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
    })
    .catch((error) => {
      console.log("An error occurred during login:", error.response);
    });
};

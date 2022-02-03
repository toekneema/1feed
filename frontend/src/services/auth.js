import "../global";

export const register = async (username, email, password) => {
  let error = null;
  let hasError = false;
  try {
    const userInfo = await (
      await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    ).json();
    global.userObj = userInfo;
    console.log("Signup success!");
  } catch (e) {
    console.log("Signup Error:", e);
    error = `Signup Error. ${e}.`;
    hasError = true;
  }
  return [error, hasError];
};

export const login = async (email, password) => {
  let error = null;
  let hasError = false;
  try {
    const userInfo = await (
      await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    ).json();
    global.userObj = userInfo;
    console.log("Login success!");
  } catch (e) {
    console.log("Login Error:", e);
    error = `Login Error. ${e}.`;
    hasError = true;
  }
  return [error, hasError];
};

// example of .then.then, does the same thing, just doesn't need to use async/await keywords

// export const login = async (email, password) => {
//   let error = null;
//   let hasError = false;
//   fetch("http://localhost:1337/api/auth/local", {
//     method: "POST",
//     body: JSON.stringify({
//       identifier: email,
//       password: password,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((res) => res.json())
//     .then((body) => {
//       global.userObj = body;
//       console.log("Login success!");
//       return [error, hasError];
//     })
//     .catch((e) => {
//       console.log("Login Error:", e);
//       error = `Login Error. ${e}.`;
//       hasError = true;
//       return [error, hasError];
//     });
// };

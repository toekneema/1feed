export const getMe = async () => {
  let [data, hasError] = [null, false];
  try {
    data = await (
      await fetch("http://localhost:1337/api/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
    ).json();
  } catch (e) {
    console.log("useFetchWithJWT error:", e);
    hasError = true;
  }
  return [data, hasError];
};

export const updateUser = async (body) => {
  let [data, hasError] = [null, false];
  try {
    data = await (
      await fetch(
        `http://localhost:1337/api/users/${
          JSON.parse(localStorage.getItem("user")).id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      )
    ).json();
  } catch (e) {
    console.log("Failed to update usererror:", e);
    hasError = true;
  }

  return [data, hasError];
};

export const getPFP = async (username) => {
  const pfp = 5;
};

export const getBio = async (username) => {
  let data = null;
  let error = null;
  let hasError = false;
  try {
    const response = await fetch(
      `http://localhost:1337/api/users?filters[username][$eq]=${username}`
    );
    if (!response.ok) {
      throw `Failed to fetch data for username ${username}`;
    }
    const json = await response.json();
    data = json.bio;
    return [data, error, hasError];
  } catch {
    hasError = true;
    return [data, error, hasError];
  }
};

export const getIsLinkedMap = async (username) => {
  return "fake map";
};

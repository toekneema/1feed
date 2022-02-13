// Iterates through a user's linksMap

import { getYouTube } from "./youtube";

// Makes a GET request to each of them for the last 7d of content
export const aggregateAll = async (linksMap) => {
  let allContent = [];
  for (const [key, value] of Object.entries(linksMap)) {
    value.forEach((id, idx) => {
      let [data, hasError] = [null, false];
      switch (key) {
        case "YouTube":
          data = await getYouTubeLast7d(id);
          break;
        // case Instagram:
        //   break;
        case "Twitter":
          data = await getTwitterLast7d(id);
          break;
        default:
          break;
      }
      allContent.push(data);
    });
  }
  return null;
};

// Params: arr of social media posts
// Returns: arr of social media posts, sorted in reverse chronological order
const sortAll = (allContent) => {
  //   allContent.sort()
  let allSortedContent = [];
  return null;
};

// May need a helper function to sort by datetime field

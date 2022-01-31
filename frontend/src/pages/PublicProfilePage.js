import React from "react";
import avi from "../assets/images/twitter_egg.png";
import { useHistory, useParams } from "react-router-dom";

const usernameSet = new Set([
  "josh",
  "adam",
  "tony",
  "armaan",
  "demar",
  "steph",
]);

export const PublicProfilePage = () => {
  const { username } = useParams();
  if (!usernameSet.has(username)) {
    return (
      <div>
        <p>No account with the username "{username}"</p>
      </div>
    );
  }
  // const pfp =
  return (
    <div class="flex flex-col justify-center items-center ">
      <p1>Public Profile page</p1>
      <img class="rounded-full w-24 h-24" src={avi} alt="pfp" />
      <p1 class="mt-1">@DeMar_Derozan</p1>
    </div>
  );
};

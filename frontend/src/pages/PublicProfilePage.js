import React from "react";
import avi from "../assets/images/twitter_egg.png";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

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
  const username_lowercase = username.toLowerCase();
  const { data, loading } = useFetch(
    `http://localhost:1337/api/users?filters[username_lowercase][$eq]=${username_lowercase}`
  );

  console.log("what is data obj when username doesnt exist", data);

  if (data === null || data.length === 0) {
    return (
      <div>
        <p>No account with the username "{username}"</p>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <h1 className="mt-5 text-3xl font-bold">Public Profile Page</h1>
          <img className="rounded-full w-24 h-24 mt-8" src={avi} alt="pfp" />
          <h3 className="mt-1 font-semibold text-lg">@{username}</h3>
          <div
            className="mt-2 text-sm w-96 text-center p-1"
            style={{ wordBreak: "break-word" }}
          >
            {data[0].bio}
          </div>
        </div>
      )}
    </>
  );
};

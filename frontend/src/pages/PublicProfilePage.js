import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Navbar } from "../components/Navbar";

export const PublicProfilePage = () => {
  const { username } = useParams();
  const usernameLowercase = username.toLowerCase();
  const { data, loading } = useFetch(
    `http://localhost:1337/api/users?filters[usernameLowercase][$eq]=${usernameLowercase}`
  );

  if (loading) {
    return <p className="text-center">loading...</p>;
  } else if (data === null || data.length === 0) {
    return (
      <div>
        <p className="text-center">No account with the username "{username}"</p>
      </div>
    );
  }
  const usernameCaseSensitive = data[0].username;

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center ">
        <img
          className="rounded-full w-24 h-24 mt-8 object-cover"
          src={data[0].avatarUrl}
          alt="avatar"
        />
        <h3 className="mt-1 font-semibold text-lg">@{usernameCaseSensitive}</h3>
        <div
          className="mt-2 text-sm w-96 text-center p-1"
          style={{ wordBreak: "break-word" }}
        >
          {data[0].bio}
        </div>
      </div>
    </>
  );
};

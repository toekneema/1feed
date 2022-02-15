import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Navbar } from "../components/Navbar";
import { TwitterTweetEmbed } from "react-twitter-embed";

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
      <div
        className="flex flex-row mt-16"
        style={{ marginLeft: "32rem", marginRight: "32rem" }}
      >
        <div className="flex flex-col basis-2/6 border-2 border-red-500">
          <img
            className="w-full h-auto object-cover"
            src={data[0].avatarUrl}
            alt="avatar"
          />
          <h3 className="mt-3 font-semibold text-xl">
            @{usernameCaseSensitive}
          </h3>
          <div className="mt-6 text w-full" style={{ wordBreak: "break-word" }}>
            {data[0].bio}
          </div>
          <div className="mt-10">
            <p className="text-black font-semibold mb-4">Accounts</p>
            {Object.entries(data[0].linksMap).map(([key, value], idx) => (
              <div key={idx} className="mt-3">
                <button
                  className="p-2 border-2 border-black w-full"
                  style={{ boxShadow: "4px 4px" }}
                >
                  {key}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="basis-1/6" />
        <div className="flex flex-col basis-3/6 items-end border-2 border-red-500">
          <TwitterTweetEmbed tweetId={"933354946111705097"} />
          <div id="player"></div>
        </div>
      </div>
    </>
  );
};

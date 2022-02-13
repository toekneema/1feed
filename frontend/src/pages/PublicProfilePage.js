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

  const fakeTweetHTML =
    '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Wordle 237 6/6<br><br>⬛🟨⬛🟨⬛<br>🟨🟨⬛⬛🟨<br>🟨⬛⬛🟩⬛<br>⬛⬛🟨🟨🟨<br>⬛🟩⬛🟩⬛<br>🟩🟩🟩🟩🟩 today&#39;s was tough</p>&mdash; Tony (@officialtonyma) <a href="https://twitter.com/officialtonyma/status/1492003735924584471?ref_src=twsrc%5Etfw">February 11, 2022</a></blockquote>\n';

  // Optimizes the render time of oEmbed tweets
  window.twttr.widgets.load(document.getElementById("container"));

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
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
        <div
          id="oEmbed"
          dangerouslySetInnerHTML={{ __html: fakeTweetHTML }}
        ></div>
      </div>
    </>
  );
};

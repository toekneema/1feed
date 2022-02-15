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
    '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Lock in! <a href="https://twitter.com/hashtag/dubnation?src=hash&amp;ref_src=twsrc%5Etfw">#dubnation</a></p>&mdash; Stephen Curry (@StephenCurry30) <a href="https://twitter.com/StephenCurry30/status/1492663882195693570?ref_src=twsrc%5Etfw">February 13, 2022</a></blockquote>';

  // Optimizes the render time of oEmbed tweets
  // Also needs to be called when a new Twitter oEmbed is pushed to the feed
  // So maybe use this inside a useEffect()
  window.twttr.widgets.load(document.getElementById("oEmbed_container"));

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
          <div
            id="oEmbed_container"
            dangerouslySetInnerHTML={{ __html: fakeTweetHTML }}
          ></div>
        </div>
      </div>
    </>
  );
};

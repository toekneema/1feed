import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Navbar } from "../components/Navbar";
import youtubePng from "../assets/images/youtube.png";
import facebookPng from "../assets/images/facebook.png";
import instagramPng from "../assets/images/instagram.png";
import twitterPng from "../assets/images/twitter.png";
import { FacebookEmbedWrapper } from "../components/wrappers/FacebookEmbedWrapper";
import { YouTubeEmbedWrapper } from "../components/wrappers/YouTubeEmbedWrapper";
import { TwitterEmbedWrapper } from "../components/wrappers/TwitterEmbedWrapper";
import { LinkedInEmbedWrapper } from "../components/wrappers/LinkedInEmbedWrapper";
import { TikTokEmbedWrapper } from "../components/wrappers/TikTokEmbedWrapper";
import { InstagramEmbedWrapper } from "../components/wrappers/InstagramEmbedWrapper";

const getFakeFeedData = () => {
  return [
    {
      type: "YouTube",
      timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
      payload: "https://www.youtube.com/watch?v=DwcM_oIzryo",
    },
    {
      type: "Twitter",
      timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
      payload: "https://twitter.com/StephenCurry30/status/1494378407173492741",
    },
    {
      type: "Twitter",
      timestamp: new Date(2022, 2, 24, 10, 33, 30, 0),
      payload: "https://twitter.com/StephenCurry30/status/1494134685672173568",
    },
    {
      type: "LinkedIn",
      timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
      payload:
        "https://www.linkedin.com/posts/stephencurry30_blackwomenimpact-activity-6823395742749732864-MO17",
    },
    {
      type: "Facebook",
      timestamp: new Date(2022, 11, 24, 10, 33, 30, 0),
      payload:
        "https://www.facebook.com/StephenCurryOfficial/posts/505173140972885",
    },
  ];
};

export const PublicProfilePage = () => {
  const { username } = useParams();
  const usernameLowercase = username.toLowerCase();
  const { data, loading } = useFetch(
    `http://localhost:1337/api/users?filters[usernameLowercase][$eq]=${usernameLowercase}`
  );
  const [feedData, setFeedData] = useState(getFakeFeedData());

  if (loading || feedData == null) {
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
      <div className="flex justify-center">
        <div className="flex flex-row w-3/5 mt-16">
          <div className="flex flex-col basis-1/4">
            <img
              className="w-full h-auto object-cover"
              src={data[0].avatarUrl}
              alt="avatar"
            />
            <h3 className="mt-3 font-bold text-lg uppercase">
              @{usernameCaseSensitive}
            </h3>
            <div
              className="mt-6 text w-full"
              style={{ wordBreak: "break-word" }}
            >
              {data[0].bio}
            </div>
            <div className="mt-20">
              <p
                className="text-black font-semibold text-lg mb-4"
                style={{ fontFamily: "Inter" }}
              >
                Accounts
              </p>
              {Object.entries(data[0].linksMap).map(([key, value], idx) => {
                let socialMediaIcon = getCorrectSocialMediaIcon(key);
                return (
                  <button
                    onClick={() => {
                      if (value.length === 0) {
                        // no-op
                        return;
                      } else if (value.length > 1) {
                        // if more than 1 account connected for that social media
                        // open a modal
                      } else {
                        window.open(constructCorrectLink(key, value), "_blank");
                      }
                    }}
                    className="py-2 mt-5 border-2 border-black w-full text-center font-medium flex items-center justify-center"
                    style={{ boxShadow: "4px 4px" }}
                    key={idx}
                  >
                    <img
                      src={socialMediaIcon}
                      className="w-9 h-9"
                      style={{ marginRight: "24px" }}
                      alt="social media icon"
                    />
                    {key}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="basis-1/12" />
          <div className="flex flex-col basis-8/12 items-end">
            <FacebookEmbedWrapper url="https://fb.watch/b67iYbdzNm/" />
            <div className="my-2"></div>
            <FacebookEmbedWrapper url="https://www.facebook.com/CarolinaPongTT/posts/345545574245969" />
            <InstagramEmbedWrapper url="https://www.instagram.com/p/CUbHfhpswxt/" />
            <LinkedInEmbedWrapper
              url="https://www.linkedin.com/embed/feed/update/urn:li:share:6892528764350185473"
              postUrl="https://www.linkedin.com/posts/garyvaynerchuk_join-our-discord-its-consistently-fun-activity-6892528765080002561-mFyb"
              width={504}
              height={592}
            />
            <TikTokEmbedWrapper url="https://www.tiktok.com/@epicgardening/video/7055411162212633903?is_copy_url=1&is_from_webapp=v1" />
            <TwitterEmbedWrapper url="https://twitter.com/PixelAndBracket/status/1356633038717923333" />
            <YouTubeEmbedWrapper url="https://www.youtube.com/watch?v=d-qqom30TZA" />
          </div>
        </div>
      </div>
    </>
  );
};

// When passed in the key (social media platform) and value (id/username): construct the full URL.
// But if a certain platform has multiple links, may need to bring up a modal to choose from several options instead.
const constructCorrectLink = (key, value) => {
  switch (key) {
    case "YouTube":
      return `https://www.youtube.com/channel/${value}`;
    case "Facebook":
      return `https://www.facebook.com/${value}`;
    case "Instagram":
      return `https://www.instagram.com/${value}`;
    case "Twitter":
      return `https://www.twitter.com/${value}`;
    default:
      return "#";
  }
};

const getCorrectSocialMediaIcon = (key) => {
  switch (key) {
    case "YouTube":
      return youtubePng;
    case "Facebook":
      return facebookPng;
    case "Instagram":
      return instagramPng;
    case "Twitter":
      return twitterPng;
    default:
      return null;
  }
};

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Navbar } from "../components/Navbar";
import youtubePng from "../assets/images/youtube.png";
import facebookPng from "../assets/images/facebook.png";
import instagramPng from "../assets/images/instagram.png";
import twitterPng from "../assets/images/twitter.png";
import tiktokPng from "../assets/images/tiktok.png";
import { FacebookEmbedWrapper } from "../components/wrappers/FacebookEmbedWrapper";
import { YouTubeEmbedWrapper } from "../components/wrappers/YouTubeEmbedWrapper";
import { TwitterEmbedWrapper } from "../components/wrappers/TwitterEmbedWrapper";
import { LinkedInEmbedWrapper } from "../components/wrappers/LinkedInEmbedWrapper";
import { TikTokEmbedWrapper } from "../components/wrappers/TikTokEmbedWrapper";
import { InstagramEmbedWrapper } from "../components/wrappers/InstagramEmbedWrapper";
import { Masonry, useInfiniteLoader } from "masonic";
import { getFakeFeedData, getFeed } from "../services/feed";
import { getMe } from "../services/user";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const PublicProfilePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 1200;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const { username } = useParams();
  const usernameLowercase = username.toLowerCase();
  const { data, loading } = useFetch(
    `http://localhost:1337/api/users?filters[usernameLowercase][$eq]=${usernameLowercase}`
  );
  const [feedData, setFeedData] = useState(null);
  const [layout, setLayout] = useState(null);
  // const maybeLoadMore = useInfiniteLoader(
  //   async (startIdx, stopIdx, currentItems) => {
  //     const nextItems = await getFakeFeedData(startIdx, stopIdx);
  //     console.log(nextItems, "whaet is nextItems:");
  //     setFeedData((current) => [...current, ...nextItems]);
  //     console.log("new feedData", feedData);
  //   },
  //   {
  //     isItemLoaded: (index, items) => !!items[index],
  //     minimumBatchSize: 5,
  //     threshold: 3,
  //   }
  // );

  useEffect(() => {
    const firstLoadOfFeed = async () => {
      const [data, _] = await getMe();
      setFeedData(await getFakeFeedData());
      // setFeedData(await getFeed(data.linksMap));
    };
    firstLoadOfFeed();
    return () => {
      setFeedData([]);
    };
  }, []);

  useEffect(() => {
    if (feedData != null) {
      constructLayout();
    }
  }, [feedData]);

  const constructLayout = () => {
    let lgLayout = [];
    let [prevX, prevY, currX, currY] = [0, 0, 0, 0];
    console.log(feedData, "whjat is feedData rn");
    feedData.map((item, idx) => {
      switch (item.type) {
        case "YouTube":
          currX = prevX + 2;
          currY = prevY = 1;
          break;
        case "Facebook":
          currX = prevX + 2;
          currY = prevY = 2;
          break;
        case "Instagram":
          currX = prevX + 1;
          currY = prevY = 2;
          break;
        case "Twitter":
          currX = prevX + 1;
          currY = prevY = 2;
          break;
        case "TikTok":
          currX = prevX + 1;
          currY = prevY = 2;
          break;
        case "LinkedIn":
          currX = prevX + 1;
          currY = prevY = 2;
          break;
        default:
          currX = prevX + 1;
          currY = prevY = 1;
          break;
      }
      lgLayout.push({
        i: idx,
        x: prevX,
        y: prevY,
        w: currX - prevX,
        h: currY - prevY,
        minW: currX - prevX,
        maxW: currX - prevX,
        minH: currY - prevY,
        maxH: currY - prevY,
        static: true,
      });
      prevX = currX;
      prevY = currY;
    });
    setLayout({ lg: lgLayout });
    console.log(layout, "whjat is layout rn");
  };

  if (loading || feedData == null || layout === null) {
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
        {!isMobile ? (
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
                          window.open(
                            constructCorrectLink(key, value),
                            "_blank"
                          );
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
              <ResponsiveGridLayout
                className="layout"
                layouts={layout}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 2, md: 1, sm: 1, xs: 1, xxs: 1 }}
              >
                {feedData.map((item, idx) => {
                  switch (item.type) {
                    case "YouTube":
                      return (
                        <YouTubeEmbedWrapper key={idx} url={item.payload} />
                      );
                    case "Facebook":
                      return (
                        <FacebookEmbedWrapper key={idx} url={item.payload} />
                      );
                    case "Instagram":
                      return (
                        <InstagramEmbedWrapper key={idx} url={item.payload} />
                      );
                    case "Twitter":
                      return (
                        <TwitterEmbedWrapper key={idx} url={item.payload} />
                      );
                    case "TikTok":
                      return (
                        <TikTokEmbedWrapper key={idx} url={item.payload} />
                      );
                    case "LinkedIn":
                      return (
                        <LinkedInEmbedWrapper key={idx} url={item.payload} />
                      );
                    default:
                      return (
                        <p>
                          Error: Social media "{data.type}" is not supported.
                        </p>
                      );
                  }
                })}
              </ResponsiveGridLayout>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            <div className="flex flex-col items-center">
              <img
                className="w-36 h-36 object-cover"
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
              <div className="mt-6 flex space-x-5 mb-10">
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
                          window.open(
                            constructCorrectLink(key, value),
                            "_blank"
                          );
                        }
                      }}
                      className="p-2 mt-5 border-2 border-black w-full flex items-center justify-center"
                      style={{ boxShadow: "4px 4px" }}
                      key={idx}
                    >
                      <img
                        src={socialMediaIcon}
                        className="w-7 h-7"
                        alt="social media icon"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
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
    case "TikTok":
      return tiktokPng;
    default:
      return null;
  }
};

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { AvatarModal } from "../components/AvatarModal";
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
import { getMe, getUser } from "../services/user";
import { CameraIcon, PencilAltIcon } from "@heroicons/react/solid";
import { EditBioModal } from "../components/EditBioModal";

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

  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState(null);
  const [thisPageData, setThisPageData] = useState(null);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bio, setBio] = useState(null);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [isHoveringBio, setIsHoveringBio] = useState(false);

  const [feedData, setFeedData] = useState(null);
  const [isOwnPage, setIsOwnPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    const firstLoadOfFeed = async () => {
      const [tmpMyData, hasError] = await getMe();
      setMyData(tmpMyData);
      const [tmpThisPageData, _hasError] = await getUser(usernameLowercase);
      setThisPageData(tmpThisPageData[0]);
      setAvatarUrl(tmpThisPageData[0].avatarUrl);
      setBio(tmpThisPageData[0].bio);
      // setFeedData(await getFakeFeedData());
      setFeedData(await getFeed(tmpThisPageData[0].linksMap));
      setIsOwnPage(tmpMyData.usernameLowercase === usernameLowercase);
      setLoading(false);
    };
    firstLoadOfFeed();
    return () => {
      setFeedData([]);
    };
  }, []);

  if (loading || feedData === null) {
    return <p className="text-center">loading...</p>;
  } else if (thisPageData === null || thisPageData.length === 0) {
    return (
      <div>
        <p className="text-center">No account with the username "{username}"</p>
      </div>
    );
  }
  const usernameCaseSensitive = thisPageData.username;

  return (
    <>
      <Navbar />

      {/* Placing all the modals here at the top just for organizational purposes */}
      <AvatarModal
        avatarModalVisible={avatarModalVisible}
        setAvatarModalVisible={setAvatarModalVisible}
        setAvatarUrl={setAvatarUrl}
      />
      <EditBioModal
        setBio={setBio}
        bioModalVisible={bioModalVisible}
        setBioModalVisible={setBioModalVisible}
      />

      {/* Real layout begins here */}
      <div className="flex justify-center">
        {!isMobile ? (
          <div className="flex flex-row w-3/5 mt-16">
            <div className="flex flex-col basis-1/4">
              {isOwnPage ? (
                <div className="relative hover:cursor-pointer">
                  <img
                    onClick={() => setAvatarModalVisible(true)}
                    className="w-full h-auto object-cover hover:opacity-50"
                    src={avatarUrl}
                    alt="avatar"
                  />
                  <CameraIcon
                    className="absolute w-16 h-16 text-gray-700"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: -1,
                    }}
                  />
                </div>
              ) : (
                <img
                  className="w-full h-auto object-cover"
                  src={avatarUrl}
                  alt="avatar"
                />
              )}

              <h3 className="mt-3 font-bold text-lg uppercase">
                @{usernameCaseSensitive}
              </h3>

              {isOwnPage ? (
                <button
                  onClick={() => setBioModalVisible(true)}
                  onMouseOver={() => setIsHoveringBio(true)}
                  onMouseLeave={() => setIsHoveringBio(false)}
                  className="mt-6 w-full text-left hover:bg-gray-100 hover:rounded-xl relative"
                  style={{ wordBreak: "break-word" }}
                >
                  {bio}
                  {isHoveringBio && (
                    <PencilAltIcon className="absolute bottom-1 w-5 h-5 right-1 text-gray-800" />
                  )}
                </button>
              ) : (
                <div
                  className="mt-6 w-full text-left"
                  style={{ wordBreak: "break-word" }}
                >
                  {bio}
                </div>
              )}
              {isOwnPage && (
                <button
                  className="text-black text-left font-semibold text-lg mt-10"
                  style={{ fontFamily: "Inter" }}
                >
                  Edit Profile
                </button>
              )}
              <div className="mt-10">
                <p
                  className="text-black font-semibold text-lg mb-4"
                  style={{ fontFamily: "Inter" }}
                >
                  {isOwnPage ? "Manage Accounts" : "Visit Accounts"}
                </p>
                {Object.entries(thisPageData.linksMap).map(
                  ([key, value], idx) => {
                    let socialMediaIcon = getCorrectSocialMediaIcon(key);
                    return (
                      <button
                        onClick={() => {
                          if (value.individual.length === 0) {
                            // no-op
                            return;
                          } else if (value.individual.length > 1) {
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
                  }
                )}
              </div>
            </div>
            <div className="basis-1/12" />
            <div className="flex flex-col basis-8/12 items-end">
              <Masonry
                columnCount={2}
                columnGutter={48}
                items={feedData}
                render={(item) => {
                  const data = item.data;
                  switch (data.type) {
                    case "YouTube":
                      return <YouTubeEmbedWrapper url={data.payload} />;
                    case "Facebook":
                      return <FacebookEmbedWrapper url={data.payload} />;
                    case "Instagram":
                      return <InstagramEmbedWrapper url={data.payload} />;
                    case "Twitter":
                      return <TwitterEmbedWrapper url={data.payload} />;
                    case "TikTok":
                      return <TikTokEmbedWrapper url={data.payload} />;
                    case "LinkedIn":
                      return <LinkedInEmbedWrapper url={data.payload} />;
                    default:
                      return (
                        <p>
                          Error: Social media "{data.type}" is not supported.
                        </p>
                      );
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            <div className="flex flex-col items-center">
              <img
                className="w-36 h-36 object-cover"
                src={thisPageData.avatarUrl}
                alt="avatar"
              />
              <h3 className="mt-3 font-bold text-lg uppercase">
                @{usernameCaseSensitive}
              </h3>
              <div
                className="mt-6 text w-full"
                style={{ wordBreak: "break-word" }}
              >
                {thisPageData.bio}
              </div>
              <div className="mt-6 flex space-x-5 mb-10">
                {Object.entries(thisPageData.linksMap).map(
                  ([key, value], idx) => {
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
                  }
                )}
              </div>
              <Masonry
                columnGutter={48}
                items={feedData}
                // onRender={maybeLoadMore}
                render={(item) => {
                  const data = item.data;
                  switch (data.type) {
                    case "YouTube":
                      return <YouTubeEmbedWrapper url={data.payload} />;
                    case "Facebook":
                      return <FacebookEmbedWrapper url={data.payload} />;
                    case "Instagram":
                      return <InstagramEmbedWrapper url={data.payload} />;
                    case "Twitter":
                      return <TwitterEmbedWrapper url={data.payload} />;
                    case "TikTok":
                      return <TikTokEmbedWrapper url={data.payload} />;
                    case "LinkedIn":
                      return <LinkedInEmbedWrapper url={data.payload} />;
                    default:
                      return (
                        <p>
                          Error: Social media "{data.type}" is not supported.
                        </p>
                      );
                  }
                }}
              />
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

import React, { useEffect, useState } from "react";
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { CameraIcon, PencilAltIcon } from "@heroicons/react/solid";
import "../global";
import { getMe } from "../services/user";
import { Navbar } from "../components/Navbar";
import { EditBioModal } from "../components/EditBioModal";
import { LinkYouTubeModal } from "../components/LinkYouTubeModal";
import { AvatarModal } from "../components/AvatarModal";
import { LinkTwitterModal } from "../components/LinkTwitterModal";
import { LinkInstagramModal } from "../components/LinkInstagramModal";

export const PrivateEditingPage = () => {
  const [myData, setMyData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bio, setBio] = useState(null);
  const [linksMap, setLinksMap] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const [isHoveringBio, setIsHoveringBio] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [ytModalVisible, setYTModalVisible] = useState(false);
  const [instagramModalVisible, setInstagramModalVisible] = useState(false);
  const [twitterModalVisible, setTwitterModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMyData = async () => {
      const [data, hasError] = await getMe();
      setMyData(data);
      setAvatarUrl(data.avatarUrl);
      setBio(data.bio);
      setLinksMap(data.linksMap);
      setIsLoading(false);
    };
    fetchMyData();
  }, []);

  const allSocialMedias = [
    { name: "YouTube", isLinked: false },
    { name: "Facebook", isLinked: false },
    { name: "Instagram", isLinked: false },
    { name: "Twitter", isLinked: false },
    { name: "TikTok", isLinked: false },
  ];
  const openCorrectModal = (objName) => {
    switch (objName) {
      case "YouTube":
        setYTModalVisible(true);
        break;
      // case "Facebook":
      //   break;
      case "Instagram":
        setInstagramModalVisible(true);
        break;
      case "Twitter":
        setTwitterModalVisible(true);
        break;
      default:
        break;
    }
  };
  const returnCorrectIcon = (objName) => {
    switch (objName) {
      case "YouTube":
        return <BsYoutube size={30} className="absolute left-3" />;
      case "Facebook":
        return <BsFacebook size={26} className="absolute left-3" />;
      case "Instagram":
        return <BsInstagram size={26} className="absolute left-3" />;
      case "Twitter":
        return <BsTwitter size={26} className="absolute left-3" />;
      case "TikTok":
        return <FaTiktok size={24} className="absolute left-3" />;
      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-center">loading...</p>
      ) : (
        <>
          <Navbar />
          <div className="flex flex-col justify-center items-center mb-16">
            <h1 className="mt-5 text-3xl font-bold">Your Editing Page</h1>
            <div className="relative mt-8 hover:cursor-pointer">
              <img
                onClick={() => setAvatarModalVisible(true)}
                className="rounded-full w-24 h-24 object-cover hover:opacity-50"
                src={avatarUrl}
                alt="pfp"
              />
              <CameraIcon
                className="absolute w-10 h-10 text-gray-700"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: -1,
                }}
              />
            </div>
            <AvatarModal
              avatarModalVisible={avatarModalVisible}
              setAvatarModalVisible={setAvatarModalVisible}
              setAvatarUrl={setAvatarUrl}
            />
            <h3 className="mt-1 font-bold text-lg uppercase">
              @{myData.username}
            </h3>
            <button
              onClick={() => setBioModalVisible(true)}
              onMouseOver={() => setIsHoveringBio(true)}
              onMouseLeave={() => setIsHoveringBio(false)}
              className="mt-2 text-sm w-96 text-center p-1 hover:bg-gray-100 hover:rounded-xl relative"
              style={{ wordBreak: "break-word" }}
            >
              {bio}
              {isHoveringBio && (
                <PencilAltIcon className="absolute bottom-1 w-5 h-5 right-1 text-gray-800" />
              )}
            </button>
            <EditBioModal
              setBio={setBio}
              bioModalVisible={bioModalVisible}
              setBioModalVisible={setBioModalVisible}
            />
            <button className="mt-2 text-blue-500 hover:text-blue-700 text-xs flex flex-row items-center">
              <Link to={`/${myData.username}`}>view your public profile</Link>
              <IoIosShareAlt size={20} className="pb-0.5 ml-1" />
            </button>
            <div className="mt-14 flex flex-col">
              {allSocialMedias.map((obj, idx) => (
                <button
                  key={idx}
                  onClick={() => openCorrectModal(obj.name)}
                  className={
                    linksMap[obj.name].auto.length > 0
                      ? styles.disabledButton
                      : styles.enabledButton
                  }
                >
                  {returnCorrectIcon(obj.name)}
                  {linksMap[obj.name].auto.length > 0
                    ? `Edit ${obj.name}`
                    : `Link ${obj.name}`}
                </button>
              ))}
            </div>
            <LinkYouTubeModal
              ytModalVisible={ytModalVisible}
              setYTModalVisible={setYTModalVisible}
              linksMap={linksMap}
              setLinksMap={setLinksMap}
            />
            <LinkTwitterModal
              twitterModalVisible={twitterModalVisible}
              setTwitterModalVisible={setTwitterModalVisible}
              linksMap={linksMap}
              setLinksMap={setLinksMap}
            />
            <LinkInstagramModal
              instagramModalVisible={instagramModalVisible}
              setInstagramModalVisible={setInstagramModalVisible}
              linksMap={linksMap}
              setLinksMap={setLinksMap}
            />
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
};

const styles = {
  disabledButton:
    "w-64 rounded-full bg-gray-200 m-2 px-3 py-2 text-gray-700 font-semibold flex items-center justify-center relative",
  enabledButton:
    "w-64 rounded-full bg-gray-800 hover:bg-gray-700 m-2 px-3 py-2 text-gray-50 font-semibold flex items-center justify-center relative",
};

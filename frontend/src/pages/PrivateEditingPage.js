import React, { useEffect, useRef, useState } from "react";
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
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

export const PrivateEditingPage = () => {
  const [myData, setMyData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bio, setBio] = useState(null);
  const [isLinkedMap, setIsLinkedMap] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const [isHoveringBio, setIsHoveringBio] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [ytModalVisible, setYTModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMyData = async () => {
      const [data, hasError] = await getMe();
      setMyData(data);
      setAvatarUrl(data.avatarUrl);
      setBio(data.bio);
      setIsLinkedMap(data.isLinkedMap);
      setIsLoading(false);
    };
    fetchMyData();
  }, []);

  const allSocialMedias = [
    { name: "YouTube", isLinked: false },
    { name: "Facebook", isLinked: false },
    { name: "Instagram", isLinked: false },
    { name: "Twitter", isLinked: false },
  ];
  const openCorrectModal = (objName) => {
    switch (objName) {
      case "YouTube":
        setYTModalVisible(true);
        break;
      // case "Facebook":
      //   break;
      // case "Instagram":
      //   break;
      // case "Twitter":
      //   break;
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
          <div className="flex flex-col justify-center items-center ">
            <h1 className="mt-5 text-3xl font-bold">Private Editing Page</h1>
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
            <h3 className="mt-1 font-semibold text-lg">@{myData.username}</h3>
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
                  disabled={isLinkedMap[obj.name]}
                  onClick={() => openCorrectModal(obj.name)}
                  className={
                    isLinkedMap[obj.name]
                      ? styles.disabledButton
                      : styles.enabledButton
                  }
                >
                  {returnCorrectIcon(obj.name)}
                  {isLinkedMap[obj.name]
                    ? `Unlink ${obj.name}`
                    : `Link ${obj.name}`}
                </button>
              ))}
            </div>
            <LinkYouTubeModal
              ytModalVisible={ytModalVisible}
              setYTModalVisible={setYTModalVisible}
              isLinkedMap={isLinkedMap}
              setIsLinkedMap={setIsLinkedMap}
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

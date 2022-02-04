import React, { useEffect, useState } from "react";
import avi from "../assets/images/demar_avi.png";
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import Modal from "react-modal";
import { linkYouTube } from "../services/linkPlatforms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { CameraIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useFetch, useFetchWithJWT } from "../hooks/useFetch";
import "../global";

export const PrivateEditingPage = () => {
  let navigate = useNavigate();
  console.log("what is global.userObj", global.userObj);
  const { data, loading } = useFetchWithJWT(
    "http://localhost:1337/api/users/me",
    global.userObj.jwt
  );
  console.log(data, "SO WHAT IS DATA!?!?!?");
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

  const fetchBio = () => {
    return "Player for the Chicago Bulls. Born and raised in Compton. #Comp10";
  };
  const [isLinkedMap, setIsLinkedMap] = useState({
    YouTube: false,
    Facebook: false,
    Instagram: false,
    Twitter: false,
  }); // need to get inital value from DB
  const [isHoveringBio, setIsHoveringBio] = useState(false);
  const [bio, setBio] = useState(fetchBio());
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [ytModalVisible, setYTModalVisible] = useState(false);

  return (
    <>
      {loading || !data ? (
        <p className="text-center">loading...</p>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <h1 className="mt-5 text-3xl font-bold">Private Editing Page</h1>
          <div className="relative mt-8">
            <img
              className="rounded-full w-24 h-24 hover:opacity-50"
              src={avi}
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
          <h3 className="mt-1 font-semibold text-lg">@{data.username}</h3>
          <button
            onClick={() => setBioModalVisible(true)}
            onMouseOver={() => setIsHoveringBio(true)}
            onMouseLeave={() => setIsHoveringBio(false)}
            className="mt-2 text-sm w-96 text-center p-1 hover:bg-gray-100 hover:rounded-xl relative"
            style={{ wordBreak: "break-word" }}
          >
            {data.bio}
            {isHoveringBio && (
              <PencilAltIcon className="absolute bottom-1 w-5 h-5 right-1 text-gray-800" />
            )}
          </button>
          <EditBioModal
            setBio={setBio}
            bioModalVisible={bioModalVisible}
            setBioModalVisible={setBioModalVisible}
          />
          <button className="mt-2 text-blue-500 text-xs flex flex-row items-center">
            <Link to={`/${data.username}`}>view your public profile</Link>
            <IoIosShareAlt size={20} class="pb-0.5 ml-1" />
          </button>
          <div className="mt-14 flex flex-col">
            {allSocialMedias.map((obj) => (
              <button
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
                  ? `${obj.name} linked`
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
      )}
    </>
  );
};

const EditBioModal = ({ ...props }) => {
  const [newBioText, setNewBioText] = useState("");
  return (
    <Modal
      isOpen={props.bioModalVisible}
      style={styles.modal}
      ariaHideApp={false}
    >
      <div className="flex items-center flex-col">
        <label className="mt-8 text-gray-800 font-semibold text-xl">
          New bio:
          <textarea
            type="text"
            maxLength="140"
            className="border-2 text-sm w-96 h-40 flex rounded-xl p-2"
            placeholder="Limit 140 characters."
            onChange={(event) => setNewBioText(event.target.value)}
          />
        </label>
        <div>
          <button
            onClick={() => props.setBioModalVisible(false)}
            className="rounded-full bg-gray-300 m-2 py-2 px-4"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.setBio(newBioText);
              props.setBioModalVisible(false);
            }}
            className="rounded-full bg-gray-300 m-2 py-2 px-4 bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

const LinkYouTubeModal = ({ ...props }) => {
  const [channelId, setChannelId] = useState("");
  return (
    <Modal
      isOpen={props.ytModalVisible}
      style={styles.modal}
      ariaHideApp={false}
    >
      <div className="flex items-center flex-col">
        <label className="mt-8 text-gray-800 font-semibold text-xl">
          Enter your YouTube channel name: <br />
          <div className="flex flex-row items-center">
            <span className="text-sm font-normal mr-1">
              https://www.youtube.com/channel/
            </span>
            <input
              type="text"
              className="border-2 text-sm w-96 h-10 flex rounded-xl p-2"
              placeholder="UC-lHJZR3Gqxm24_Vd_AJ5Yw (must start with UC)"
              onChange={(event) => setChannelId(event.target.value)}
            />
          </div>
        </label>
        <div>
          <button
            onClick={() => props.setYTModalVisible(false)}
            className="rounded-full bg-gray-300 m-2 py-2 px-4"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              // make this onClick async.
              // first try to see if the inputted channelId is valid. (show loader while doing this)
              const response = await linkYouTube(channelId);
              if (response === "success") {
                toast("Success!");
                props.setIsLinkedMap({
                  ...props.isLinkedMap,
                  YouTube: true,
                });
                props.setYTModalVisible(false);
              } else {
                // trigger some toast alert
                toast("Invalid channel ID");
              }
            }}
            className="rounded-full bg-gray-300 m-2 py-2 px-4 bg-blue-600 text-white"
          >
            Link
          </button>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  disabledButton:
    "w-64 rounded-full bg-gray-200 m-2 px-3 py-2 text-gray-700 font-semibold flex items-center justify-center relative",
  enabledButton:
    "w-64 rounded-full bg-gray-800 m-2 px-3 py-2 text-gray-50 font-semibold flex items-center justify-center relative",
  modal: {
    content: {
      position: "absolute",
      display: "inline-block",
      marginLeft: "auto",
      marginRight: "auto",
      overflow: "hidden",
      borderRadius: "12px",
    },
  },
};

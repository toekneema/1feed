import React, { useState } from "react";
import avi from "../assets/images/demar_avi.png";
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import Modal from "react-modal";
import { linkYouTube } from "../services/linkPlatforms";

export const PrivateEditingPage = () => {
  const allSocialMedias = [
    { name: "YouTube", alreadyLinked: false },
    { name: "Facebook", alreadyLinked: false },
    { name: "Instagram", alreadyLinked: false },
    { name: "Twitter", alreadyLinked: false },
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
        return <BsYoutube size={30} class="absolute left-3" />;
      case "Facebook":
        return <BsFacebook size={26} class="absolute left-3" />;
      case "Instagram":
        return <BsInstagram size={26} class="absolute left-3" />;
      case "Twitter":
        return <BsTwitter size={26} class="absolute left-3" />;
      default:
        break;
    }
  };

  const fetchBio = () => {
    return "Player for the Chicago Bulls. Born and raised in Compton. #Comp10";
  };

  const [isHoveringBio, setIsHoveringBio] = useState(false);
  const [bio, setBio] = useState(fetchBio());
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [ytModalVisible, setYTModalVisible] = useState(false);

  return (
    <div class="flex flex-col justify-center items-center ">
      <h1 class="mt-5 text-3xl font-bold">Private Editing Page</h1>
      <img class="rounded-full w-24 h-24 mt-8" src={avi} alt="pfp" />
      <h3 class="mt-1 font-semibold text-lg">@DeMar_Derozan</h3>
      <button
        onClick={() => setBioModalVisible(true)}
        onMouseOver={() => setIsHoveringBio(true)}
        onMouseLeave={() => setIsHoveringBio(false)}
        class="mt-2 text-sm w-96 text-center p-1 hover:bg-gray-100 hover:rounded-xl relative"
        style={{ wordBreak: "break-word" }}
      >
        {bio}
        {isHoveringBio && (
          <AiFillEdit
            size={20}
            class="absolute bottom-1 right-1 text-gray-800"
          />
        )}
      </button>
      <EditBioModal
        setBio={setBio}
        bioModalVisible={bioModalVisible}
        setBioModalVisible={setBioModalVisible}
      />
      <button class="mt-2 text-blue-500 text-xs flex flex-row items-center">
        view your public profile
        <IoIosShareAlt size={20} class="pb-0.5 ml-1" />
      </button>
      <div class="mt-14 flex flex-col">
        {allSocialMedias.map((obj) => (
          <button
            disabled={obj.alreadyLinked}
            onClick={() => openCorrectModal(obj.name)}
            class={
              obj.alreadyLinked ? styles.disabledButton : styles.enabledButton
            }
          >
            {returnCorrectIcon(obj.name)}
            {obj.alreadyLinked ? `${obj.name} linked` : `Link ${obj.name}`}
          </button>
        ))}
      </div>
      <LinkYouTubeModal
        ytModalVisible={ytModalVisible}
        setYTModalVisible={setYTModalVisible}
      />
    </div>
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
      <div class="flex items-center flex-col">
        <label class="mt-8 text-gray-800 font-semibold text-xl">
          New bio:
          <textarea
            type="text"
            maxLength="140"
            class="border-2 text-sm w-96 h-40 flex rounded-xl p-2"
            placeholder="Limit 140 characters."
            onChange={(event) => setNewBioText(event.target.value)}
          />
        </label>
        <div>
          <button
            onClick={() => props.setBioModalVisible(false)}
            class="rounded-full bg-gray-300 m-2 py-2 px-4"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.setBio(newBioText);
              console.log(newBioText, "hey tehre");
              props.setBioModalVisible(false);
            }}
            class="rounded-full bg-gray-300 m-2 py-2 px-4 bg-blue-600 text-white"
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
      <div class="flex items-center flex-col">
        <label class="mt-8 text-gray-800 font-semibold text-xl">
          Enter your YouTube channel name: <br />
          <div class="flex flex-row items-center">
            <span class="text-sm font-normal mr-1">
              https://www.youtube.com/channel/
            </span>
            <input
              type="text"
              class="border-2 text-sm w-96 h-10 flex rounded-xl p-2"
              placeholder="UC-lHJZR3Gqxm24_Vd_AJ5Yw (must start with UC)"
              onChange={(event) => setChannelId(event.target.value)}
            />
          </div>
        </label>
        <div>
          <button
            onClick={() => props.setYTModalVisible(false)}
            class="rounded-full bg-gray-300 m-2 py-2 px-4"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // make this onClick async.
              // first try to see if the inputted channelId is valid. (show loader while doing this)
              linkYouTube(channelId);
              props.setYTModalVisible(false);
            }}
            class="rounded-full bg-gray-300 m-2 py-2 px-4 bg-blue-600 text-white"
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
      // width: "30%",
      // height: "40%",
      display: "inline-block",
      marginLeft: "auto",
      marginRight: "auto",
      overflow: "hidden",
      borderRadius: "12px",
    },
  },
};

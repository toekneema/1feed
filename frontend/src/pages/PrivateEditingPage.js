import React, { useState } from "react";
import avi from "../assets/images/demar_avi.png";
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Modal from "react-modal";

export const PrivateEditingPage = () => {
  const allSocialMedias = [
    { name: "YouTube", alreadyLinked: true, color: "#FF0000" },
    { name: "Facebook", alreadyLinked: false, color: "#1877f2" },
    { name: "Instagram", alreadyLinked: false, color: "#FF0000" },
    { name: "Twitter", alreadyLinked: false, color: "#FF0000" },
  ];

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
  const [newBioText, setNewBioText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div class="flex flex-col justify-center items-center ">
      <h1 class="mt-5 text-3xl font-bold">Private Editing Page</h1>
      <img class="rounded-full w-24 h-24 mt-8" src={avi} alt="pfp" />
      <h3 class="mt-1 font-semibold text-lg">@DeMar_Derozan</h3>
      <button
        onClick={() => setModalVisible(true)}
        onMouseOver={() => setIsHoveringBio(true)}
        onMouseLeave={() => setIsHoveringBio(false)}
        class="mt-2 text-sm w-96 text-center p-1 hover:bg-gray-200 hover:rounded-xl relative"
        style={{ "word-break": "break-word" }}
      >
        {bio}
        {isHoveringBio && (
          <AiFillEdit
            size={20}
            class="absolute bottom-1 right-1 text-gray-800"
          />
        )}
      </button>

      <Modal isOpen={modalVisible} style={styles.modal}>
        <div class="flex items-center flex-col">
          <label class="mt-8 text-gray-800 font-semibold text-xl">
            New bio:
            <input
              type="text"
              class="border-2 text-sm w-96 h-40 flex rounded-xl p-2"
              placeholder="Limit 140 characters."
              onChange={(event) => setNewBioText(event.target.value)}
            />
          </label>
          <div>
            <button
              onClick={() => setModalVisible(false)}
              class="rounded-full bg-gray-300 m-2 py-2 px-4"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setBio(newBioText);
                console.log(newBioText, "hey tehre");
                setModalVisible(false);
              }}
              class="rounded-full bg-gray-300 m-2 py-2 px-4 bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <button class="mt-2 text-blue-500 text-xs">
        view your public profile
      </button>
      <div class="mt-14 flex flex-col">
        {allSocialMedias.map((obj) => (
          <button
            disabled={obj.alreadyLinked}
            class={
              obj.alreadyLinked ? styles.disabledButton : styles.enabledButton
            }
          >
            {returnCorrectIcon(obj.name)}
            {obj.alreadyLinked ? `${obj.name} linked` : `Link ${obj.name}`}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  disabledButton:
    "w-64 rounded-full bg-gray-200 m-2 px-3 py-2 text-gray-700 font-semibold flex items-center justify-center relative",
  enabledButton:
    "w-64 rounded-full bg-gray-800 m-2 px-3 py-2 text-gray-50 font-semibold flex items-center justify-center relative",
  modal: {
    top: "20%",
    left: "20%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
  },
};

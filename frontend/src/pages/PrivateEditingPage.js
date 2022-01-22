import React, { useState } from "react";
import avi from "../assets/images/demar_avi.png";
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

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

  const [isHoveringBio, setIsHoveringBio] = useState(false);
  const [bio, setBio] = useState(false);
  const [bioIsDiff, setBioIsDiff] = useState(false);
  return (
    <div class="flex flex-col justify-center items-center ">
      <h1 class="mt-5 text-3xl font-bold">Private Editing Page</h1>
      <img class="rounded-full w-24 h-24 mt-8" src={avi} alt="pfp" />
      <h3 class="mt-1 font-semibold text-lg">@DeMar_Derozan</h3>
      <button
        onMouseOver={() => setIsHoveringBio(true)}
        onMouseLeave={() => setIsHoveringBio(false)}
        class="mt-2 text-sm w-72 text-center p-1 hover:bg-gray-200 hover:rounded-xl relative"
      >
        Player for the Chicago Bulls. Born and raised in Compton. #Comp10
        {isHoveringBio && (
          <AiFillEdit
            size={20}
            class="absolute bottom-1 right-1 text-gray-800"
          />
        )}
      </button>
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
};

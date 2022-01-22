import React, { useState } from "react";
import avi from "../assets/images/demar_avi.png";

export const PrivateEditingPage = () => {
  const allSocialMedias = [
    { name: "YouTube", alreadyLinked: true },
    { name: "Facebook" },
    { name: "Instagram" },
    { name: "Twitter" },
  ];
  const [isPublishable, setIsPublishable] = useState(false);
  return (
    <div class="flex flex-col justify-center items-center ">
      {/* <Link to="/edit">
        <h1>Dashboard</h1>
      </Link> */}
      {/* <button
        disabled={!isPublishable}
        class={
          isPublishable
            ? "absolute top-5 right-10 rounded-full bg-blue-700 text-white py-2 px-4"
            : "absolute top-5 right-10 rounded-full bg-gray-300 text-gray-700 py-2 px-4"
        }
      >
        Publish
      </button> */}
      <h1 class="mt-5 text-3xl font-bold">Private Editing Page</h1>
      <img class="rounded-full w-24 h-24 mt-8" src={avi} alt="pfp" />
      <h3 class="mt-1 font-semibold text-lg">@DeMar_Derozan</h3>
      <p class="mt-2 text-sm w-72 text-center">
        Player for the Chicago Bulls. Born and raised in Compton. #Comp10
      </p>
      <button class="mt-2 text-blue-500 text-xs">
        view your public profile
      </button>
      <div class="mt-14 flex flex-col">
        {allSocialMedias.map((obj) => (
          <button
            disabled={obj.alreadyLinked}
            class={
              obj.alreadyLinked
                ? "w-44 rounded-full bg-gray-200 m-2 px-3 py-2 text-gray-700"
                : "w-44 rounded-full bg-red-300 m-2 px-3 py-2 text-gray-900"
            }
          >
            {/* <img /> */}
            {obj.alreadyLinked ? `${obj.name} linked!` : `Link ${obj.name}`}
          </button>
        ))}
      </div>
    </div>
  );
};

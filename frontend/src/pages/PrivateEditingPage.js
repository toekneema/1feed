import React from "react";
import avi from "../assets/images/demar_avi.png";

export const PrivateEditingPage = () => {
  const allSocialMedias = [
    { name: "YouTube", alreadyLinked: true },
    { name: "Facebook" },
    { name: "Instagram" },
    { name: "Twitter" },
  ];
  return (
    <div class="flex flex-col justify-center items-center ">
      {/* <Link to="/edit">
        <h1>Dashboard</h1>
      </Link> */}
      <p1>Private Admin Dashboard Page</p1>
      <img class="rounded-full w-24 h-24 mt-8" src={avi} alt="pfp" />
      <p1 class="mt-1">@DeMar_Derozan</p1>
      <div class="mt-14 flex flex-col">
        {allSocialMedias.map((obj) => (
          <button
            disabled={obj.alreadyLinked}
            class={
              obj.alreadyLinked
                ? "w-44 rounded-full bg-gray-200 m-2 px-3 py-2"
                : "w-44 rounded-full bg-red-300 m-2 px-3 py-2"
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

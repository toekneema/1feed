import React from "react";
import avi from "../assets/images/demar_avi.png";

export const PublicProfilePage = () => {
  return (
    <div class="flex flex-col justify-center items-center ">
      <p1>Public Profile page</p1>
      <img class="rounded-full w-24 h-24" src={avi} alt="pfp" />
      <p1>@DeMar_Derozan</p1>
    </div>
  );
};

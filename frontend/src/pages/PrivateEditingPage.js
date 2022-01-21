import React from "react";
import avi from "../assets/images/demar_avi.png";

export const PrivateEditingPage = () => {
  return (
    <div class="flex flex-col justify-center items-center ">
      {/* <Link to="/edit">
        <h1>Dashboard</h1>
      </Link> */}
      <p1>Private Admin Dashboard Page</p1>
      <img class="rounded-full w-24 h-24 mt-8" src={avi} alt="pfp" />
      <p1>@DeMar_Derozan</p1>
    </div>
  );
};

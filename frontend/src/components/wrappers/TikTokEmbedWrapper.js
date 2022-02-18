import React from "react";
import { TikTokEmbed } from "react-social-media-embed";

export const TikTokEmbedWrapper = ({ ...props }) => {
  return (
    <div>
      <p className="border-x-2 border-t-2 border-black pl-2">TIKTOK</p>
      <div className="border-2 border-black">
        <TikTokEmbed url={props.url} />
      </div>
    </div>
  );
};

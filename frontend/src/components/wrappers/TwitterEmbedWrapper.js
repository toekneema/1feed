import React from "react";
import { TwitterEmbed } from "react-social-media-embed";

export const TwitterEmbedWrapper = ({ ...props }) => {
  return (
    <div>
      <p className="border-x-2 border-t-2 border-black pl-2">TWITTER</p>
      <div className="border-2 border-black">
        <TwitterEmbed url={props.url} />
      </div>
    </div>
  );
};

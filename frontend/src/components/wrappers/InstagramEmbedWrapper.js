import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

export const InstagramEmbedWrapper = ({ ...props }) => {
  return (
    <div>
      <p className="border-x-2 border-t-2 border-black pl-2">INSTAGRAM</p>
      <div className="border-2 border-black">
        <InstagramEmbed url={props.url} />
      </div>
    </div>
  );
};

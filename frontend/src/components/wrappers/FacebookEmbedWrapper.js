import React from "react";
import { FacebookEmbed } from "react-social-media-embed";

export const FacebookEmbedWrapper = ({ ...props }) => {
  return (
    <div>
      <p className="border-x-2 border-t-2 border-black pl-2">FACEBOOK</p>
      <div className="border-2 border-black">
        <FacebookEmbed url={props.url} />
      </div>
    </div>
  );
};

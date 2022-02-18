import React from "react";
import { LinkedInEmbed } from "react-social-media-embed";

export const LinkedInEmbedWrapper = ({ ...props }) => {
  return (
    <div>
      <p className="border-x-2 border-t-2 border-black pl-2">LINKEDIN</p>
      <div className="border-2 border-black">
        <LinkedInEmbed url={props.url} />
      </div>
    </div>
  );
};

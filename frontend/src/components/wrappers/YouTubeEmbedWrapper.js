import React from "react";
import { YouTubeEmbed } from "react-social-media-embed";

export const YouTubeEmbedWrapper = ({ ...props }) => {
  return (
    <div>
      <p className="border-x-2 border-t-2 border-black pl-2">YOUTUBE</p>
      <div className="border-2 border-black">
        <YouTubeEmbed url={props.url} />
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { updateUser } from "../services/user";
import Modal from "react-modal";
import { styles } from "../styles";
import { toast } from "react-toastify";
import { getYouTube } from "../services/youtube";

export const LinkYouTubeModal = ({ ...props }) => {
  const [channelId, setChannelId] = useState("");
  return (
    <Modal
      isOpen={props.ytModalVisible}
      style={styles.modal}
      ariaHideApp={false}
    >
      <div className="flex w-full h-full items-center flex-col">
        <label className="mt-8 text-gray-800 font-semibold text-xl text-center">
          Enter your YouTube channel ID:
          <p className="text-sm font-normal italic text-start text-gray-600">
            (Must start with UC)
          </p>
          <div className="mt-4 flex w-full flex-row items-center flex-wrap justify-center">
            <span className="text-sm font-semibold mr-1">
              https://www.youtube.com/channel/
            </span>
            <input
              type="text"
              className="border-2 border-gray-800 text-sm w-96 h-10 flex rounded-xl p-2"
              placeholder="UC-lHJZR3Gqxm24_Vd_AJ5Yw"
              onChange={(event) => setChannelId(event.target.value)}
            />
          </div>
        </label>
        <div className="mt-8">
          <button
            onClick={() => props.setYTModalVisible(false)}
            className="rounded-full font-semibold bg-gray-300 hover:bg-gray-400 m-2 py-2 px-4"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              // first try to see if the inputted channelId is valid. (show loader while doing this)
              const response = await getYouTube(channelId);
              if (response === "success") {
                const [data, hasError] = await updateUser({
                  linksMap: {
                    ...props.linksMap,
                    YouTube: [...props.linksMap.YouTube, channelId],
                  },
                });
                props.setLinksMap(data.linksMap);
                props.setYTModalVisible(false);
                toast("Success!");
              } else {
                toast("Invalid channel ID");
              }
            }}
            className="rounded-full font-semibold bg-blue-600 hover:bg-blue-800 m-2 py-2 px-4 text-white"
          >
            Link
          </button>
        </div>
      </div>
    </Modal>
  );
};

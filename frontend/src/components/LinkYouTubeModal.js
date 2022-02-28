import React, { useEffect, useState } from "react";
import { updateUser } from "../services/user";
import Modal from "react-modal";
import { styles } from "../styles";
import { toast } from "react-toastify";
import { getYouTube } from "../services/youtube";
import { TrashIcon } from "@heroicons/react/solid";

export const LinkYouTubeModal = ({ ...props }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 1200;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);
  const [channelId, setChannelId] = useState("");
  const [linksMapHook, setLinksMapHook] = useState(props.linksMap); // only necessary since i want to re-render based on this variable changing

  return (
    <Modal
      isOpen={props.ytModalVisible}
      style={isMobile ? styles.mobileModal : styles.webModal}
      ariaHideApp={false}
    >
      <div className="flex w-full h-full items-center flex-col overflow-auto">
        <label
          className={
            isMobile
              ? "mt-3 text-gray-800 font-semibold text-xl text-center"
              : "mt-8 text-gray-800 font-semibold text-xl text-center"
          }
        >
          Enter your YouTube channel ID:
          <p className="text-sm font-normal italic text-start text-gray-600">
            (Must start with UC)
          </p>
        </label>
        {linksMapHook.YouTube.length > 0 ? (
          <>
            {linksMapHook.YouTube.map((channelId, idx) => (
              <DisabledChannelInput
                key={idx}
                channelId={channelId}
                linksMapHook={linksMapHook}
                setLinksMapHook={setLinksMapHook}
                isMobile={isMobile}
              />
            ))}
            <ChannelInput setChannelId={setChannelId} isMobile={isMobile} />
          </>
        ) : (
          <ChannelInput setChannelId={setChannelId} isMobile={isMobile} />
        )}
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
              const [data, hasError] = await getYouTube(channelId);
              if (hasError) {
                toast(`Invalid channel ID "${channelId}".`);
              } else if (linksMapHook.YouTube.includes(channelId)) {
                toast("Cannot link the same channel ID again.");
              } else {
                const [userData, hasError] = await updateUser({
                  linksMap: {
                    ...props.linksMap,
                    YouTube: [...props.linksMap.YouTube, channelId],
                  },
                });
                props.setYTModalVisible(false);
                props.setLinksMap(userData.linksMap);
                setLinksMapHook(userData.linksMap);
                toast(`Successfully linked YouTube channel ID "${channelId}".`);
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

const DisabledChannelInput = ({ ...props }) => {
  return (
    <div className="mt-4 flex w-full flex-col items-center relative">
      <span
        className={
          props.isMobile
            ? "text-sm tracking-tighter font-semibold text-gray-500 mr-1"
            : "text-sm font-semibold text-gray-500 mr-1"
        }
      >
        https://www.youtube.com/channel/
      </span>
      <div className="flex items-center justify-center w-full relative">
        <input
          disabled
          type="text"
          className={
            props.isMobile
              ? "border-2 border-gray-400 text-sm w-full h-10 flex rounded-xl p-2"
              : "border-2 border-gray-400 text-sm w-96 h-10 flex rounded-xl p-2"
          }
          placeholder={props.channelId}
        />
        <button className="absolute right-1 text-red-500">
          <TrashIcon
            className="w-6 h-6"
            onClick={async () => {
              const [userData, hasError] = await updateUser({
                linksMap: {
                  ...props.linksMapHook,
                  YouTube: props.linksMapHook.YouTube.filter(
                    (item) => item !== props.channelId
                  ),
                },
              });
              props.setLinksMapHook(userData.linksMap);
              hasError
                ? toast(`Error unlinking ${props.channelId}.`)
                : toast(
                    `Successfully unlinked YouTube channel ID "${props.channelId}".`
                  );
            }}
          />
        </button>
      </div>
    </div>
  );
};

const ChannelInput = ({ setChannelId, isMobile }) => {
  const [currInput, setCurrInput] = useState("");
  return (
    <div className="mt-4 flex w-full flex-col items-center">
      <span
        className={
          isMobile
            ? "text-sm tracking-tighter font-semibold"
            : "text-sm font-semibold"
        }
      >
        https://www.youtube.com/channel/
        <span className="text-gray-600 text-base">{currInput}</span>
      </span>
      <div className="flex w-full justify-center">
        <input
          type="text"
          className={
            isMobile
              ? "border-2 border-gray-800 text-sm w-full h-10 flex rounded-xl p-2"
              : "border-2 border-gray-800 text-sm w-96 h-10 flex rounded-xl p-2"
          }
          placeholder="UC-lHJZR3Gqxm24_Vd_AJ5Yw"
          onChange={(event) => {
            setCurrInput(event.target.value);
            setChannelId(event.target.value);
          }}
        />
      </div>
    </div>
  );
};

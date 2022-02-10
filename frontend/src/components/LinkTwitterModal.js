import React, { useState } from "react";
import { updateUser } from "../services/user";
import Modal from "react-modal";
import { styles } from "../styles";
import { toast } from "react-toastify";
import { getTwitter } from "../services/twitter";

export const LinkTwitterModal = ({ ...props }) => {
  const [twitterUsername, setTwitterUsername] = useState("");
  return (
    <Modal
      isOpen={props.twitterModalVisible}
      style={styles.modal}
      ariaHideApp={false}
    >
      <div className="flex w-full h-full items-center flex-col">
        <label className="mt-8 text-gray-800 font-semibold text-xl text-center">
          Enter your Twitter username:
          <div className="mt-4 flex w-full flex-row items-center flex-wrap justify-center">
            <span className="text-2xl font-normal mr-1">@</span>
            <input
              type="text"
              className="border-2 border-gray-800 text-sm w-5/6 h-10 flex rounded-xl p-2"
              placeholder="username"
            />
          </div>
        </label>
        <div className="mt-8">
          <button
            className="rounded-full font-semibold bg-gray-300 hover:bg-gray-400 m-2 py-2 px-4"
            onClick={() => props.setTwitterModalVisible(false)}
          >
            Cancel
          </button>
          <button
            className="rounded-full font-semibold bg-blue-600 hover:bg-blue-800 m-2 py-2 px-4 text-white"
            onClick={async () => {
              const [data, hasError] = await getTwitter(twitterUsername);
              if (hasError) {
                toast(
                  "Error linking Twitter account. The username entered may be non-existent."
                );
              } else {
                toast("Successfully linked Twitter account!");
                props.setTwitterModalVisible(false);
              }
            }}
          >
            Link
          </button>
        </div>
      </div>
    </Modal>
  );
};

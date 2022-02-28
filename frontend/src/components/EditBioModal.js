import React, { useState } from "react";
import { updateUser } from "../services/user";
import Modal from "react-modal";
import { styles } from "../styles";

export const EditBioModal = ({ ...props }) => {
  const [newBioText, setNewBioText] = useState("");
  return (
    <Modal
      isOpen={props.bioModalVisible}
      style={styles.webModal}
      ariaHideApp={false}
    >
      <div className="flex items-center flex-col">
        <label className="mt-8 text-gray-800 font-semibold text-xl">
          New bio:
          <textarea
            type="text"
            maxLength="140"
            className="border-2 border-gray-800 text-sm w-96 h-40 flex rounded-xl p-2"
            placeholder="Limit 140 characters."
            onChange={(event) => setNewBioText(event.target.value)}
          />
        </label>
        <div>
          <button
            onClick={() => props.setBioModalVisible(false)}
            className="rounded-full bg-gray-300 m-2 py-2 px-4"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              const [data, hasError] = await updateUser({ bio: newBioText });
              props.setBio(data.bio);
              props.setBioModalVisible(false);
            }}
            className="rounded-full bg-gray-300 m-2 py-2 px-4 bg-blue-600 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

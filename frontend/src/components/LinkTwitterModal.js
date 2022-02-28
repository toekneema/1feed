import React, { useEffect, useState } from "react";
import { updateUser } from "../services/user";
import Modal from "react-modal";
import { styles } from "../styles";
import { toast } from "react-toastify";
import { getFormattedTwitterUsernameIfExists } from "../services/twitter";
import { TrashIcon } from "@heroicons/react/solid";
export const LinkTwitterModal = ({ ...props }) => {
  const [twitterUsername, setTwitterUsername] = useState("");
  const [linksMapHook, setLinksMapHook] = useState(props.linksMap); // only necessary since i want to re-render based on this variable changing

  return (
    <Modal
      isOpen={props.twitterModalVisible}
      style={styles.webModal}
      ariaHideApp={false}
    >
      <div className="flex w-full h-full items-center flex-col overflow-auto">
        <label className="mt-8 text-gray-800 font-semibold text-xl text-center">
          Enter your Twitter username:
        </label>
        {linksMapHook.Twitter.length > 0 ? (
          <>
            {linksMapHook.Twitter.map((username, idx) => (
              <DisabledUsernameInput
                key={idx}
                username={username}
                linksMapHook={linksMapHook}
                setLinksMapHook={setLinksMapHook}
              />
            ))}
            <UsernameInput setTwitterUsername={setTwitterUsername} />
          </>
        ) : (
          <UsernameInput setTwitterUsername={setTwitterUsername} />
        )}

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
              const [twitterApiData, hasError] =
                await getFormattedTwitterUsernameIfExists(twitterUsername);
              if (hasError) {
                toast("Username does not exist on Twitter.");
                return;
              }
              const formattedTwitterUsername = parseUsernameFromUrl(
                twitterApiData.url
              );
              if (linksMapHook.Twitter.includes(formattedTwitterUsername)) {
                toast("Cannot link the same username again.");
              } else {
                const [userData, hasError] = await updateUser({
                  linksMap: {
                    ...linksMapHook,
                    Twitter: [
                      ...linksMapHook.Twitter,
                      formattedTwitterUsername,
                    ],
                  },
                });
                props.setTwitterModalVisible(false);
                props.setLinksMap(userData.linksMap); // passes the data to parent (outside of modal)
                setLinksMapHook(userData.linksMap); // used to update the current modal
                toast(
                  `Successfully linked Twitter account "${formattedTwitterUsername}".`
                );
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

const DisabledUsernameInput = ({ ...props }) => {
  return (
    <div className="mt-4 flex w-2/3 flex-row items-center justify-center relative">
      <span className="text-2xl font-normal text-gray-500 mr-1">@</span>
      <input
        disabled
        type="text"
        className="border-2 border-gray-400 text-sm w-5/6 h-10 flex rounded-xl p-2"
        placeholder={props.username}
      />
      <button className="absolute text-red-500" style={{ right: "-12px" }}>
        <TrashIcon
          className="w-6 h-6"
          onClick={async () => {
            const [userData, hasError] = await updateUser({
              linksMap: {
                ...props.linksMapHook,
                Twitter: props.linksMapHook.Twitter.filter(
                  (item) => item !== props.username
                ),
              },
            });
            props.setLinksMapHook(userData.linksMap);
            hasError
              ? toast(`Error unlinking ${props.username}.`)
              : toast(
                  `Successfully unlinked Twitter account "${props.username}".`
                );
          }}
        />
      </button>
    </div>
  );
};

const UsernameInput = ({ setTwitterUsername }) => {
  return (
    <div className="mt-4 flex w-2/3 flex-row items-center justify-center">
      <span className="text-2xl font-normal mr-1">@</span>
      <input
        type="text"
        className="border-2 border-gray-800 text-sm w-5/6 h-10 flex rounded-xl p-2"
        placeholder="username"
        onChange={(event) => setTwitterUsername(event.target.value)}
      />
    </div>
  );
};

const parseUsernameFromUrl = (url) => {
  const splitArr = url.split("/");
  const twitterUsername = splitArr[splitArr.length - 1];
  return twitterUsername;
};

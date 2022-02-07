import React, { useEffect, useState } from "react";
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import Modal from "react-modal";
import { linkYouTube } from "../services/linkPlatforms";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  CameraIcon,
  PencilAltIcon,
  XIcon,
  ArrowSmLeftIcon,
  ZoomOutIcon,
  ZoomInIcon,
} from "@heroicons/react/solid";
import "../global";
import { getMe, updateUser } from "../services/user";
import { Navbar } from "../components/Navbar";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";

export const PrivateEditingPage = () => {
  const [myData, setMyData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bio, setBio] = useState(null);
  const [isLinkedMap, setIsLinkedMap] = useState(null);
  const [loading, setIsLoading] = useState(true);

  const [isHoveringBio, setIsHoveringBio] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [bioModalVisible, setBioModalVisible] = useState(false);
  const [ytModalVisible, setYTModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMyData = async () => {
      const [data, hasError] = await getMe();
      setMyData(data);
      setAvatarUrl(data.avatarUrl);
      setBio(data.bio);
      setIsLinkedMap(data.isLinkedMap);
      setIsLoading(false);
    };
    fetchMyData();
  }, []);

  const allSocialMedias = [
    { name: "YouTube", isLinked: false },
    { name: "Facebook", isLinked: false },
    { name: "Instagram", isLinked: false },
    { name: "Twitter", isLinked: false },
  ];
  const openCorrectModal = (objName) => {
    switch (objName) {
      case "YouTube":
        setYTModalVisible(true);
        break;
      // case "Facebook":
      //   break;
      // case "Instagram":
      //   break;
      // case "Twitter":
      //   break;
      default:
        break;
    }
  };
  const returnCorrectIcon = (objName) => {
    switch (objName) {
      case "YouTube":
        return <BsYoutube size={30} className="absolute left-3" />;
      case "Facebook":
        return <BsFacebook size={26} className="absolute left-3" />;
      case "Instagram":
        return <BsInstagram size={26} className="absolute left-3" />;
      case "Twitter":
        return <BsTwitter size={26} className="absolute left-3" />;
      default:
        break;
    }
  };

  return (
    <>
      {loading ? (
        <p className="text-center">loading...</p>
      ) : (
        <>
          <Navbar />
          <div className="flex flex-col justify-center items-center ">
            <h1 className="mt-5 text-3xl font-bold">Private Editing Page</h1>
            <div className="relative mt-8 hover:cursor-pointer">
              <img
                onClick={() => setAvatarModalVisible(true)}
                className="rounded-full w-24 h-24 object-cover hover:opacity-50"
                src={avatarUrl}
                alt="pfp"
              />
              <CameraIcon
                className="absolute w-10 h-10 text-gray-700"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: -1,
                }}
              />
            </div>
            <AvatarModal
              avatarModalVisible={avatarModalVisible}
              setAvatarModalVisible={setAvatarModalVisible}
            />
            <h3 className="mt-1 font-semibold text-lg">@{myData.username}</h3>
            <button
              onClick={() => setBioModalVisible(true)}
              onMouseOver={() => setIsHoveringBio(true)}
              onMouseLeave={() => setIsHoveringBio(false)}
              className="mt-2 text-sm w-96 text-center p-1 hover:bg-gray-100 hover:rounded-xl relative"
              style={{ wordBreak: "break-word" }}
            >
              {bio}
              {isHoveringBio && (
                <PencilAltIcon className="absolute bottom-1 w-5 h-5 right-1 text-gray-800" />
              )}
            </button>
            <EditBioModal
              setBio={setBio}
              bioModalVisible={bioModalVisible}
              setBioModalVisible={setBioModalVisible}
            />
            <button className="mt-2 text-blue-500 hover:text-blue-700 text-xs flex flex-row items-center">
              <Link to={`/${myData.username}`}>view your public profile</Link>
              <IoIosShareAlt size={20} className="pb-0.5 ml-1" />
            </button>
            <div className="mt-14 flex flex-col">
              {allSocialMedias.map((obj, idx) => (
                <button
                  key={idx}
                  disabled={isLinkedMap[obj.name]}
                  onClick={() => openCorrectModal(obj.name)}
                  className={
                    isLinkedMap[obj.name]
                      ? styles.disabledButton
                      : styles.enabledButton
                  }
                >
                  {returnCorrectIcon(obj.name)}
                  {isLinkedMap[obj.name]
                    ? `Unlink ${obj.name}`
                    : `Link ${obj.name}`}
                </button>
              ))}
            </div>
            <LinkYouTubeModal
              ytModalVisible={ytModalVisible}
              setYTModalVisible={setYTModalVisible}
              isLinkedMap={isLinkedMap}
              setIsLinkedMap={setIsLinkedMap}
            />
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
};

const AvatarModal = ({ ...props }) => {
  const [imgPreviewUrl, setImgPreviewUrl] = useState(null);
  const [scaleValue, setScaleValue] = useState(1);
  const handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      toast(rejectedFiles[0].errors[0].message + ".");
    } else {
      // now send to next stage, cropping
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          console.log(reader.result, "heyoooooo");
          setImgPreviewUrl(reader.result);
        },
        false
      );
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Modal
      isOpen={props.avatarModalVisible}
      style={styles.modal}
      ariaHideApp={false}
    >
      {imgPreviewUrl ? (
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setImgPreviewUrl(null)}
              className="w-10 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            >
              <ArrowSmLeftIcon className="h-6 w-6 text-gray-400" />
            </button>
            <button
              onClick={() => {
                setImgPreviewUrl(null);
                props.setAvatarModalVisible(false);
              }}
              className="rounded-3xl font-semibold bg-blue-500 text-gray-50 hover:bg-blue-600 px-5 py-1"
            >
              Apply
            </button>
          </div>
          {/* <div className="flex-1 border-2 justify-center items-center border-gray-800 rounded-full overflow-hidden">
            <img src={imgPreviewUrl} alt="avatar-preview" />
          </div> */}
          <div className="flex justify-center">
            <AvatarEditor
              image={imgPreviewUrl}
              width={200}
              height={200}
              borderRadius={100}
              scale={scaleValue}
              color={[255, 0, 0, 0.3]}
              className="border-4 border-gray-800"
            />
          </div>
          <div className="flex flex-row justify-center mt-2">
            <ZoomOutIcon className="w-5 h-5 text-gray-700" />
            <input
              type="range"
              min="50"
              max="100"
              defaultValue={50}
              onChange={(event) => {
                setScaleValue(event.target.value / 50);
              }}
              className="mx-2"
            />
            <ZoomInIcon className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center">
          <button
            onClick={() => props.setAvatarModalVisible(false)}
            className="w-10 h-8 rounded-full bg-gray-200 hover:bg-gray-300 mb-4 flex items-center justify-center"
          >
            <XIcon className="h-6 w-6 text-gray-400" />
          </button>
          <Dropzone
            onDrop={(files, rejectedFiles) =>
              handleOnDrop(files, rejectedFiles)
            }
            multiple={false}
            accept="image/x-png, image/png, image/jpg, image/jpeg, image/gif"
            maxSize={2000000}
            maxFiles={1}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="border-2 border-dashed rounded-lg border-gray-800 w-full h-full flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <p className="text-center text-xl text-gray-800">
                  Drag and drop file here, or click to select file.
                </p>
                <p className="text-center text-gray-800">Max size 2MB.</p>
              </div>
            )}
          </Dropzone>
        </div>
      )}
    </Modal>
  );
};

const EditBioModal = ({ ...props }) => {
  const [newBioText, setNewBioText] = useState("");
  return (
    <Modal
      isOpen={props.bioModalVisible}
      style={styles.modal}
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

const LinkYouTubeModal = ({ ...props }) => {
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
              const response = await linkYouTube(channelId);
              if (response === "success") {
                toast("Success!");
                const [data, hasError] = await updateUser({
                  isLinkedMap: { ...props.isLinkedMap, YouTube: true },
                });
                props.setIsLinkedMap(data.isLinkedMap);
                props.setYTModalVisible(false);
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

const styles = {
  disabledButton:
    "w-64 rounded-full bg-gray-200 m-2 px-3 py-2 text-gray-700 font-semibold flex items-center justify-center relative",
  enabledButton:
    "w-64 rounded-full bg-gray-800 hover:bg-gray-700 m-2 px-3 py-2 text-gray-50 font-semibold flex items-center justify-center relative",
  modal: {
    content: {
      position: "absolute",
      display: "inline-block",
      marginLeft: "auto",
      marginRight: "auto",
      overflow: "hidden",
      borderRadius: "12px",
      width: "40%",
      height: "50%",
      background: "linear-gradient(to bottom right, #fffff5, #fdf5ff)",
      boxShadow: "12px 12px",
      border: "2px solid rgba(0,0,0,1)",
    },
  },
};

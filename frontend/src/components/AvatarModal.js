import React, { useRef, useState } from "react";
import {
  ArrowSmLeftIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@heroicons/react/solid";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { uploadToS3 } from "../services/s3";
import { styles } from "../styles";
import { updateUser } from "../services/user";

export const AvatarModal = ({ ...props }) => {
  const [imgPreviewUrl, setImgPreviewUrl] = useState(null);
  const [scaleValue, setScaleValue] = useState(1);
  const avatarEditorRef = useRef();
  const handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      toast(rejectedFiles[0].errors[0].message + ".");
    } else {
      // now send to next stage, cropping
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
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
      style={styles.webModal}
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
              onClick={async () => {
                if (avatarEditorRef.current) {
                  // returns a HTMLCanvasElement
                  const canvas = avatarEditorRef.current.getImage();
                  const [data, hasError] = await uploadToS3(canvas);
                  if (data) {
                    const newAvatarUrl =
                      "https://duwpq7vr7cr0y.cloudfront.net/" + data;
                    const [_, __] = await updateUser({
                      avatarUrl: newAvatarUrl,
                    });
                    setImgPreviewUrl(null);
                    setScaleValue(1);
                    props.setAvatarUrl(newAvatarUrl);
                    props.setAvatarModalVisible(false);
                  } else {
                    toast("Error uploading file to AWS S3");
                  }
                } else {
                  toast("Error cropping image");
                }
              }}
              className="rounded-3xl font-semibold bg-blue-500 text-gray-50 hover:bg-blue-600 px-5 py-1"
            >
              Apply
            </button>
          </div>
          <div className="flex justify-center">
            <AvatarEditor
              ref={avatarEditorRef}
              image={imgPreviewUrl}
              width={200}
              height={200}
              borderRadius={100}
              scale={scaleValue}
              color={[0, 0, 0, 0.3]}
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

import { uploadFile } from "react-s3";

window.Buffer = window.Buffer || require("buffer").Buffer;
const REGION = "us-east-1";
const S3_BUCKET = "elasticbeanstalk-us-east-1-524737399408";
const AWS_ACCESS_KEY_ID = "AKIAXULGJJJYJXBVHPHW";
const AWS_SECRET_ACCESS_KEY = "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";

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};

export const uploadToS3 = async (canvas) => {
  let hasError = false;
  var randomlyGeneratedImageName = generateId();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve));
  const file = new File([blob], randomlyGeneratedImageName);

  try {
    const response = await uploadFile(file, config);
  } catch {
    hasError = true;
  }
  return [randomlyGeneratedImageName, hasError];
};

// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

// generateId :: Integer -> String
function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

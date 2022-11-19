import { AWSAppSyncRealTimeProvider } from "@aws-amplify/pubsub";
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

const region = "eu-west-2";
const bucketName = "questr-image-bucket";

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

// request a url from s3 to send the image to
export async function generateUploadURL() {
  // create unqiue name for each image
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = { Bucket: bucketName, Key: imageName, Expires: 60 }; // 60 seconds

  const uploadURL = await S3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

/* const { url } = await fetch("/s3Url").then((res) => res.json());
console.log(url);
// post the image direclty to the s3 bucket      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data.uri,
      });

      const imageUrl = url.split("?")[0];
      console.log(imageUrl); */

let USER_ID = "alexmsmith";
let PAT = "44e576875aeb4838bfb766db8dc9dd3c";
let APP_ID = "my-first-application";
let MODEL_ID = "general-image-recognition";

MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";
const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";

const postUrlClarifai = async (URL, predict, setPredict) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  fetch(
    "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

//postUrlClarifai();

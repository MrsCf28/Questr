import { ConsoleLogger } from "@aws-amplify/core";

let USER_ID = "alexmsmith";
let PAT = "2504ebd866a24a6a823a993efd91f6ca";
let APP_ID = "rock-paper-scissors";
let MODEL_ID = "rock-paper-scissors";

MODEL_VERSION_ID = "cdeaa64feb9744b2b2da51dfad6ee3f4";

const postRPSClarifai = async (IMAGE_BYTES_STRING, predict, setPredict) => {
  console.log("RPS POST");

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            base64: IMAGE_BYTES_STRING,
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
    .then((result) => {
      result = JSON.parse(result);

      //console.log(result);
      let predictions = result.outputs[0].data.concepts;

      console.log(predictions);
      /*       predictions.forEach((i) => {
        console.log(i.name, i.value);
      }); */
      setPredict(() => setPredict(predictions));
      return predictions;
    })
    .catch((err) => console.log("error", err));
};

export default postRPSClarifai;

let USER_ID = "alexmsmith";
let PAT = "44e576875aeb4838bfb766db8dc9dd3c";
let APP_ID = "my-first-application";
let MODEL_ID = "general-image-recognition";

MODEL_VERSION_ID = "aa7f35c01e0642fda5cf400f543e7c40";

const postClarifai = async (IMAGE_BYTES_STRING, predict, setPredict) => {
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
  const fetchPredictions = fetch(
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
      let predictions = result.outputs[0].data.concepts;
      //console.log(predictions);
      /*       predictions.forEach((i) => {
        console.log(i.name, i.value);
      }); */
      setPredict(() => setPredict(predictions));
      return predictions;
    })
    .catch((err) => console.log("error", err));

  fetchPredictions.then((res) => {
    //console.log("Received response", res);
    //console.log(predict);
  });
};

export default postClarifai;

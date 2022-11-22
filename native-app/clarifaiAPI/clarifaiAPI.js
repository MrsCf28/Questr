import axios from "axios";

const localApi = axios.create({
  baseURL: "https://questr-clarifai.cyclic.app/api",
});

export function fetchImagePredictions(url) {
  ///console.log("query in the api", query);
  let body = { body: url };
  return localApi.post("/image", body).then((res) => {
    return res.data;
  });
}

export function fetchRPSPredictions(url) {
  let body = { body: url };
  ///console.log("query in the api", query);
  return localApi.post("/rps", body).then((res) => {
    return res.data;
  });
}

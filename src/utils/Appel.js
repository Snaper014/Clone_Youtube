import axios from "axios";
import { HOST, KEY_API, URL } from "../config";

const options = {
  headers: {
    "X-RapidAPI-Key": `${KEY_API}`,
    "X-RapidAPI-Host": `${HOST}`,
  },
};

async function Recherche(search, token = "") {
  const endpoint = `search?query=${search}&token=${token}&geo=FR&lang=fr`;
  const reponse = await axios
    .get(`${URL}/${endpoint}`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function fetchTrends(categorie = "now") {
  const endpoint = `trending?geo=FR&type=${categorie}&lang=fr`;
  const reponse = await axios
    .get(`${URL}/${endpoint}`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function FetchMusique() {
  const reponse = await axios
    .get(
      `${URL}/channel/home?id=UC-9-kyTW8ZkZNDHQJ6FgpwQ&geo=FR&lang=fr`,
      options,
    )
    .catch((error) => console.log(error.message));
  return reponse;
}
async function FetchHomeShorts() {
  const reponse = await axios
    .get(`${URL}/home?geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function FetchHomeFeed() {
  const reponse = await axios
    .get(`${URL}/home?geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetActus() {
  const reponse = await axios
    .get(
      `${URL}/channel/home?id=UCYfdidRxbB8Qhf0Nx7ioOYw&geo=FR&lang=fr`,
      options,
    )
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetCategorySport() {
  const reponse = await axios
    .get(
      `${URL}/channel/home?id=UCEgdi0XIXXZ-qJOFPf4JSKw&geo=FR&lang=fr`,
      options,
    )
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetCategoryCulture() {
  const reponse = await axios
    .get(
      `${URL}/channel/home?id=UCtFRv9O2AHqOZjjynzrv-xg&geo=FR&lang=fr`,
      options,
    )
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetCategoryMode() {
  const reponse = await axios
    .get(
      `${URL}/channel/home?id=UCrpQ4p1Ql_hG8rKXIKM1MOQ&geo=FR&lang=fr`,
      options,
    )
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetChannelHomeUser(id) {
  const reponse = await axios
    .get(`${URL}/channel/home?id=${id}&geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetChannelVideos(id) {
  const reponse = await axios
    .get(`${URL}/channel/videos?id=${id}&geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetChannelShorts(id) {
  const reponse = await axios
    .get(`${URL}/channel/shorts?id=${id}`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetChannelLives(id) {
  const reponse = await axios
    .get(`${URL}/channel/liveStreams?id=${id}&geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetChannelPlaylist(id) {
  const reponse = await axios
    .get(`${URL}/channel/playlists?id=${id}&geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetPlaylist(id) {
  const reponse = await axios
    .get(`${URL}/playlist?id=${id}`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetVideos(id) {
  const reponse = await axios
    .get(`${URL}/video/info?id=${id}&extend=1&geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetSubscriptions(id) {
  const reponse = await axios
    .get(`${URL}/channel/channels?id=${id}&geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
async function GetAbout(id) {
  const reponse = await axios
    .get(`${URL}/channel/about?id=${id}&geo=FR&lang=fr`, options)
    .catch((error) => console.log(error.message));
  return reponse;
}
export {
  Recherche,
  fetchTrends,
  FetchMusique,
  FetchHomeShorts,
  FetchHomeFeed,
  GetActus,
  GetCategorySport,
  GetCategoryCulture,
  GetCategoryMode,
  GetChannelHomeUser,
  GetChannelVideos,
  GetChannelShorts,
  GetChannelLives,
  GetChannelPlaylist,
  GetPlaylist,
  GetVideos,
  GetSubscriptions,
  GetAbout,
};

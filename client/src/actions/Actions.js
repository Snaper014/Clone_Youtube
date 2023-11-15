import axios from "axios";
import { URL_BACKEND } from "../config";

export const API = axios.create({
  baseURL: `${URL_BACKEND}`,
  withCredentials: true
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("jwt-auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("jwt-auth"))?.token
    }`;
    Credential = 'include';
  }
  return req;
});

const AddVideosHistory = (id, response) =>
  API.post("/History", { id: id, data: response });
const DeleteById = (id) => API.delete(`/History/${id}`);
const DeleteAllHistory = () => API.delete("all/History");
const DeleteBySelect = (response) => API.delete("/History", { data: response });
const GetHistory = (search) => API.get(`/History${search ? search : ""}`);
const AddSub = (response) => API.post("/Subscriptions", { data: response });
const GetSubs = () => API.get("/Subscriptions");
const CheckSubs = (id) => API.get(`/Subscriptions/check/${id}`);
const DeleteSubs = (id) => API.delete(`/Subscriptions/${id}`);
const GetLikes = () => API.get("/likes");
const GetLibrary = (limit) => API.get(`/library${limit ? limit : ""}`);
const APICreatePlaylist = (response) =>
  API.post("/library", { data: response });
const AddVideosPlaylist = (name, response) =>
  API.post("/library/add", { name, data: response });
const DeleteVideoPlaylist = (response) =>
  API.delete("/library", { data: response });
const DeletePlaylist = (id) => API.delete(`/library/remove/${id}`);
const LikeOrDislike = (type, response) =>
  API.post(`/likes?type=${type}`, { data: response });
const CheckLikeOrDislike = (id) => API.get(`/likes/check/${id}`);
const GetSignUp = (response) => API.post("/sign-up", response);
const GetSignIn = (response) => API.post("/sign-in", response);

export {
  AddVideosHistory,
  AddVideosPlaylist,
  DeletePlaylist,
  DeleteVideoPlaylist,
  GetLibrary,
  APICreatePlaylist,
  GetLikes,
  GetSignUp,
  AddSub,
  GetSubs,
  LikeOrDislike,
  CheckLikeOrDislike,
  CheckSubs,
  DeleteSubs,
  GetSignIn,
  GetHistory,
  DeleteById,
  DeleteBySelect,
  DeleteAllHistory,
};

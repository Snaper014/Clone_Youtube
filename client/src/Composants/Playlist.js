import * as React from "react";
import "../App.css";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { GetPlaylist, GetVideos } from "../utils/Appel";
import ReactPlayer from "react-player";
import { BarSearch, MobileBarSearch } from "./AppBarPrimary";
import { BsFillPlayFill } from "react-icons/bs";
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { useFetchData } from "../utils/Fetch";
import { AddSub, LikeOrDislike, GetLibrary } from "../actions/Actions";
import {
  GetInfosSubs,
  AddInfosLikes,
  CheckRelatedVideos,
} from "../utils/utils";
import { AiOutlineCheck, AiFillLike, AiFillDislike } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ModalSub } from "./Elements/modals/ModalSub";
import { ModalLike } from "./Elements/modals/ModalLike";
import { ModalPlaylist } from "./Elements/modals/ModalPlaylist";
import { useContext } from "../Context/ContextProvider";
import { ConvertlengthSeconds } from "../utils/utils";
import { CheckLikeOrDislike, CheckSubs } from "../actions/Actions";

export function Playlist() {
  let { index, videoPL, Identifiant } = useParams();
  const navigate = useNavigate();
  const { user } = useContext();
  const location = useLocation();

  //console.log("location", location?.search);
  const [DetailVideo, setDetailVideo] = React.useState(null);
  const [VideosPlaylist, setVideosPlaylist] = React.useState(videoPL);
  const [DisplayDescription, setDisplayDescription] = React.useState(false);
  const { execute, data: Playlist, status, error } = useFetchData();
  const [DisplayPlaylist, setDisplayPlaylist] = React.useState(true);
  const [WidthVideos, setWidthVideos] = React.useState();
  const [HeightVideos, setHeightVideos] = React.useState();
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState({
    subscriber: false,
    like: false,
    dislike: false,
  });
  const handleOpen = (open) => {
    setOpen((prev) => {
      return { ...prev, [open]: true };
    });
  };
  const handleClose = () => setOpen(false);
  const [check, setCheck] = React.useState({
    isSubs: false,
    isLike: false,
    isDislike: false,
  });

  const DataMap = location?.search
    ? Playlist?.data?.data.at(0)?.data
    : Playlist?.data?.data;
  const isLibrary = location?.search ? true : false;

  React.useLayoutEffect(() => {
    const hight = window.innerHeight;
    setHeightVideos(hight * 0.5);
    let chargement = setTimeout(() => {
      CheckRelatedVideos(setWidthVideos, ref, setHeightVideos);
    }, 1200);
    return () => clearTimeout(chargement);
  }, []);

  React.useEffect(() => {
    async function fetchSubs() {
      // console.log("Test", DetailVideo);
      const param = location?.search
        ? DetailVideo?.channelId
        : DetailVideo?.data?.channelId;
      return CheckSubs(param)
        .then((response) =>
          setCheck((prev) => {
            return { ...prev, isSubs: response?.data?.data };
          }),
        )
        .catch((error) => console.log(error));
    }
    if (Identifiant) {
      if (location?.search) {
        //playlist de l'utilisateur
        execute(GetLibrary(`?limit=${Identifiant}`));
      } else {
        execute(GetPlaylist(Identifiant));
      }
    }
    if (location?.search) {
      setVideosPlaylist(videoPL);
      GetLibrary(`?limit=${Identifiant}`)
        .then((response) => {
          setDetailVideo(
            response?.data?.data?.at(0)?.data?.at(parseInt(index)),
          );
        })
        .catch((error) => console.log(error));
      // detail de la vidéo en cours de lecture de la pl de l'user
    } else {
      setVideosPlaylist(videoPL);
      GetVideos(VideosPlaylist)
        .then((response) => setDetailVideo(response))
        .catch((error) => console.log(error));
    }

    if (user) {
      CheckLikeOrDislike(videoPL)
        .then((response) => {
          const type = response?.data?.data;
          if (type === "like") {
            setCheck((prev) => {
              return { ...prev, isLike: true, isDislike: false };
            });
          }
          if (type === "dislike") {
            setCheck((prev) => {
              return { ...prev, isLike: false, isDislike: true };
            });
          }
          if (type === "no found") {
            setCheck((prev) => {
              return { ...prev, isLike: false, isDislike: false };
            });
          }
        })
        .catch((error) => console.log(error));
      fetchSubs();
    }
    const CheckResponsive = () => {
      if (window.innerWidth <= 1024) {
        setResponsive(true);
        CheckRelatedVideos(setWidthVideos, ref, setHeightVideos);
      } else {
        setResponsive(false);
      }
    };
    window.addEventListener("resize", CheckResponsive);
    return () => {
      window.removeEventListener("resize", CheckResponsive);
    };
  }, [
    VideosPlaylist,
    videoPL,
    Identifiant,
    user,
    index,
    DetailVideo?.channelId,
    DetailVideo?.data?.channelId,
    execute,
    location,
  ]);

  //console.log("Identifiant", Identifiant);
  //console.log("detail video Hors hook", DetailVideo);
  //console.log("index" , index)
  //console.log("idPl", IDPlaylist)
  //console.log("videoPl", VideosPlaylist)
  //modificer css de la vidéos

  if (status === "fetching") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress style={{ fontSize: "40px" }} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="Principale">
        <p>Une Erreur est survenu {error.message}</p>
      </div>
    );
  }
  const HandleVideos = (id) => {
    navigate(`/watch/${id}`);
  };
  const HandleChannel = (Channelid) => {
    navigate(`/Channel/${Channelid}`);
  };

  return (
    <>
      {responsive ? (
        <>
          <MobileBarSearch />
          <div
            ref={ref}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid transparent",
                width: "100%",
                display: "flex",
                marginBottom: "3%",
                flexDirection: "column",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${VideosPlaylist}`}
                width={"100%"}
                height={`60vh`}
                className="react-player"
                controls
              />
              <div
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  height: `${DisplayPlaylist ? "auto" : "70px"}`,
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                    marginBottom: "1%",
                  }}
                >
                  <div
                    style={{
                      width: "85%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <h3 style={{ marginBottom: "2%" }}>
                      {location?.search
                        ? Playlist?.data?.data[0]?.titlePlaylist?.length >= 45
                          ? Playlist?.data?.data[0]?.titlePlaylist?.substring(
                              0,
                              45,
                            ) + "..."
                          : Playlist?.data?.data[0]?.titlePlaylist
                        : Playlist?.data?.meta?.title?.length >= 45
                        ? Playlist?.data?.meta?.title.substring(0, 45) + "..."
                        : Playlist?.data?.meta?.title}
                    </h3>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                      }}
                    >
                      <p style={{ marginRight: "2%" }}>
                        {parseInt(index) + 1} /{" "}
                        {isLibrary
                          ? Playlist?.data?.data[0]?.data?.length
                          : Playlist?.data?.data?.length}
                      </p>
                      <Link
                        to={`/Channel/${
                          isLibrary
                            ? DetailVideo?.channelId
                            : Playlist?.data?.meta?.channelId
                        }`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <p>
                          {isLibrary
                            ? DetailVideo?.channelTitle?.length >= 45
                              ? DetailVideo?.channelTitle?.substring(0, 45) +
                                "..."
                              : DetailVideo?.channelTitle
                            : Playlist?.data?.meta?.channelTitle?.length >= 45
                            ? Playlist?.data?.meta?.channelTitle.substring(
                                0,
                                45,
                              ) + "..."
                            : Playlist?.data?.meta?.channelTitle}
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div
                    onClick={() => setDisplayPlaylist((prev) => !prev)}
                    style={{
                      width: "15%",
                      height: "50px",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    <IoIosArrowDown color="white" fontSize={28} />
                  </div>
                </div>
                {DisplayPlaylist ? (
                  <>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "black",
                        color: "white",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <button
                        disabled={parseInt(index) === 0 ? true : false}
                        onClick={() =>
                          navigate(
                            `/Playlist/${
                              isLibrary
                                ? Playlist?.data?.data
                                    ?.at(0)
                                    ?.data?.at(parseInt(index) - 1)?.idVideo
                                : Playlist?.data?.data[parseInt(index) - 1]
                                    ?.videoId
                            }/${parseInt(index) - 1}/${Identifiant}${
                              isLibrary ? "?type=library" : ""
                            }`,
                          )
                        }
                        style={{
                          width: "10%",
                          marginRight: "2%",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <IoPlaySkipBackSharp
                          fontSize={22}
                          color={`${
                            parseInt(index) === 0 ? "#cccccc" : "white"
                          }`}
                        />
                      </button>
                      <button
                        disabled={
                          parseInt(index) ===
                          (isLibrary
                            ? Playlist?.data?.data?.at(0)?.data?.length
                            : Playlist?.data?.data.length) -
                            1
                            ? true
                            : false
                        }
                        onClick={() =>
                          navigate(
                            `/Playlist/${
                              isLibrary
                                ? Playlist?.data?.data
                                    ?.at(0)
                                    ?.data?.at(parseInt(index) + 1)?.idVideo
                                : Playlist?.data?.data[parseInt(index) + 1]
                                    ?.videoId
                            }/${parseInt(index) + 1}/${Identifiant}${
                              isLibrary ? "?type=library" : ""
                            }`,
                          )
                        }
                        style={{
                          width: "10%",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <IoPlaySkipForwardSharp
                          fontSize={22}
                          color={`${
                            parseInt(index) ===
                            (isLibrary
                              ? Playlist?.data?.data?.at(0)?.data?.length
                              : Playlist?.data?.data.length) -
                              1
                              ? "#cccccc"
                              : "white"
                          }`}
                        />
                      </button>
                    </div>
                    {DataMap?.map((element, i) => (
                      <div
                        onClick={() =>
                          navigate(
                            `/Playlist/${
                              isLibrary ? element?.idVideo : element?.videoId
                            }/${i}/${Identifiant}${
                              isLibrary ? "?type=library" : ""
                            }`,
                          )
                        }
                        key={i}
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          justifyContent: "space-evenly",
                          marginBottom: "1%",
                          cursor: "pointer",
                          backgroundColor: `${
                            parseInt(index) === i
                              ? "rgba(127,82,97,0.4)"
                              : "black"
                          }`,
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "2%",
                          }}
                        >
                          <div
                            style={{
                              width: `${
                                window.innerWidth <= 686 ? "100%" : "323px"
                              }`,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <img
                              style={{
                                borderRadius: "10px",
                                height: "150px",
                                width: `${
                                  window.innerWidth <= 686 ? "100%" : "323px"
                                }`,
                              }}
                              src={
                                isLibrary
                                  ? element?.thumbnail
                                  : element?.thumbnail?.at(0)?.url
                              }
                              alt={index}
                            ></img>
                            <div
                              style={{
                                position: "absolute",
                                height: "30px",
                                bottom: "0px",
                                right: "0px",
                                color: "white",
                                fontSize: "14px",
                                backgroundColor: "black",
                                borderRadius: "8px",
                                pointerEvents: "none",
                                margin: "0.3rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: "600",
                                  color: "white",
                                  margin: "0.3rem",
                                  fontSize: "1em",
                                }}
                              >
                                {isLibrary
                                  ? ConvertlengthSeconds(element?.lengthSeconds)
                                  : element?.lengthText}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                            width: "50%",
                          }}
                        >
                          <p
                            style={{
                              width: "100%",
                              fontWeight: "600",
                              fontSize: `${
                                window.innerWidth <= 500 ? "0.7em" : "1em"
                              }`,
                            }}
                          >
                            {element?.title?.length > 60
                              ? element?.title.substring(0, 45) + "..."
                              : element?.title}
                          </p>
                          <p
                            style={{
                              width: "100%",
                              fontSize: `${
                                window.innerWidth <= 500 ? "0.7em" : "1em"
                              }`,
                              cursor: "pointer",
                            }}
                          >
                            {element?.channelTitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>

              <h1
                style={{
                  fontWeight: "bolder",
                  marginTop: "1%",
                  fontSize: "20px",
                  width: "100%",
                  marginBottom: "1%",
                }}
              >
                {isLibrary ? DetailVideo?.title : DetailVideo?.data?.title}
              </h1>
              <p style={{ width: "100%", marginBottom: "3%" }}>
                {isLibrary
                  ? DetailVideo?.viewCount
                  : DetailVideo?.data?.viewCount}{" "}
                vues -{" "}
                {new Date(
                  isLibrary
                    ? DetailVideo?.publishDate
                    : DetailVideo?.data?.publishDate,
                )
                  .toLocaleString("fr-FR", { timeZone: "UTC" })
                  .substring(0, 11)}
              </p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  margin: "15px 0px",
                  alignItems: "flex-start",
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={() =>
                    HandleChannel(
                      isLibrary
                        ? DetailVideo?.Channelid
                        : DetailVideo?.data?.channelId,
                    )
                  }
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                  }}
                >
                  {(isLibrary
                    ? DetailVideo?.channelThumbnail
                    : DetailVideo?.data?.channelThumbnail) === null ? (
                    <div
                      alt="ChannelImage"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "1%",
                        marginBottom: "2%",
                        backgroundColor: "gray",
                      }}
                    ></div>
                  ) : (
                    <img
                      alt="ChannelImage"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "1%",
                        marginBottom: "2%",
                      }}
                      src={
                        isLibrary
                          ? DetailVideo?.channelThumbnail
                          : DetailVideo?.data?.channelThumbnail?.at(0)?.url
                      }
                    ></img>
                  )}
                  <h5
                    style={{
                      fontSize: "18px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "3px",
                      marginRight: "5px",
                    }}
                  >
                    {(isLibrary
                      ? DetailVideo?.verified
                      : DetailVideo?.data?.channelBadges) === null ? (
                      <p>
                        {isLibrary
                          ? DetailVideo?.channelTitle
                          : DetailVideo?.data?.channelTitle}
                      </p>
                    ) : (
                      <>
                        {isLibrary
                          ? DetailVideo?.channelTitle
                          : DetailVideo?.data?.channelTitle}{" "}
                        <span>
                          <VscVerifiedFilled />
                        </span>
                      </>
                    )}
                  </h5>
                  <p style={{ fontSize: "14px" }}>
                    {DetailVideo
                      ? DetailVideo?.subscriberCountText
                      : DetailVideo?.data?.subscriberCountText}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (user) {
                      AddSub(GetInfosSubs(DetailVideo, isLibrary))
                        .then((response) => {
                          //setIsSubs(response?.data?.data)
                          setCheck((prev) => {
                            return { ...prev, isSubs: response?.data?.data };
                          });
                        })
                        .catch((error) => console.log(error));
                    } else {
                      handleOpen("subscriber");
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    border: `${
                      !user
                        ? "1px solid black"
                        : check.isSubs
                        ? "none"
                        : "1px solid black"
                    }`,
                    justifyContent: `${
                      !user
                        ? "center"
                        : check.isSubs
                        ? "space-evenly"
                        : "center"
                    }`,
                    backgroundColor: `${
                      !user ? "black" : check.isSubs ? "#efeff1" : "black"
                    }`,
                    color: `${
                      !user ? "white" : check.isSubs ? "black" : "white"
                    }`,
                    fontSize: "18px",
                    height: "50px",
                    width: "128px",
                    fontWeight: "550",
                    textAlign: "center",
                    borderRadius: "30px",
                  }}
                >
                  {!user ? (
                    "S'abonner"
                  ) : check.isSubs ? (
                    <>
                      abonné <AiOutlineCheck color="black" />
                    </>
                  ) : (
                    "S'abonner"
                  )}
                </button>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <AiFillLike
                  onClick={() => {
                    if (user) {
                      LikeOrDislike(
                        "like",
                        AddInfosLikes(DetailVideo, videoPL, "like", isLibrary),
                      )
                        .then((response) => {
                          setCheck((prev) => {
                            return {
                              ...prev,
                              isLike: response?.data?.data,
                              isDislike: false,
                            };
                          });
                        })
                        .catch((error) => console.log(error));
                    } else {
                      handleOpen("like");
                    }
                  }}
                  fontSize={30}
                  color={`${!user ? "black" : check.isLike ? "blue" : "black"}`}
                  style={{ cursor: "pointer" }}
                />
                <AiFillDislike
                  onClick={() => {
                    if (user) {
                      LikeOrDislike(
                        "dislike",
                        AddInfosLikes(
                          DetailVideo,
                          videoPL,
                          "dislike",
                          isLibrary,
                        ),
                      )
                        .then((response) => {
                          setCheck((prev) => {
                            return {
                              ...prev,
                              isDislike: response?.data?.data,
                              isLike: false,
                            };
                          });
                        })
                        .catch((error) => console.log(error));
                    } else {
                      handleOpen("dislike");
                    }
                  }}
                  fontSize={30}
                  color={`${
                    !user ? "black" : check.isDislike ? "red" : "black"
                  }`}
                  style={{ cursor: "pointer" }}
                />
                <ModalPlaylist
                  isLibrary={isLibrary}
                  user={user}
                  id={videoPL}
                  DetailVideo={DetailVideo}
                  responsive={window.innerWidth}
                />
                <ModalSub
                  open={open.subscriber}
                  handleClose={handleClose}
                  responsive={window.innerWidth}
                />
                <ModalLike
                  open={open.like}
                  handleClose={handleClose}
                  responsive={window.innerWidth}
                  type="like"
                />
                <ModalLike
                  open={open.dislike}
                  handleClose={handleClose}
                  responsive={window.innerWidth}
                  type="dislike"
                />
              </div>
            </div>

            {isLibrary ? null : (
              <div
                style={{
                  width: "100%",
                  borderTop: "2px solid #efefef",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: `${
                    window.innerWidth <= 580 ? "flex-start" : "space-around"
                  }`,
                  flexDirection: `${
                    window.innerWidth <= 580 ? "column" : "row"
                  }`,
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    marginBottom: "2%",
                    fontWeight: "400",
                    width: "100%",
                  }}
                >
                  {" "}
                  A Suivre
                </h2>
                {DetailVideo?.data?.relatedVideos?.data?.map(
                  (element, index) => {
                    if (element?.type === "playlist") {
                      return (
                        <div
                          key={index}
                          style={{
                            width: `${WidthVideos}px`,
                            border: "1px solid transparent",
                            display: "flex",
                            flexDirection: `column`,
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexWrap: "wrap",
                            marginBottom: "2%",
                          }}
                        >
                          <Link
                            to={`/Playlist/${element?.videoId}/${0}/${
                              element?.playlistId
                            }`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                alt={element?.title}
                                src={element?.thumbnail[1]?.url}
                                width="100%"
                                style={{
                                  borderRadius: "10px",
                                  height: `${
                                    window.innerWidth <= 580
                                      ? HeightVideos * 1.1
                                      : HeightVideos / 2.2
                                  }px`,
                                }}
                              ></img>
                              <div
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "20%",
                                  bottom: "0",
                                  color: "white",
                                  fontSize: "14px",
                                  background: "rgba(0, 0, 0, 0.5)",
                                  borderRadius: "8px",
                                  pointerEvents: "none",
                                  marginBottom: "0.3rem",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <MdOutlinePlaylistPlay
                                  color="white"
                                  fontSize={20}
                                  style={{ marginLeft: "2%" }}
                                />
                                <p
                                  style={{
                                    marginRight: "2%",
                                    fontWeight: "550",
                                  }}
                                >
                                  {element?.videoCount} vidéos
                                </p>
                              </div>
                            </div>
                          </Link>
                          <Link
                            to={`/Playlist/${element?.videoId}/${0}/${
                              element?.playlistId
                            }`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "0.6em",
                                    marginBottom: "1%",
                                  }}
                                >
                                  {window.innerWidth <= 300
                                    ? element?.title.substring(0, 25) + "..."
                                    : element?.title}
                                </p>
                                <p style={{ fontSize: "0.6em" }}>
                                  {element?.channelTitle}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    }
                    if (element?.type === "video") {
                      return (
                        <div
                          key={index}
                          style={{
                            width: `${WidthVideos}px`,
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-end",
                              cursor: "pointer",
                            }}
                            onClick={() => HandleVideos(element?.videoId)}
                          >
                            <img
                              style={{
                                height: `${
                                  window.innerWidth <= 580
                                    ? HeightVideos * 1.1
                                    : HeightVideos / 2.2
                                }px`,
                                width: "100%",
                                borderRadius: "10px",
                              }}
                              src={element?.thumbnail[0]?.url}
                              alt={index}
                            ></img>
                            <div
                              className={`${
                                element?.lengthText === "EN DIRECT"
                                  ? "IndicatorLive"
                                  : "IndicatorView"
                              }`}
                            >
                              <p style={{ margin: "0.3em", fontWeight: "600" }}>
                                {element?.lengthText}
                              </p>
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                              flexDirection: "row",
                              margin: "2% 0px 2% 0px",
                            }}
                          >
                            <div
                              style={{
                                width: "20%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                alt={element?.lengthText}
                                style={{
                                  width: `${
                                    window.innerWidth > 580 ? "35px" : "50px"
                                  }`,
                                  height: `${
                                    window.innerWidth > 580 ? "35px" : "50px"
                                  }`,
                                  borderRadius: "50%",
                                  marginRight: "1%",
                                }}
                                src={element.channelThumbnail[0]?.url}
                              ></img>
                            </div>
                            <div
                              style={{
                                width: "80%",
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                              }}
                            >
                              <h3
                                style={{
                                  width: "100%",
                                  marginBottom: "3%",
                                  fontWeight: "400",
                                  fontSize: `${
                                    window.innerWidth > 580 ? "0.8em" : "1em"
                                  }`,
                                }}
                              >
                                {element?.title.length >= 50
                                  ? element?.title?.substring(0, 50) + "..."
                                  : element?.title}
                              </h3>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "center",
                                  flexDirection: "row",
                                  flexWrap: "nowrap",
                                  fontSize: `${
                                    window.innerWidth > 580 ? "0.7em" : "1em"
                                  }`,
                                }}
                              >
                                <p>{element?.channelTitle}</p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignSelf: "center",
                                    width: "3px",
                                    height: "3px",
                                    backgroundColor: "black",
                                    borderRadius: "50%",
                                    margin: "6px",
                                  }}
                                ></div>
                                <p>{element?.viewCount} vues</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  },
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <BarSearch />
          <div
            ref={ref}
            style={{
              border: "2px solid transparent",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "row",
              flexWrap: "nowrap",
              width: "90%",
              left: "16vh",
              position: "relative",
              top: "11vh",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid transparent",
                width: "60%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${VideosPlaylist}`}
                width={"100%"}
                height={"450px"}
                className="react-player"
                controls
              />
              <h2
                style={{
                  fontWeight: "bolder",
                  marginTop: "1%",
                  fontSize: "1.1em",
                  width: "100%",
                  marginBottom: "2%",
                }}
              >
                {location?.search
                  ? DetailVideo?.title
                  : DetailVideo?.data?.title}
              </h2>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                  flexWrap: "nowrap",
                }}
              >
                <div
                  style={{
                    width: "33%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    onClick={() =>
                      HandleChannel(
                        location?.search
                          ? DetailVideo?.channelId
                          : DetailVideo?.data?.channelId,
                      )
                    }
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      alignItems: "flex-start",
                      cursor: "pointer",
                      gap: "3px",
                    }}
                  >
                    {(location?.search
                      ? DetailVideo?.channelThumbnail
                      : DetailVideo?.data?.channelThumbnail) === null ? (
                      <div
                        alt="ChannelImage"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "1%",
                          backgroundColor: "gray",
                        }}
                      ></div>
                    ) : (
                      <img
                        alt="ChannelImage"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "1%",
                        }}
                        src={
                          location?.search
                            ? DetailVideo?.channelThumbnail
                            : DetailVideo?.data?.channelThumbnail[0]?.url
                        }
                      ></img>
                    )}

                    <div style={{ marginLeft: "2%", marginRight: "5%" }}>
                      <h5 style={{ fontSize: "18px" }}>
                        {(location?.search
                          ? DetailVideo?.verified
                          : DetailVideo?.data?.channelBadges) === null ? (
                          <>
                            {location?.search
                              ? DetailVideo?.channelTitle
                              : DetailVideo?.data?.channelTitle}
                          </>
                        ) : (
                          <>
                            {location?.search
                              ? DetailVideo?.channelTitle
                              : DetailVideo?.data?.channelTitle}{" "}
                            <span>
                              <VscVerifiedFilled />
                            </span>
                          </>
                        )}
                      </h5>
                      <p style={{ fontSize: "14px" }}>
                        {location?.search
                          ? DetailVideo?.subscriberCountText
                          : DetailVideo?.data?.subscriberCountText}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "33%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      if (user) {
                        const isLibrary = location?.search ? true : false;
                        AddSub(GetInfosSubs(DetailVideo, isLibrary))
                          .then((response) => {
                            //setIsSubs(response?.data?.data)
                            setCheck((prev) => {
                              return { ...prev, isSubs: response?.data?.data };
                            });
                          })
                          .catch((error) => console.log(error));
                      } else {
                        handleOpen("subscriber");
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      border: `${
                        !user
                          ? "1px solid black"
                          : check.isSubs
                          ? "none"
                          : "1px solid black"
                      }`,
                      justifyContent: `${
                        !user
                          ? "center"
                          : check.isSubs
                          ? "space-evenly"
                          : "center"
                      }`,
                      backgroundColor: `${
                        !user ? "black" : check.isSubs ? "#efeff1" : "black"
                      }`,
                      color: `${
                        !user ? "white" : check.isSubs ? "black" : "white"
                      }`,
                      fontSize: "18px",
                      height: "50px",
                      width: "128px",
                      fontWeight: "550",
                      textAlign: "center",
                      borderRadius: "30px",
                    }}
                  >
                    {!user ? (
                      "S'abonner"
                    ) : check.isSubs ? (
                      <>
                        abonné <AiOutlineCheck color="black" />
                      </>
                    ) : (
                      "S'abonner"
                    )}
                  </button>
                </div>

                <div
                  style={{
                    width: "33%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <AiFillLike
                    onClick={() => {
                      if (user) {
                        const isLibrary = location?.search ? true : false;
                        LikeOrDislike(
                          "like",
                          AddInfosLikes(
                            DetailVideo,
                            videoPL,
                            "like",
                            isLibrary,
                          ),
                        )
                          .then((response) => {
                            setCheck((prev) => {
                              return {
                                ...prev,
                                isLike: response?.data?.data,
                                isDislike: false,
                              };
                            });
                          })
                          .catch((error) => console.log(error));
                      } else {
                        handleOpen("like");
                      }
                    }}
                    fontSize={30}
                    color={`${
                      !user ? "black" : check.isLike ? "blue" : "black"
                    }`}
                    style={{ cursor: "pointer" }}
                  />
                  <AiFillDislike
                    onClick={() => {
                      if (user) {
                        const isLibrary = location?.search ? true : false;
                        LikeOrDislike(
                          "dislike",
                          AddInfosLikes(DetailVideo, videoPL, "dislike"),
                          isLibrary,
                        )
                          .then((response) => {
                            setCheck((prev) => {
                              return {
                                ...prev,
                                isDislike: response?.data?.data,
                                isLike: false,
                              };
                            });
                          })
                          .catch((error) => console.log(error));
                      } else {
                        handleOpen("dislike");
                      }
                    }}
                    fontSize={30}
                    color={`${
                      !user ? "black" : check.isDislike ? "red" : "black"
                    }`}
                    style={{ cursor: "pointer" }}
                  />
                  <ModalPlaylist
                    isLibrary={isLibrary}
                    user={user}
                    id={videoPL}
                    dataYTB={DetailVideo}
                  />
                  <ModalSub open={open.subscriber} handleClose={handleClose} />
                  <ModalLike
                    open={open.like}
                    handleClose={handleClose}
                    type="like"
                  />
                  <ModalLike
                    open={open.dislike}
                    handleClose={handleClose}
                    type="dislike"
                  />
                </div>
              </div>
              <div
                onClick={() => setDisplayDescription(!DisplayDescription)}
                style={{
                  backgroundColor: "#efeff1",
                  width: "95%",
                  margin: "2vh 1vw 2vh 1vw",
                  padding: "1%",
                  borderRadius: "7px",
                  height: `${DisplayDescription ? "auto" : "220px"}`,
                  cursor: `${DisplayDescription ? "auto" : "pointer"}`,
                }}
              >
                <h3 style={{ width: "100%", marginBottom: "7px" }}>
                  {location?.search
                    ? DetailVideo?.viewCount
                    : DetailVideo?.data?.viewCount}{" "}
                  vues -{" "}
                  {new Date(
                    location?.search
                      ? DetailVideo?.publishDate
                      : DetailVideo?.data?.publishDate,
                  )
                    .toLocaleString("fr-FR", { timeZone: "UTC" })
                    .substring(0, 11)}
                </h3>
                <div style={{ fontSize: "20px" }}>
                  {DisplayDescription ? (
                    <>
                      <p>
                        {location?.search
                          ? DetailVideo?.description
                          : DetailVideo?.data?.description}
                      </p>
                      <button
                        style={{
                          marginTop: "2%",
                          marginLeft: "2%",
                          border: "none",
                          backgroundColor: "#efeff1",
                          fontWeight: "550",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setDisplayDescription(!DisplayDescription)
                        }
                      >
                        Moins
                      </button>
                    </>
                  ) : (
                    <>
                      <p
                        style={{
                          width: "100%",
                          height: "140px",
                          overflow: "hidden",
                        }}
                      >
                        {location?.search
                          ? DetailVideo?.description?.substring(0, 312) + "..."
                          : DetailVideo?.data?.description?.substring(0, 312) +
                            "..."}
                      </p>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MdKeyboardArrowDown fontSize={30} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                border: "1px solid white",
                width: "40%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  width: "90%",
                  margin: "2%",
                  height: "460px",
                  overflowY: "scroll",
                  border: "1px solid black",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3>
                    {location?.search
                      ? Playlist?.data?.data[0]?.titlePlaylist?.length >= 45
                        ? Playlist?.data?.data[0]?.titlePlaylist?.substring(
                            0,
                            45,
                          ) + "..."
                        : Playlist?.data?.data[0]?.titlePlaylist
                      : Playlist?.data?.meta?.title?.length >= 45
                      ? Playlist?.data?.meta?.title.substring(0, 45) + "..."
                      : Playlist?.data?.meta?.title}
                  </h3>
                  <p>
                    {location?.search
                      ? DetailVideo?.channelTitle
                      : DetailVideo?.data?.channelTitle}{" "}
                    - {parseInt(index) + 1} /{" "}
                    {location?.search
                      ? Playlist?.data?.data[0]?.data?.length
                      : Playlist?.data?.data?.length}
                  </p>
                </div>
                {DataMap?.map((element, i) => (
                  <Link
                    to={`/Playlist/${
                      location?.search ? element?.idVideo : element?.videoId
                    }/${i}/${Identifiant}${
                      location?.search ? "?type=library" : ""
                    }`}
                    key={i}
                    style={{
                      width: "100%",
                      display: "flex",
                      textDecoration: "none",
                      color: "black",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      margin: "2vh 0vh 2vh 0vh",
                      justifyContent: "space-evenly",
                      cursor: "pointer",
                      backgroundColor: `${
                        parseInt(index) === i ? "rgba(127,82,97,0.4)" : "white"
                      }`,
                    }}
                  >
                    {parseInt(index) === i ? (
                      <BsFillPlayFill
                        style={{
                          display: "flex",
                          alignSelf: "center",
                          fontSize: "18px",
                        }}
                      />
                    ) : (
                      <p
                        style={{
                          display: "flex",
                          alignSelf: "center",
                          fontSize: "18px",
                        }}
                      >
                        {i + 1}
                      </p>
                    )}
                    <div
                      style={{
                        width: "35%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        position: "relative",
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "10px",
                          height: "15vh",
                          width: "100%",
                        }}
                        src={
                          location?.search
                            ? element?.thumbnail
                            : element?.thumbnail[0]?.url
                        }
                        alt={index}
                      ></img>
                      <div
                        style={{
                          position: "absolute",
                          width: "35px",
                          height: "30px",
                          bottom: "0px",
                          right: "0px",
                          color: "white",
                          fontSize: "14px",
                          backgroundColor: "black",
                          borderRadius: "8px",
                          pointerEvents: "none",
                          margin: "0.3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: "600",
                            color: "white",
                            margin: "0.3rem",
                            fontSize: "1em",
                          }}
                        >
                          {location?.search
                            ? ConvertlengthSeconds(element?.lengthSeconds)
                            : element?.lengthText}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        width: "50%",
                      }}
                    >
                      <p
                        style={{
                          width: "100%",
                          fontWeight: "600",
                          fontSize: "1.1em",
                        }}
                      >
                        {element?.title.length > 45
                          ? element?.title.substring(0, 45) + "..."
                          : element?.title}
                      </p>
                      <p
                        style={{
                          width: "100%",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                      >
                        {element?.channelTitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {location?.search ? null : DetailVideo?.data?.relatedVideos
                  ?.data === null ? (
                <div></div>
              ) : (
                DetailVideo?.data?.relatedVideos?.data?.map(
                  (element, index) => (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        margin: "2vh 0vh 2vh 0vh",
                      }}
                      key={index}
                    >
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-end",
                          cursor: "pointer",
                        }}
                        onClick={() => HandleVideos(element?.videoId)}
                      >
                        <img
                          style={{
                            borderRadius: "10px",
                            height: "18vh",
                            width: "80%",
                          }}
                          src={element?.thumbnail[0]?.url}
                          alt={index}
                        ></img>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexWrap: "wrap",
                          width: "50%",
                        }}
                      >
                        <h3
                          style={{
                            width: "100%",
                            fontSize: "1.1em",
                          }}
                        >
                          {element?.title.length > 45
                            ? element?.title.substring(0, 45) + "..."
                            : element?.title}
                        </h3>
                        <p
                          style={{
                            width: "100%",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={() => HandleChannel(element?.channelId)}
                        >
                          {element?.channelTitle}
                        </p>
                        <div className="SuggesVdeo">
                          <p style={{ marginRight: "5px" }}>
                            {element?.viewCount} vues
                          </p>
                          <div
                            style={{
                              width: "2px",
                              height: "2px",
                              borderRadius: "50%",
                              backgroundColor: "black",
                              MarginLeft: "5px",
                              marginRight: "5px",
                            }}
                          ></div>
                          <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                            Il y a {element?.publishedTimeText}
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

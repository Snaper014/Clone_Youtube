import * as React from "react";
import "../App.css";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetPlaylist, GetVideos } from "../utils/Appel";
import ReactPlayer from "react-player";
import { BarSearch, MobileBarSearch } from "./AppBarPrimary";
import { useFetchData } from "../utils/Fetch";
import { CheckRelatedVideos } from "../utils/utils";
import { BsFillPlayFill } from "react-icons/bs";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlinePlaylistPlay } from "react-icons/md";

export function Playlist() {
  let { index, videoPL, Identifiant } = useParams();
  const navigate = useNavigate();
  const [DetailVideo, setDetailVideo] = React.useState();
  const [ViedosPlaylist, setViedosPlaylist] = React.useState(videoPL);
  const [DisplayDescription, setDisplayDescription] = React.useState(false);
  const [DisplayPlaylist, setDisplayPlaylist] = React.useState(true);
  const { execute, data: Playlist, error, status } = useFetchData();
  const [WidthVideos, setWidthVideos] = React.useState();
  const [HeightVideos, setHeightVideos] = React.useState();
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const hight = window.innerHeight;
    setHeightVideos(hight * 0.5);
    let chargement = setTimeout(() => {
      CheckRelatedVideos(setWidthVideos, ref, setHeightVideos);
    }, 1200);
    return () => clearTimeout(chargement);
  }, []);

  React.useEffect(() => {
    if (Identifiant) {
      execute(GetPlaylist(Identifiant));
    }
    setViedosPlaylist(videoPL);
    GetVideos(ViedosPlaylist)
      .then((response) => setDetailVideo(response))
      .catch((error) => console.log(error));

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
  }, [ViedosPlaylist, videoPL, execute, Identifiant]);

  const HoverEnter = () => {
    if (DisplayDescription === false) {
      let element = document.getElementById("HandleHoverD");
      element.style.backgroundColor = "#dfdfdf";
    }
    if (DisplayDescription === true) {
      let element = document.getElementById("HandleHoverD");
      element.style.backgroundColor = "#efeff1";
    }
  };
  const HoverLeave = () => {
    let element = document.getElementById("HandleHoverD");
    element.style.backgroundColor = "#efeff1";
  };

  // console.log("playlist", Playlist);
  // console.log("data detail video", DetailVideo);
  //console.log("index" , index)
  //console.log("idPl", IDPlaylist)
  //console.log("videoPl", ViedosPlaylist)
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
  if (status === "fail") {
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
  const HandlePlaylist = (videoid, index = 0, playlist) => {
    navigate(`/Playlist/${videoid}/${index}/${playlist}`);
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
                url={`https://www.youtube.com/watch?v=${ViedosPlaylist}`}
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
                    <h3 style={{marginBottom: "2%"}}>
                      {Playlist?.data?.meta?.title?.length >= 45
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
                        {parseInt(index) + 1} / {Playlist?.data?.data?.length}
                      </p>
                      <Link
                        to={`/Channel/${Playlist?.data?.meta?.channelId}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <p>
                          {Playlist?.data?.meta?.channelTitle?.length >= 45
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
                    onClick={() => setDisplayPlaylist(!DisplayPlaylist)}
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
                          HandlePlaylist(
                            Playlist?.data?.data[parseInt(index) - 1]?.videoId,
                            parseInt(index) - 1,
                            Identifiant,
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
                          parseInt(index) === Playlist?.data?.data.length - 1
                            ? true
                            : false
                        }
                        onClick={() =>
                          HandlePlaylist(
                            Playlist?.data?.data[parseInt(index) + 1]?.videoId,
                            parseInt(index) + 1,
                            Identifiant,
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
                            parseInt(index) === Playlist?.data?.data.length - 1
                              ? "#cccccc"
                              : "white"
                          }`}
                        />
                      </button>
                    </div>
                    {Playlist?.data?.data?.map((element, i) => (
                      <div
                        onClick={() =>
                          HandlePlaylist(element?.videoId, i, Identifiant)
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
                              src={element?.thumbnail[0]?.url}
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
                                {element?.lengthText}
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
                            {element?.title.length > 60
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
                {DetailVideo?.data?.title}
              </h1>
              <p style={{ width: "100%", marginBottom: "3%" }}>
                {DetailVideo?.data?.viewCount} vues -{" "}
                {DetailVideo?.data?.publishDate}
              </p>
              <div
                onClick={() => HandleChannel(DetailVideo?.data?.channelId)}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                    marginBottom: "3%",
                  }}
                >
                  <img
                    alt="ChannelImage"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1%",
                      marginBottom: "2%",
                    }}
                    src={DetailVideo?.data?.channelThumbnail[0]?.url}
                  ></img>

                  <div style={{ marginLeft: "10%" }}>
                    <h5 style={{ fontSize: "18px" }}>
                      {DetailVideo?.data?.channelBadges === null ? (
                        <>{DetailVideo?.data?.channelTitle}</>
                      ) : (
                        <>
                          {DetailVideo?.data?.channelTitle}{" "}
                          <span>
                            <VscVerifiedFilled />
                          </span>
                        </>
                      )}
                    </h5>
                    <p style={{ fontSize: "14px" }}>
                      {DetailVideo?.data?.subscriberCountText}
                    </p>
                  </div>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black",
                    marginRight: "5%",
                    color: "white",
                    fontSize: "18px",
                    height: "50px",
                    width: "128px",
                    fontWeight: "550",
                    textAlign: "center",
                    borderRadius: "30px",
                  }}
                >
                  S'abonner
                </button>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                borderTop: "2px solid #efefef",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: `${
                  window.innerWidth <= 580 ? "flex-start" : "space-around"
                }`,
                flexDirection: `${window.innerWidth <= 580 ? "column" : "row"}`,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{ marginBottom: "2%", fontWeight: "400", width: "100%" }}
              >
                {" "}
                A Suivre
              </h2>
              {DetailVideo?.data?.relatedVideos?.data?.map((element, index) => {
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
                          style={{ position: "relative", cursor: "pointer" }}
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
                            <p style={{ marginRight: "2%", fontWeight: "550" }}>
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
                              style={{ fontSize: "0.6em", marginBottom: "1%" }}
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
              })}
            </div>
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
                url={`https://www.youtube.com/watch?v=${ViedosPlaylist}`}
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
                {DetailVideo?.data?.title}
              </h2>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                }}
              >
                <div
                  onClick={() => HandleChannel(DetailVideo?.data?.channelId)}
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt="kiche"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1%",
                    }}
                    src={DetailVideo?.data?.channelThumbnail[0]?.url}
                  ></img>

                  <div style={{ marginLeft: "2%", marginRight: "5%" }}>
                    <h5 style={{ fontSize: "18px" }}>
                      {DetailVideo?.data?.channelBadges === null ? (
                        <>{DetailVideo?.data?.channelTitle}</>
                      ) : (
                        <>
                          {DetailVideo?.data?.channelTitle}{" "}
                          <span>
                            <VscVerifiedFilled />
                          </span>
                        </>
                      )}
                    </h5>
                    <p style={{ fontSize: "14px" }}>
                      {DetailVideo?.data?.subscriberCountText}
                    </p>
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "black",
                      color: "white",
                      fontSize: "18px",
                      height: "100%",
                      width: "30%",
                      fontWeight: "550",
                      textAlign: "center",
                      borderRadius: "30px",
                    }}
                  >
                    S'abonner
                  </button>
                </div>
              </div>
              <div
                id="HandleHoverD"
                onClick={() => setDisplayDescription(!DisplayDescription)}
                onMouseEnter={() => HoverEnter()}
                onMouseLeave={() => HoverLeave()}
                style={{
                  backgroundColor: "#efeff1",
                  width: "95%",
                  margin: "2vh 1vw 2vh 1vw",
                  padding: "1%",
                  borderRadius: "7px",
                  height: `${DisplayDescription ? "auto" : "20vh"}`,
                  overflow: "hidden",
                  cursor: `${DisplayDescription ? "auto" : "pointer"}`,
                }}
              >
                <h3 style={{ width: "100%" }}>
                  {DetailVideo?.data?.viewCount} vues -{" "}
                  {DetailVideo?.data?.publishDate}
                </h3>
                <div style={{ fontSize: "20px" }}>
                  {DisplayDescription ? (
                    <>
                      <p>{DetailVideo?.data?.description}</p>
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
                    <p>
                      {DetailVideo?.data?.description.substring(0, 312)}{" "}
                      <span
                        style={{
                          marginLeft: "2%",
                          fontWeight: "550",
                          fontSize: "18px",
                        }}
                      >
                        Plus
                      </span>
                    </p>
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
                    {Playlist?.data?.meta?.title?.length >= 45
                      ? Playlist?.data?.meta?.title.substring(0, 45) + "..."
                      : Playlist?.data?.meta?.title}
                  </h3>
                  <p>
                    {DetailVideo?.data?.channelTitle} - {parseInt(index) + 1} /{" "}
                    {Playlist?.data?.data?.length}
                  </p>
                </div>
                {Playlist?.data?.data?.map((element, i) => (
                  <div
                    onClick={() =>
                      HandlePlaylist(element?.videoId, i, Identifiant)
                    }
                    key={i}
                    style={{
                      width: "100%",
                      display: "flex",
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
                        src={element?.thumbnail[0]?.url}
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
                          {element?.lengthText}
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
                  </div>
                ))}
              </div>
            {DetailVideo?.data?.relatedVideos?.data === null ? <div></div> : 
              DetailVideo?.data?.relatedVideos?.data?.map((element, index) => (
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
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

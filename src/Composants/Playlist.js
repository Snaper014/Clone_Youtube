import * as React from "react";
import "../App.css";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetPlaylist, GetVideos } from "../utils/Appel";
import ReactPlayer from "react-player";
import BarSearch from "./AppBarPrimary";
import { useFetchData } from "../utils/Fetch";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./FallbackError";
import { BsFillPlayFill } from "react-icons/bs";
import { VscVerifiedFilled } from "react-icons/vsc";

export function Playlist() {
  let { index, videoPL, Identifiant } = useParams();
  const [DetailVideo, setDetailVideo] = React.useState();
  const [ViedosPlaylist, setViedosPlaylist] = React.useState(videoPL);
  const [DisplayDescription, setDisplayDescription] = React.useState(false);
  const navigate = useNavigate();

  const { execute, data: Playlist, error, status } = useFetchData();
  React.useEffect(() => {
    if (Identifiant) {
      execute(GetPlaylist(Identifiant));
    }
    setViedosPlaylist(videoPL);
    GetVideos(ViedosPlaylist)
      .then((response) => setDetailVideo(response))
      .catch((error) => console.log(error));
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

  //console.log("playlist", Playlist)
  console.log("data detail video", DetailVideo);
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
        {
          <div
            className="GridVideoyoutube"
            style={{
              border: "2px solid red",
              display: "grid",
              width: "90%",
              left: "16vh",
              position: "relative",
              top: "11vh",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid pink",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${ViedosPlaylist}`}
                width={"100%"}
                height={"500px"}
                className="react-player"
                controls
              />
              <h1
                style={{
                  fontWeight: "bolder",
                  marginTop: "1%",
                  fontSize: "20px",
                  width: "100%",
                  marginBottom: "2%",
                }}
              >
                {DetailVideo?.data?.title}
              </h1>
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
                width: "100%",
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
                      onClick={() => HandleVideos(element?.videoId)}
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
                          fontSize: "20px",
                        }}
                      >
                        {element?.title.length > 60
                          ? element?.title.substring(0, 45) + "..."
                          : element?.title}
                      </p>
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
                    </div>
                  </div>
                ))}
              </div>
              {DetailVideo?.data?.relatedVideos?.data?.map((element, index) => (
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
                    <p
                      style={{
                        width: "100%",
                        fontWeight: "600",
                        fontSize: "20px",
                      }}
                    >
                      {element?.title.length > 60
                        ? element?.title.substring(0, 45) + "..."
                        : element?.title}
                    </p>
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
        }
      </ErrorBoundary>
    </>
  );
}

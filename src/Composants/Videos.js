import * as React from "react";
import ReactPlayer from "react-player/lazy";
import { CircularProgress } from "@mui/material";
import "../App.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetVideos } from "../utils/Appel";
import { useQuery } from "@tanstack/react-query";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BarSearch, MobileBarSearch } from "./AppBarPrimary";
import { CheckRelatedVideos } from "../utils/utils";

function Videos() {
  const navigate = useNavigate();
  let { id } = useParams();
  const {
    data: dataYTB,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Videos`, id],
    queryFn: () => GetVideos(id),
  });
  const [DisplayDescription, setDisplayDescription] = React.useState(false);
  const [WidthVideos, setWidthVideos] = React.useState();
  const [HeightVideos, setHeightVideos] = React.useState();
  const ref = React.useRef(null);
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );

  React.useLayoutEffect(() => {
    const hight = window.innerHeight;
    setHeightVideos(hight * 0.5);
    let chargement = setTimeout(() => {
      CheckRelatedVideos(setWidthVideos, ref, setHeightVideos);
      console.log("ref UseLayouteffect", ref);
    }, 1200);
    return () => clearTimeout(chargement);
  }, []);

  React.useEffect(() => {
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
  }, []);

  console.log("Data", dataYTB);
  if (isLoading) {
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
  if (isError) {
    return (
      <div style={{ margin: "0 auto", width: "15%" }}>
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
  const HoverEnter = () => {
    if (DisplayDescription === false) {
      let element = document.getElementById("HandleHoverD");
      element.style.backgroundColor = "#dfdfdf";
    } else {
      let element = document.getElementById("HandleHoverD");
      element.style.backgroundColor = "#efeff1";
    }
  };
  const HoverLeave = () => {
    let element = document.getElementById("HandleHoverD");
    element.style.backgroundColor = "#efeff1";
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
                border: "1px solid pink",
                width: "100%",
                display: "flex",
                marginBottom: "3%",
                flexDirection: "column",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                width={"100%"}
                height={`60vh`}
                className="react-player"
                controls
              />
              <h1
                style={{
                  fontWeight: "bolder",
                  marginTop: "1%",
                  fontSize: "20px",
                  width: "100%",
                  marginBottom: "1%",
                }}
              >
                {dataYTB?.data?.title}
              </h1>
              <p style={{ width: "100%", marginBottom: "3%" }}>
                {dataYTB?.data?.viewCount} vues - {dataYTB?.data?.publishDate}
              </p>
              <div
                onClick={() => HandleChannel(dataYTB?.data?.channelId)}
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
                    src={dataYTB?.data?.channelThumbnail[0]?.url}
                  ></img>

                  <div style={{ marginLeft: "10%" }}>
                    <h5 style={{ fontSize: "18px" }}>
                      {dataYTB?.data?.channelBadges === null ? (
                        <>{dataYTB?.data?.channelTitle}</>
                      ) : (
                        <>
                          {dataYTB?.data?.channelTitle}{" "}
                          <span>
                            <VscVerifiedFilled />
                          </span>
                        </>
                      )}
                    </h5>
                    <p style={{ fontSize: "14px" }}>
                      {dataYTB?.data?.subscriberCountText}
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
              {dataYTB?.data?.relatedVideos?.data?.map((element, index) => (
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
                            ? HeightVideos * 0.7
                            : HeightVideos / 2.2
                        }px`,
                        width: "100%",
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
                        alt="ChannelImage"
                        style={{
                          width: `${window.innerWidth > 580 ? "35px" : "50px"}`,
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
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <BarSearch />
          <div
            ref={ref}
            style={{
              border: "2px solid red",
              display: "grid",
              width: "90%",
              gridTemplateColumns: "60% 40%",
              left: "8vw",
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
                url={`https://www.youtube.com/watch?v=${id}`}
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
                {dataYTB?.data?.title}
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
                  onClick={() => HandleChannel(dataYTB?.data?.channelId)}
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
                    alt="ChannelImage"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      marginRight: "1%",
                    }}
                    src={dataYTB?.data?.channelThumbnail[0]?.url}
                  ></img>

                  <div style={{ marginLeft: "2%", marginRight: "5%" }}>
                    <h5 style={{ fontSize: "18px" }}>
                      {dataYTB?.data?.channelBadges === null ? (
                        <>{dataYTB?.data?.channelTitle}</>
                      ) : (
                        <>
                          {dataYTB?.data?.channelTitle}{" "}
                          <span>
                            <VscVerifiedFilled />
                          </span>
                        </>
                      )}
                    </h5>
                    <p style={{ fontSize: "14px" }}>
                      {dataYTB?.data?.subscriberCountText}
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
                  {dataYTB?.data?.viewCount} vues - {dataYTB?.data?.publishDate}
                </h3>
                <div style={{ fontSize: "20px" }}>
                  {DisplayDescription ? (
                    <>
                      <p>{dataYTB?.data?.description}</p>
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
                      {dataYTB?.data?.description.substring(0, 312)}{" "}
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
                backgroundColor: "skyblue",
                border: "1px solid skyblue",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
            >
              {dataYTB?.data?.relatedVideos?.data?.map((element, index) => (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-evenly",
                    margin: "2vh 0vh 2vh 0vh",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "35%",
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
                        width: "100%",
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
                        {element?.publishedTimeText}
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
export { Videos };

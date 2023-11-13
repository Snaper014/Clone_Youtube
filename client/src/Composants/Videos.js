import * as React from "react";
import ReactPlayer from "react-player/lazy";
import { CircularProgress } from "@mui/material";
import "../App.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineCheck, AiFillLike, AiFillDislike } from "react-icons/ai";
import { ModalPlaylist } from "./Elements/modals/ModalPlaylist";
import { MdKeyboardArrowDown} from "react-icons/md";
import { GetVideos } from "../utils/Appel";
import { useQuery } from "@tanstack/react-query";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BarSearch, MobileBarSearch } from "./AppBarPrimary";
import { CheckRelatedVideos } from "../utils/utils";
import {
  AddVideosHistory,
  AddSub,
  CheckSubs,
  LikeOrDislike,
  CheckLikeOrDislike,
} from "../actions/Actions";
import { useContext } from "../Context/ContextProvider";
import { ModalSub } from "./Elements/modals/ModalSub";
import { GetInfos, GetInfosSubs, AddInfosLikes } from "../utils/utils";
import { ModalLike } from "./Elements/modals/ModalLike";

function Videos() {
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();
  const {
    data: dataYTB,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Videos`, id],
    queryFn: () => GetVideos(id),
    enabled: !!id,
    staleTime: 1000,
  });
  const [DisplayDescription, setDisplayDescription] = React.useState(false);
  const [open, setOpen] = React.useState({
      subscriber: false,
      like: false,
      dislike: false
  });
  const handleOpen = (open) => {
     setOpen(prev => {return {...prev, [open]: true}})
  };
  const handleClose = () => setOpen(false);
  const [check, setCheck] = React.useState({
    isSubs: false,
    isLike: false,
    isDislike: false,
  });
  const [WidthVideos, setWidthVideos] = React.useState();
  const [HeightVideos, setHeightVideos] = React.useState();
  const ref = React.useRef(null);
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const { user } = useContext();

  React.useLayoutEffect(() => {
    const hight = window.innerHeight;
    setHeightVideos(hight * 0.5);
    let chargement = setTimeout(() => {
      CheckRelatedVideos(setWidthVideos, ref, setHeightVideos);
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
    if (user) {
      AddVideosHistory(user?.id, GetInfos(dataYTB, id));
      CheckLikeOrDislike(id)
        .then((response) => {
          const type = response?.data?.data;
          console.log("type", type);
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
      CheckSubs(dataYTB?.data?.channelId)
        .then((response) =>
          setCheck((prev) => {
            return { ...prev, isSubs: response?.data?.data };
          }),
        )
        .catch((error) => console.log(error));
    }
    window.addEventListener("resize", CheckResponsive);
    return () => {
      window.removeEventListener("resize", CheckResponsive);
    };
  }, [user, location, dataYTB, id]);

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

  console.log("DATAYTB", dataYTB)

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
                gap: '5px'
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                width={"100%"}
                height={`60vh`}
                className="react-player"
                controls
                data-testid="videoPlayer"
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
                {dataYTB?.data?.viewCount} vues - {
                  new Date(dataYTB?.data?.publishDate)
                  .toLocaleString("fr-FR", { timeZone: "UTC" })
                  .substring(0, 11)
                  }
              </p>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  margin: '15px 0px',
                  alignItems: "flex-start",
                  cursor: "pointer",
                }}
              >
                <div
                  onClick={() => HandleChannel(dataYTB?.data?.channelId)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                  }}
                >
                  {dataYTB?.data?.channelThumbnail === null ? (
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
                      src={dataYTB?.data?.channelThumbnail[0]?.url}
                    ></img>
                  )}
                    <h5 style={{ 
                        fontSize: "18px", 
                        display: 'flex',
                        flexDirection: 'row',
                        gap: "3px",
                        marginRight: "5px"
                      }}>
                      {dataYTB?.data?.channelBadges === null ? (
                        <p>{dataYTB?.data?.channelTitle}</p>
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
                   onClick={() => {
                    if (user) {
                      AddSub(GetInfosSubs(dataYTB))
                        .then((response) => {
                          //setIsSubs(response?.data?.data)
                          setCheck((prev) => {
                            return { ...prev, isSubs: response?.data?.data };
                          });
                        })
                        .catch((error) => console.log(error));
                    }else{
                        handleOpen("subscriber");
                    }
                  }}
                  style={{
                    display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      border: `${!user ? "1px solid black" : (check.isSubs ? "none" : "1px solid black")}`,
                      justifyContent: `${!user ? "center" :(
                        check.isSubs ? "space-evenly" : "center")
                      }`,
                      backgroundColor: `${!user ? "black" : (check.isSubs ? "#efeff1" : "black")}`,
                      color: `${!user ? "white" : (check.isSubs ? "black" : "white")}`,
                      fontSize: "18px",
                      height: "50px",
                      width: "128px",
                      fontWeight: "550",
                      textAlign: "center",
                      borderRadius: "30px",
                  }}
                >
                  {check.isSubs ? (
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
                      if(user){
                        LikeOrDislike("like", AddInfosLikes(dataYTB, id, "like"))
                          .then((response) => {
                            console.log(response?.data?.data);
                            setCheck((prev) => {
                              return {
                                ...prev,
                                isLike: response?.data?.data,
                                isDislike: false,
                              };
                            });
                          })
                          .catch((error) => console.log(error));
                      }else{
                        handleOpen("like");
                      }
                    }}
                    fontSize={30}
                    color={`${!user ? 'black' : (check.isLike ? "blue" : "black")}`}
                    style={{ cursor: "pointer" }}
                  />
                  <AiFillDislike
                    onClick={() => {
                      if(user){
                        LikeOrDislike(
                          "dislike",
                          AddInfosLikes(dataYTB, id, "dislike"),
                        )
                          .then((response) => {
                            console.log(response?.data?.data);
                            setCheck((prev) => {
                              return {
                                ...prev,
                                isDislike: response?.data?.data,
                                isLike: false,
                              };
                            });
                          })
                          .catch((error) => console.log(error));
                      }else{
                        handleOpen("dislike");
                      }
                    }}
                    fontSize={30}
                    color={`${!user ? 'black' : (check.isDislike ? "red" : "black")}`}
                    style={{ cursor: "pointer" }}
                  />
                  <ModalPlaylist 
                      user={user}
                      id={id} 
                      dataYTB={dataYTB}
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
              {dataYTB?.data?.relatedVideos?.data === null ? (
                <div></div>
              ) : (
                dataYTB?.data?.relatedVideos?.data?.map((element, index) => (
                  <div
                    key={index}
                    style={{
                      width: `${WidthVideos}px`,
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginBottom: "1%",
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
                ))
              )}
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
                border: "1px solid transparent",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                width={"100%"}
                height={"450px"}
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
                    onClick={() => HandleChannel(dataYTB?.data?.channelId)}
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
                    {dataYTB?.data?.channelThumbnail === null ? (
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
                        src={dataYTB?.data?.channelThumbnail[0]?.url}
                      ></img>
                    )}

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
                        AddSub(GetInfosSubs(dataYTB))
                          .then((response) => {
                            //setIsSubs(response?.data?.data)
                            setCheck((prev) => {
                              return { ...prev, isSubs: response?.data?.data };
                            });
                          })
                          .catch((error) => console.log(error));
                      }else{
                          handleOpen("subscriber");
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      border: `${!user ? "1px solid black" : (check.isSubs ? "none" : "1px solid black")}`,
                      justifyContent: `${!user ? "center" :(
                        check.isSubs ? "space-evenly" : "center")
                      }`,
                      backgroundColor: `${!user ? "black" : (check.isSubs ? "#efeff1" : "black")}`,
                      color: `${!user ? "white" : (check.isSubs ? "black" : "white")}`,
                      fontSize: "18px",
                      height: "50px",
                      width: "128px",
                      fontWeight: "550",
                      textAlign: "center",
                      borderRadius: "30px",
                    }}
                  >
                    {check.isSubs ? (
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
                      if(user){
                        LikeOrDislike("like", AddInfosLikes(dataYTB, id, "like"))
                          .then((response) => {
                            console.log(response?.data?.data);
                            setCheck((prev) => {
                              return {
                                ...prev,
                                isLike: response?.data?.data,
                                isDislike: false,
                              };
                            });
                          })
                          .catch((error) => console.log(error));
                      }else{
                        handleOpen("like");
                      }
                    }}
                    fontSize={30}
                    color={`${!user ? 'black' : (check.isLike ? "blue" : "black")}`}
                    style={{ cursor: "pointer" }}
                  />
                  <AiFillDislike
                    onClick={() => {
                      if(user){
                        LikeOrDislike(
                          "dislike",
                          AddInfosLikes(dataYTB, id, "dislike"),
                        )
                          .then((response) => {
                            console.log(response?.data?.data);
                            setCheck((prev) => {
                              return {
                                ...prev,
                                isDislike: response?.data?.data,
                                isLike: false,
                              };
                            });
                          })
                          .catch((error) => console.log(error));
                      }else{
                        handleOpen("dislike");
                      }
                    }}
                    fontSize={30}
                    color={`${!user ? 'black' : (check.isDislike ? "red" : "black")}`}
                    style={{ cursor: "pointer" }}
                  />
                  <ModalPlaylist 
                      user={user}
                      id={id} 
                      dataYTB={dataYTB}
                  />
                  <ModalSub open={open.subscriber} handleClose={handleClose}/>
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
                  {dataYTB?.data?.viewCount} vues - {
                  new Date(dataYTB?.data?.publishDate)
                  .toLocaleString("fr-FR", { timeZone: "UTC" })
                  .substring(0, 11)
                  }
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
                    <>
                      <p style={{width: "100%", height: "140px", overflow: "hidden"}}>
                        {dataYTB?.data?.description.substring(0, 312) + "..."} 
                      </p>
                      <div style={{
                        width: "100%", 
                        display: "flex", 
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <MdKeyboardArrowDown fontSize={30}/>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "white",
                border: "1px solid transparent",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
            >
              {dataYTB?.data?.relatedVideos?.data === null ? (
                <div></div>
              ) : (
                dataYTB?.data?.relatedVideos?.data?.map((element, index) => (
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
                        <p
                          style={{
                            margin: "0.3em",
                            fontWeight: "600",
                            padding: "2px",
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
                          {element?.publishedTimeText}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export { Videos };

import * as React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdOutlinePlaylistPlay } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import { CheckWidth, MoreContent, MobileResponsive } from "./utils";
import { IoIosRadio } from "react-icons/io";
import ReactPlayer from "react-player/lazy";
import { VscVerifiedFilled } from "react-icons/vsc";
import { CardCaroussel } from "../Composants/Carsoussel";

export const DisplayContent = ({
  Data,
  refWidth,
  setDataContext = "",
  setOption = "",
  LogochannelThumbnail = false,
  HasCaroussel = false,
  ChannelHome = false,
  setResponsive,
  responsive,
}) => {
  const [WidthVideos, setWidthVideos] = React.useState();
  const [WidthShorts, setWidthShorts] = React.useState();
  const [MarginRight, setMarginRight] = React.useState();
  const [marginLeft, setMarginLeft] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [select, setSelect] = React.useState(-1);
  const [expandedItems, setExpandedItems] = React.useState([]);

  //Caroussel
  const [value, setValue] = React.useState(0);
  console.log("data DisplayContent", Data);

  React.useEffect(() => {
    const HandleResize = () => {
      CheckWidth(
        refWidth,
        setWidthVideos,
        setWidthShorts,
        setMarginLeft,
        setMarginRight,
        HasCaroussel,
        setValue,
      );
      MobileResponsive(setResponsive);
    };
    window.addEventListener("resize", HandleResize);
    return () => window.removeEventListener("resize", HandleResize);
  }, [refWidth, HasCaroussel, setResponsive]);

  React.useLayoutEffect(() => {
    let chargement = setTimeout(() => {
      CheckWidth(
        refWidth,
        setWidthVideos,
        setWidthShorts,
        setMarginLeft,
        setMarginRight,
        HasCaroussel,
        setValue,
      );
      MobileResponsive(setResponsive);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(chargement);
  }, [refWidth, loading, HasCaroussel, setResponsive]);

  return (
    <>
      {loading === true ? (
        <div style={{ width: "100%" }}>chargement...</div>
      ) : (
        Data?.data?.data.map((element, index) => {
          if (element?.type === "video") {
            if (ChannelHome) {
              if(responsive){
                  return(
                    <div key={index}
                        style={{
                        width: "100%",
                        display:"flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                    }}>
                      <div style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1%",
                      }}>
                        <img
                        alt={element?.title}
                        src={element?.thumbnail[0]?.url}
                        height={`${window.innerHeight * 0.30}px`}
                        width="95%"
                        style={{ borderRadius: "10px" }}
                      ></img>
                      </div>
                      <h3 style={{fontWeight: "400", fontSize: "1em", marginBottom: "1%", width: "100%" }}>
                            {element?.title}
                    </h3>

                    </div>
                  )
              }
              return (
                <div key={index} className="SearchContainer">
                  <Link
                    to={`/watch/${element?.videoId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div style={{ position: "relative", cursor: "pointer" }}>
                      <img
                        alt={element?.title}
                        src={element?.thumbnail[0]?.url}
                        height="250px"
                        width="450px"
                        style={{ borderRadius: "10px" }}
                      ></img>
                      <div
                        className={`${
                          element?.lengthText === "EN DIRECT"
                            ? "IndicatorLive"
                            : "IndicatorView"
                        }`}
                      >
                        <p style={{ margin: "0.3em", fontWeight: "600" }}>
                          {element?.lengthText === "EN DIRECT"
                            ? "EN DIRECT"
                            : element?.lengthText}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div style={{ marginLeft: "2%" }}>
                    <h3 style={{ fontSize: "20px", marginBottom: "1%", fontWeight: "400"}}>
                      {element?.title}
                    </h3>
                    <div className="ContenuHomedescripVide" 
                        style={{whiteSpace: `${window.screen <= 300 ? "wrap": "nowrap"}`}}>
                      {element?.viewCount === "" && null}
                      {element?.lengthText === "EN DIRECT" && (
                        <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                          {element?.viewCount} spectateurs
                        </p>
                      )}
                      {element?.viewCount !== "" &&
                        element?.lengthText !== "EN DIRECT" && (
                          <>
                            <p
                              style={{ MarginLeft: "5px", marginRight: "5px" }}
                            >
                              {element?.viewCount} de vues
                            </p>
                            <div
                              style={{
                                display: "flex",
                                alignSelf: "center",
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                backgroundColor: "black",
                                MarginLeft: "5px",
                                marginRight: "5px",
                              }}
                            ></div>
                            <p>{element?.publishedTimeText}</p>
                          </>
                        )}
                    </div>
                    <Link
                      to={`/Channel/${Data?.data?.meta?.channelId}`}
                      key={index}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        style={{
                          marginBottom: "2%",
                          display: "flex",
                          flexDirection: "row",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginRight: "1%",
                          }}
                          src={Data?.data?.meta?.avatar[1]?.url}
                          alt={element?.title}
                        ></img>
                        <p>{Data?.data?.meta?.title}</p>
                      </div>
                    </Link>
                    <p>{element?.description}</p>
                    {element?.lengthText === "EN DIRECT" ? (
                      <p
                        style={{
                          backgroundColor: "rgba(204, 0, 0, 0.9)",
                          marginTop: "1%",
                          color: "white",
                          borderRadius: "2px",
                          width: "125px",
                          whiteSpace: "nowrap",
                          fontSize: "1em",
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          justifyContent: "space-around",
                          fontWeight: "550",
                        }}
                      >
                        <IoIosRadio color="white" fontSize={25} />
                        <span>EN DIRECT</span>
                      </p>
                    ) : null}
                    {!element?.badges ||
                    element?.lengthText === "EN DIRECT" ? null : (
                      <p
                        style={{
                          backgroundColor: "#efeff1",
                          marginTop: "1%",
                          borderRadius: "2px",
                          width: "10%",
                          fontSize: "0.8em",
                          textAlign: "center",
                          fontWeight: "550",
                        }}
                      >
                        NOUVEAU
                      </p>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginBottom: "2%",
                  flexDirection: "column",
                  marginRight: `${
                    window.innerWidth <= 767 ? "0px" : MarginRight
                  }`,
                  marginLeft: `${
                    window.innerWidth <= 767 ? "0px" : marginLeft
                  }`,
                  width: `${WidthVideos}`,
                  border: "1px solid transparent",
                }}
              >
                <Link
                  to={`/watch/${element?.videoId}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "100%", position: "relative" }}>
                    <img
                      alt={element?.title}
                      src={element?.thumbnail[0]?.url}
                      height="250px"
                      width={WidthVideos}
                      style={{ borderRadius: "10px" }}
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
                </Link>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: "20%" }}>
                    <Link
                      to={`/Channel/${element?.channelId}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "1%",
                          cursor: "pointer",
                        }}
                        src={
                          LogochannelThumbnail
                            ? element?.channelThumbnail[0]?.url
                            : element?.thumbnail[0]?.url
                        }
                        alt={element?.title}
                      ></img>
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: "85%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      <Link
                        to={`/watch/${element?.videoId}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        <h3 style={{ width: "100%", marginBottom: "1%" }}>
                          {element?.title.length >= 50
                            ? element?.title?.substring(0, 50) + "..."
                            : element?.title}
                        </h3>
                      </Link>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                        to={`/Channel/${element?.channelId}`}
                      >
                        <p style={{ width: "100%", fontSize: "18px" }}>
                          {element?.channelTitle}
                        </p>
                      </Link>
                      <Link
                        to={`/watch/${element?.videoId}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        <div className="ContenuHomedescripVide"
                        style={{whiteSpace: `${window.screen <= 300 ? "wrap": "nowrap"}`}}
                         >
                          {element?.lengthText === "EN DIRECT" ? (
                            <p style={{ marginRight: "5px" }}>
                              {element?.viewCount} spectateurs
                            </p>
                          ) : (
                            <>
                              <p style={{ marginRight: "5px" }}>
                                {element?.viewCount} de vues
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignSelf: "center",
                                  width: "4px",
                                  height: "4px",
                                  borderRadius: "50%",
                                  backgroundColor: "black",
                                  marginRight: "5px",
                                }}
                              ></div>
                              <p>{element?.publishedTimeText}</p>
                            </>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          if (element?.type === "video_listing") {
            if (responsive && ChannelHome) {
              let button = document.getElementById(`Mobile-Buttton-${index}`);
              return (
                  <div 
                  key={index}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    borderTop: "2px solid #efefef",
                    borderBottom: "2px solid #efefef",
                    padding: "1% 0px 1% 0px",
                  }}>
                    <h3 style={{fontWeight: "400", fontSize: "1em", marginBottom: "1%", width: "100%" }}>
                            {element?.title}
                    </h3>
                    <p style={{width: "100%", fontSize: "0.8em", marginBottom: "2%"}}>
                      {element?.subtitle?.length >= 140
                            ? element?.subtitle?.substring(0, 140) + "..."
                            : element?.subtitle}
                    </p>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}>
                  {element?.data.map((items, i) => {
                  if(
                    expandedItems.includes(element?.title) ? 
                     element?.data?.length : 
                     (button ? i < 3 : element?.data?.length)
                    ){
                  return (
                  <div
                  key={i}
                  style={{ 
                    height: `${window.innerWidth <= 500 ? "auto" : "112px"}`,
                    border: "1px solid transparent",
                    display: "flex",
                    width: "100%",
                    flexDirection: `${window.innerWidth <= 500 ? "column" : "row"}`,
                    alignItems: "flex-start",
                    justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                    flexWrap: `${window.innerWidth <= 500 ? "wrap" : "nowrap"}`,
                    marginBottom: "2%",
                  }}
                >
                  <Link
                    to={`/watch/${items?.videoId}`}
                    style={{ 
                      textDecoration: "none", 
                      color: "black", 
                      width: `${window.innerWidth <= 500 ? "100%" : "30%"}`}}
                  >
                    <div style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      }}>
                      <div style={{ 
                        position: "relative", 
                        cursor: "pointer", 
                        width: `${window.innerWidth <= 500 ? "70%" : "100%"}`
                      }}>
                      <img
                        alt={items?.title}
                        src={items?.thumbnail[0]?.url}
                        height={`${window.innerWidth <= 500 ? "200px" : "112px"}`}
                        width="100%"
                        style={{ borderRadius: "10px" }}
                      ></img>
                      <div
                        style={{ height: "15%", margin: "0.3em" }}
                        className={`${
                          items?.lengthText === "EN DIRECT"
                            ? "IndicatorLive"
                            : "IndicatorView"
                        }`}
                      >
                        <p style={{ margin: "0.3em", fontWeight: "600" }}>
                          {items?.lengthText === "EN DIRECT"
                            ? "EN DIRECT"
                            : items?.lengthText}
                        </p>
                      </div>
                      </div>
                    </div>
                  </Link>
                  <Link  to={`/watch/${items?.videoId}`}
                    style={{ 
                      textDecoration: "none", 
                      color: "black", 
                      width: `${window.innerWidth <= 500 ? "100%" : "70%"}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                      justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                }}>
                  <div
                    style={{
                      width: "70%",
                      marginLeft: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ fontSize: "0.8em", marginBottom: "1%", }}>
                      {items?.title?.length >= 50 ? 
                        items?.title?.substring(0, 50) + "..." : 
                        items?.title}
                    </p>
                    <p style={{ fontSize: "0.8em", marginBottom: "1%" }}>
                      {Data?.data?.meta?.title}
                    </p>
                    <div className="ContenuHomedescripVide"
                    style={{whiteSpace: `${window.screen <= 300 ? "wrap": "nowrap"}`}}
                    >
                      {items?.viewCount === "" && null}
                      {items?.lengthText === "EN DIRECT" && (
                        <p
                          style={{
                            MarginLeft: "5px",
                            marginRight: "5px",
                            fontSize: "0.6em",
                          }}
                        >
                          {items?.viewCount} spectateurs
                        </p>
                      )}
                      {items?.viewCount !== "" &&
                        items?.lengthText !== "EN DIRECT" && (
                          <>
                            <p
                              style={{
                                MarginLeft: "5px",
                                marginRight: "5px",
                                fontSize: "0.6em",
                              }}
                            >
                              {items?.viewCount} de vues
                            </p>
                            <div
                              style={{
                                display: "flex",
                                alignSelf: "center",
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                backgroundColor: "black",
                                MarginLeft: "5px",
                                marginRight: "5px",
                              }}
                            ></div>
                            <p style={{ fontSize: "0.6em" }}>
                              {items?.publishedTimeText}
                            </p>
                          </>
                        )}
                    </div>
                  </div>
                  </Link>
                </div>
                              )
                            }
                        return null ;    
                      })}
                    </div>    

                      <div 
                      id={`Mobile-Buttton-${index}`}
                      onClick={() => {
                        console.log("cliquer");
                        console.log("button", button);
                        setExpandedItems([element?.title]);
                        button.remove();
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <MdKeyboardArrowDown fontSize={22}/>
                      </div>
                  </div>
              )
            }
            if (HasCaroussel) {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    id={`Container-level-${index}`}
                    style={{
                      width: "90%",
                      borderTop: "1px solid #D0D3D4",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "3px",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h2
                      style={{
                        margin: "2% 0px 3px 0px",
                        fontWeight: "550",
                      }}
                    >
                      {element.title}
                    </h2>
                    <h4
                      style={{
                        margin: "0px 0px 2% 0px",
                        width: "100%",
                        fontWeight: "400",
                      }}
                    >
                      {element?.subtitle}
                    </h4>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        marginBottom: "3%",
                      }}
                    >
                      <CardCaroussel value={value}>
                        {element?.data.map((items, i) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                width: `${WidthVideos}`,
                                marginLeft: `${marginLeft}`,
                                marginRight: `${MarginRight}`,
                                border: "1px solid transparent",
                              }}
                              key={i}
                            >
                              <Link
                                to={`/watch/${items?.videoId}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  width: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    position: "relative",
                                    cursor: "pointer",
                                  }}
                                >
                                  <img
                                    alt={items?.title}
                                    src={items?.thumbnail[0]?.url}
                                    height="160px"
                                    width={WidthVideos}
                                    style={{ borderRadius: "10px" }}
                                  ></img>
                                  <div
                                    className={`${
                                      items?.lengthText === "EN DIRECT"
                                        ? "IndicatorLive"
                                        : "IndicatorView"
                                    }`}
                                  >
                                    <p
                                      style={{
                                        margin: "0.3em",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {items?.lengthText}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  justifyContent: "flex-start",
                                  width: "100%",
                                  cursor: "pointer",
                                  zIndex: `${10}`,
                                }}
                              >
                                {ChannelHome ? (
                                  <>
                                    <h6
                                      style={{
                                        fontWeight: "600",
                                        width: "100%",
                                        fontSize: "18px",
                                      }}
                                    >
                                      {items?.title.length >= 50
                                        ? items?.title?.substring(0, 50) + "..."
                                        : items?.title}
                                    </h6>
                                    <h4
                                      style={{
                                        fontWeight: "400",
                                        display: "inline",
                                        marginBottom: "2%",
                                      }}
                                    >
                                      {Data?.data?.meta?.title}{" "}
                                      {Data?.data?.meta?.isVerified ? (
                                        <VscVerifiedFilled />
                                      ) : null}
                                    </h4>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        flexWrap: "nowrap",
                                        width: "100%",
                                        fontSize: "0.8em",
                                      }}
                                    >
                                      <p
                                        style={{
                                          MarginLeft: "5px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        {items?.viewCount} vues
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
                                      <p
                                        style={{
                                          MarginLeft: "5px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        {items?.publishedTimeText}
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <Link
                                      to={`/watch/${items?.videoId}`}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                        width: "100%",
                                      }}
                                    >
                                      <h3
                                        style={{
                                          width: "100%",
                                          fontSize: "18px",
                                        }}
                                      >
                                        {items?.title.length >= 40
                                          ? items?.title?.substring(0, 40) +
                                            "..."
                                          : items?.title}
                                      </h3>
                                    </Link>
                                    <Link
                                      to={`/Channel/${items?.channelId}`}
                                      style={{
                                        textDecoration: "none",
                                        color: "black",
                                        width: "100%",
                                      }}
                                    >
                                      <p
                                        style={{
                                          width: "100%",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {items?.channelTitle}
                                      </p>
                                    </Link>
                                    {items?.lengthText !== "EN DIRECT" ? (
                                      <Link
                                        to={`/watch/${items?.videoId}`}
                                        style={{
                                          textDecoration: "none",
                                          color: "black",
                                          width: "100%",
                                        }}
                                      >
                                        <div className="ContenuHomedescripVide"
                                        style={{whiteSpace: `${window.screen <= 300 ? "wrap": "nowrap"}`}} 
                                        >
                                          <p style={{ marginRight: "5px" }}>
                                            {items?.viewCount} de vues
                                          </p>
                                          <div
                                            style={{
                                              display: "flex",
                                              alignSelf: "center",
                                              width: "4px",
                                              height: "4px",
                                              borderRadius: "50%",
                                              backgroundColor: "black",
                                              marginRight: "5px",
                                            }}
                                          ></div>
                                          <p>{items?.publishedTimeText}</p>
                                        </div>
                                      </Link>
                                    ) : (
                                      <p>{items?.viewCount} spectateurs</p>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </CardCaroussel>
                    </div>
                  </div>
                </div>
              );
            } 
          if(window.innerWidth >= 1025){
              return (
                <div
                  key={index}
                  id={`Container-level-${index}`}
                  style={{
                    width: "100%",
                    borderBottom: "5px solid #D0D3D4",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "35px",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      margin: `2% 0px ${
                        element?.subtitle !== null ? "3px" : "2%"
                      } 0px`,
                      fontWeight: "400",
                    }}
                  >
                    {element?.title}
                  </h2>
                  {element?.subtitle !== null && (
                    <h4
                      style={{
                        margin: "0px 0px 2% 0px",
                        width: "100%",
                        fontWeight: "400",
                      }}
                    >
                      {element?.subtitle}
                    </h4>
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      overflow: "hidden",
                      marginBottom: "20px",
                    }}
                  >
                    {element?.data.map((items, i) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            width: `${WidthVideos}`,
                            marginLeft: `${marginLeft}`,
                            marginRight: `${MarginRight}`,
                            border: "1px solid transparent",
                          }}
                          key={i}
                        >
                          <Link
                            to={`/watch/${items?.videoId}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                position: "relative",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                alt={items?.title}
                                src={items?.thumbnail[0]?.url}
                                height="250px"
                                width={WidthVideos}
                                style={{ borderRadius: "10px" }}
                              ></img>
                              <div
                                className={`${
                                  items?.lengthText === "EN DIRECT"
                                    ? "IndicatorLive"
                                    : "IndicatorView"
                                }`}
                              >
                                <p
                                  style={{ margin: "0.3em", fontWeight: "600" }}
                                >
                                  {items?.lengthText}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                            }}
                          >
                            <div style={{ width: "20%" }}>
                              <Link
                                to={`/Channel/${items?.channelId}`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    marginLeft: "1%",
                                    cursor: "pointer",
                                  }}
                                  src={
                                    LogochannelThumbnail
                                      ? items?.channelThumbnail[0]?.url
                                      : items?.thumbnail[0]?.url
                                  }
                                  alt={items?.title}
                                ></img>
                              </Link>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                width: "80%",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-start",
                                  flexDirection: "column",
                                  cursor: "pointer",
                                }}
                              >
                                <Link
                                  to={`/watch/${items?.videoId}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                    width: "100%",
                                  }}
                                >
                                  <h3
                                    style={{
                                      width: "100%",
                                      marginBottom: "1%",
                                    }}
                                  >
                                    {items?.title.substring(0, 100)}
                                  </h3>
                                </Link>
                                <Link
                                  to={`/Channel/${items?.channelId}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                    width: "100%",
                                  }}
                                >
                                  <p
                                    style={{ width: "100%", fontSize: "18px" }}
                                  >
                                    {items?.channelTitle}
                                  </p>
                                </Link>
                                {items?.lengthText !== "EN DIRECT" ? (
                                  <Link
                                    to={`/watch/${items?.videoId}`}
                                    style={{
                                      textDecoration: "none",
                                      color: "black",
                                      width: "100%",
                                    }}
                                  >
                                    <div className="ContenuHomedescripVide"
                                      style={{whiteSpace: `${window.screen <= 300 ? "wrap": "nowrap"}`}} 
                                    >
                                      <p style={{ marginRight: "5px" }}>
                                        {items?.viewCount} de vues
                                      </p>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignSelf: "center",
                                          width: "4px",
                                          height: "4px",
                                          borderRadius: "50%",
                                          backgroundColor: "black",
                                          marginRight: "5px",
                                        }}
                                      ></div>
                                      <p>{items?.publishedTimeText}</p>
                                    </div>
                                  </Link>
                                ) : (
                                  <p>{items?.viewCount} spectateurs</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div
                    onClick={() => MoreContent(index)}
                    className="HoverV2ColorGray"
                    id={`Button-section-${index}`}
                    style={{
                      width: "100%",
                      height: "45px",
                      border: "1px solid transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MdKeyboardArrowDown fontSize={32} />
                  </div>
                </div>
              );
            }
           return null; 
          }
          if (element?.type === "channel_listing") {
            if (responsive && ChannelHome) {
              let button = document.getElementById(`Mobile-Buttton-${index}`);
              return (
                  <div 
                  key={index}
                  style={{
                    width: "100%",
                    display: "flex",
                    marginBottom: "2%",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    borderTop: "2px solid #efefef",
                    borderBottom: "2px solid #efefef",
                    padding: "1% 0px 1% 0px",
                  }}>
                    <h3 style={{fontWeight: "400", fontSize: "1em", marginBottom: "1%", width: "100%" }}>
                            {element?.title}
                    </h3>
                    <p style={{width: "100%", fontSize: "0.8em", marginBottom: "2%"}}>
                      {element?.subtitle?.length >= 140
                            ? element?.subtitle?.substring(0, 140) + "..."
                            : element?.subtitle}
                    </p>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}>
                  {element?.data.map((items, i) => {
                  if(
                    expandedItems.includes(element?.title) ? 
                     element?.data?.length : 
                     (button ? i < 3 : element?.data?.length)
                    ){
                  return (
                  <div
                  key={i}
                  style={{ 
                    height: `${window.innerWidth <= 500 ? "auto" : "112px"}`,
                    border: "1px solid transparent",
                    display: "flex",
                    width: "100%",
                    flexDirection: `${window.innerWidth <= 500 ? "column" : "row"}`,
                    alignItems: "flex-start",
                    justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                    flexWrap: `${window.innerWidth <= 500 ? "wrap" : "nowrap"}`,
                    marginBottom: "2%",
                  }}
                >
                  <Link
                    to={`/Channel/${items?.channelId}`}
                    style={{ 
                      textDecoration: "none", 
                      color: "black", 
                      width: `${window.innerWidth <= 500 ? "100%" : "30%"}`}}
                  >
                    <div style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      }}>
                      <img
                        alt={items?.title}
                        src={`${
                          items?.thumbnail[1]?.url.includes("https:")
                            ? items?.thumbnail[1]?.url
                            : "https:" + items?.thumbnail[1]?.url
                        }`}
                        height={`100px`}
                        width={`100px`}
                        style={{ borderRadius: "50%"}}
                      ></img>
                    </div>
                  </Link>
                  <Link  to={`/Channel/${items?.channelId}`}
                    style={{ 
                      textDecoration: "none", 
                      color: "black", 
                      width: `${window.innerWidth <= 500 ? "100%" : "70%"}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                      justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                }}>
                  <div
                    style={{
                      width: "100%",
                      marginLeft: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                      justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                    }}
                  >
                    <p style={{ fontSize: "0.8em", marginBottom: "1%", }}>
                      {items?.title?.length >= 50 ? 
                        items?.title?.substring(0, 50) + "..." : 
                        items?.title}
                    </p>
                    <p style={{ fontSize: "0.8em", marginBottom: "1%" }}>
                      {items?.subscriberCount}
                    </p>
                    <button
                          style={{
                            border: "none",
                            fontSize: "16px",
                            padding: "1vw",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#efeff1",
                            borderRadius: "30px",
                            fontWeight: "550",
                            height: "15%",
                          }}
                        >
                          S'abonner
                        </button>
                  </div>
                  </Link>
                </div>
                              )
                            }
                        return null ;    
                      })}
                    </div>    
                      <div 
                      id={`Mobile-Buttton-${index}`}
                      onClick={() => {
                        console.log("cliquer");
                        console.log("button", button);
                        setExpandedItems([element?.title]);
                        button.remove();
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <MdKeyboardArrowDown fontSize={22}/>
                      </div>
                  </div>
              )
            }
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  id={`Container-level-${index}`}
                  style={{
                    width: "90%",
                    borderTop: "1px solid #D0D3D4",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "3px",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      margin: "2% 0px 3px 0px",
                      fontWeight: "550",
                    }}
                  >
                    {element.title}
                  </h2>
                  <h4
                    style={{
                      margin: "0px 0px 2% 0px",
                      width: "100%",
                      fontWeight: "400",
                    }}
                  >
                    {element?.subtitle}
                  </h4>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      marginBottom: "3%",
                    }}
                  >
                    <CardCaroussel value={value}>
                      {element?.data.map((items, i) => {
                        return (
                          <Link
                            to={`/Channel/${items?.channelId}`}
                            key={i}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                width: `${WidthVideos}`,
                                marginLeft: `${marginLeft}`,
                                marginRight: `${MarginRight}`,
                                border: "1px solid transparent",
                                cursor: "pointer",
                              }}
                            >
                              <div
                                style={{
                                  width: `${WidthVideos}`,
                                  marginBottom: "1%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  alt={items?.title}
                                  width={WidthVideos / 2}
                                  style={{ borderRadius: "50%" }}
                                  height="150px"
                                  src={`${
                                    items?.thumbnail[1]?.url.includes("https:")
                                      ? items?.thumbnail[1]?.url
                                      : "https:" + items?.thumbnail[1]?.url
                                  }`}
                                ></img>
                              </div>
                              <h4 style={{ marginBottom: "1%" }}>
                                {items?.title}
                              </h4>
                              <p style={{ marginBottom: "8%" }}>
                                {items?.subscriberCount}
                              </p>
                              <button
                                style={{
                                  border: "none",
                                  fontSize: "16px",
                                  padding: "1vw",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "#efeff1",
                                  borderRadius: "30px",
                                  fontWeight: "550",
                                  height: "15%",
                                }}
                              >
                                S'abonner
                              </button>
                            </div>
                          </Link>
                        );
                      })}
                    </CardCaroussel>
                  </div>
                </div>
              </div>
            );
          }

          if (element?.type === "shorts_listing") {
            if (responsive) {
              return (
                <div
                  key={index}
                  className="ContainerSearchShorts"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    border: "2px solid transparent",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginBottom: "2%",
                    }}
                  >
                    <img alt="logo shorts" src="/youtube-shorts.png"></img>
                    <h2 style={{ marginLeft: "2%" }}>{element?.title}</h2>
                  </div>
                  <div
                    className="shorts"
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <CardCaroussel value={value} shorts mobile>
                      {element?.data.map((items, i) => (
                        <Link
                          to={`/List/Shorts/${i}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: `${WidthShorts}`,
                            marginRight: `${MarginRight}`,
                            marginLeft: `${marginLeft}`,
                          }}
                          key={i}
                          onClick={() => {
                            setOption(true);
                            setDataContext(element);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                              flexDirection: "column",
                              flexWrap: "nowrap",
                              width: `100%`,
                            }}
                          >
                            <img
                              style={{ borderRadius: "10px" }}
                              alt={items?.title}
                              src={items?.thumbnail[0]?.url}
                              width={WidthShorts}
                              height="400px"
                            ></img>
                            <h4
                              style={{
                                fontWeight: "600",
                                width: "100%",
                                fontSize: "16px",
                                marginBottom: "2%",
                              }}
                            >
                              {items?.title.length >= 63
                                ? items?.title?.substring(0, 63) + "..."
                                : items?.title}
                            </h4>
                            <p>{items?.viewCountText}</p>
                          </div>
                        </Link>
                      ))}
                    </CardCaroussel>
                  </div>
                </div>
              );
            }
            if(HasCaroussel){
                return(
                  <div
                key={index}
                className="ContainerSearchShorts"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  border: "2px solid transparent",
                  width: `100%`,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginBottom: "2%",
                  }}
                >
                  <img alt="logo shorts" src="/youtube-shorts.png"></img>
                  <h2 style={{ marginLeft: "2%" }}>{element?.title}</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "90%",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    overflow: "hidden",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                  }}
                >
                  <CardCaroussel
                    value={value}
                    shorts
                  >
                    {element?.data.map((items, i) => (
                      <Link
                        to={`/List/Shorts/${i}`}
                        style={{ textDecoration: "none", color: "black" }}
                        key={i}
                        onClick={() => {
                          setOption(true);
                          setDataContext(element);
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            width: `${WidthShorts}`,
                            marginLeft: `${marginLeft}`,
                            marginRight: `${MarginRight}`,
                            cursor: "pointer",
                          }}
                        >
                          <img
                            style={{ borderRadius: "10px" }}
                            alt={items?.title}
                            src={items?.thumbnail[0]?.url}
                            width={WidthShorts}
                            height="465px"
                          ></img>
                          <h4
                            style={{
                              fontWeight: "600",
                              width: "100%",
                              fontSize: "16px",
                              marginBottom: "2%",
                            }}
                          >
                            {items?.title.length >= 63
                              ? items?.title?.substring(0, 63) + "..."
                              : items?.title}
                          </h4>
                          <p>{items?.viewCountText}</p>
                        </div>
                      </Link>
                    ))}
                  </CardCaroussel>
                </div>
              </div>
                )
            }
            return (
              <div
                key={index}
                id={`Container-level-${index}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "30px",
                  marginBottom: "30px",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  width: `100%`,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginBottom: "2%",
                  }}
                >
                  <img alt="logo shorts" src="/youtube-shorts.png"></img>
                  <h2 style={{ marginLeft: "2%" }}>{element?.title}</h2>
                </div>
                <div
                  className="shorts"
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "flex-start",
                    overflow: "hidden",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  {element?.data.map((items, i) => (
                    <Link
                      to={`/List/Shorts/${i}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        width: `${WidthShorts}`,
                        marginRight: `${
                          window.innerWidth <= 767
                            ? `${window.innerWidth * 0.05}px`
                            : MarginRight
                        }`,
                        marginLeft: `${
                          window.innerWidth <= 767
                            ? `${window.innerWidth * 0.015}px`
                            : marginLeft
                        }`,
                      }}
                      key={i}
                      onClick={() => {
                        setOption(true);
                        setDataContext(element);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          flexWrap: "nowrap",
                          width: `100%`,
                        }}
                      >
                        <img
                          style={{ borderRadius: "10px" }}
                          alt={items?.title}
                          src={items?.thumbnail[0]?.url}
                          width={WidthShorts}
                          height={`${
                            window.innerWidth <= 550 ? "250px" : "465px"
                          }`}
                        ></img>
                        <h4
                          style={{
                            fontWeight: "600",
                            width: "100%",
                            fontSize: "16px",
                            marginBottom: "2%",
                          }}
                        >
                          {items?.title.length >= 63
                            ? items?.title?.substring(0, 63) + "..."
                            : items?.title}
                        </h4>
                        <p>{items?.viewCountText}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div
                  onClick={() => MoreContent(index, true)}
                  className="HoverV2ColorGray"
                  id={`Button-section-${index}`}
                  style={{
                    width: "100%",
                    height: "45px",
                    border: "1px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MdKeyboardArrowDown fontSize={32} />
                </div>
              </div>
            );
          }

          if (element?.type === "playlist_listing") {
            if(element?.title === "Recommandations personnalisées"){
              return null;
            }
            if (responsive && ChannelHome) {
              let button = document.getElementById(`Mobile-Buttton-${index}`);
              return (
                  <div 
                  key={index}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    borderTop: "2px solid #efefef",
                    borderBottom: "2px solid #efefef",
                    padding: "1% 0px 1% 0px",
                  }}>
                    <h3 style={{fontWeight: "400", fontSize: "1em", marginBottom: "1%", width: "100%" }}>
                            {element?.title}
                    </h3>
                    <p style={{width: "100%", fontSize: "0.8em", marginBottom: "2%"}}>
                      {element?.subtitle?.length >= 140
                            ? element?.subtitle?.substring(0, 140) + "..."
                            : element?.subtitle}
                    </p>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}>
                  {element?.data.map((items, i) => {
                  if(
                    expandedItems.includes(element?.title) ? 
                     element?.data?.length : 
                     (button ? i < 3 : element?.data?.length)
                    ){
                  return (
                  <div
                  key={i}
                  style={{ 
                    height: `${window.innerWidth <= 500 ? "auto" : "112px"}`,
                    border: "1px solid transparent",
                    display: "flex",
                    width: "100%",
                    flexDirection: `${window.innerWidth <= 500 ? "column" : "row"}`,
                    alignItems: "flex-start",
                    justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                    flexWrap: `${window.innerWidth <= 500 ? "wrap" : "nowrap"}`,
                    marginBottom: "2%",
                  }}
                >
                  <Link
                    to={`/Playlist/${items?.videoId}/${0}/${
                      items?.playlistId
                    }`}
                    style={{ 
                      textDecoration: "none", 
                      color: "black", 
                      width: `${window.innerWidth <= 500 ? "100%" : "30%"}`}}
                  >
                    <div style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      }}>
                      <div style={{ 
                        position: "relative", 
                        cursor: "pointer", 
                        width: `${window.innerWidth <= 500 ? "70%" : "100%"}`
                      }}>
                      <img
                        alt={items?.title}
                        src={items?.thumbnail[0]?.url}
                        height={`${window.innerWidth <= 500 ? "200px" : "112px"}`}
                        width="100%"
                        style={{ borderRadius: "10px" }}
                      ></img>
                        <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "30%",
                          bottom: "0",
                          color: "white",
                          fontSize: "14px",
                          background: "rgba(0, 0, 0, 0.5)",
                          borderRadius: "8px",
                          pointerEvents: "none",
                          marginBottom: "0.3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MdOutlinePlaylistPlay
                          color="white"
                          fontSize={24}
                          style={{ marginRight: "2%" }}
                        />
                        <p style={{ marginRight: "2%", fontWeight: "550" }}>
                          {items?.videoCount}
                        </p>
                      </div>
                      </div>
                    </div>
                  </Link>
                  <Link  to={`/Playlist/${items?.videoId}/${0}/${
                              items?.playlistId
                            }`}
                    style={{ 
                      textDecoration: "none", 
                      color: "black", 
                      width: `${window.innerWidth <= 500 ? "100%" : "70%"}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                      justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                }}>
                  <div
                    style={{
                      width: "70%",
                      marginLeft: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ fontSize: "0.8em", marginBottom: "1%", }}>
                      {items?.title?.length >= 50 ? 
                        items?.title?.substring(0, 50) + "..." : 
                        items?.title}
                    </p>
                    <p style={{ fontSize: "0.8em", marginBottom: "1%" }}>
                      {Data?.data?.meta?.title}
                    </p>
                  </div>
                  </Link>
                </div>
                              )
                            }
                        return null ;    
                      })}
                    </div>    

                      <div 
                      id={`Mobile-Buttton-${index}`}
                      onClick={() => {
                        console.log("cliquer");
                        console.log("button", button);
                        setExpandedItems([element?.title]);
                        button.remove();
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <MdKeyboardArrowDown fontSize={22}/>
                      </div>
                  </div>
              )
            }
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "90%",
                    borderTop: "1px solid #D0D3D4",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "3px",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      margin: "2% 0px 3px 0px",
                      fontWeight: "550",
                    }}
                  >
                    {element?.title}
                  </h2>
                  <h4
                    style={{
                      margin: "0px 0px 2% 0px",
                      width: "100%",
                      fontWeight: "400",
                    }}
                  >
                    {element?.subtitle}
                  </h4>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      marginBottom: "3%",
                    }}
                  >
                    <CardCaroussel value={value}>
                      {element?.data.map((items, playlistindex) => {
                        return (
                          <Link
                            to={`/Playlist/${items?.videoId}/${0}/${
                              items?.playlistId
                            }`}
                            style={{ textDecoration: "none", color: "black" }}
                            key={playlistindex}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                width: `${WidthVideos}`,
                                marginLeft: `${marginLeft}`,
                                marginRight: `${MarginRight}`,
                                border: "1px solid transparent",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  width: `${WidthVideos}`,
                                }}
                              >
                                <div
                                  id={`Card-Playlist-${index}`}
                                  onMouseOver={() => setSelect(items?.title)}
                                  onMouseLeave={() => setSelect(-1)}
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <img
                                    width="100%"
                                    height="160px"
                                    style={{ borderRadius: "5%" }}
                                    alt={items?.title}
                                    src={items?.thumbnail[0]?.url}
                                  ></img>
                                  {select === items?.title ? (
                                    <div
                                      style={{
                                        width: "100%",
                                        height: "98%",
                                        bottom: "0",
                                        borderRadius: "5%",
                                        marginBottom: "0.3rem",
                                        position: "absolute",
                                        background: "rgba(0, 0, 0, 0.7)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                      }}
                                    >
                                      <BsPlayFill fontSize={40} />
                                      <p
                                        style={{
                                          fontWeight: "550",
                                          fontSize: "1.1em",
                                        }}
                                      >
                                        TOUT LIRE
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
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
                                    {items?.videoCount} vidéos
                                  </p>
                                </div>
                              </div>
                              <h6
                                style={{
                                  fontWeight: "600",
                                  width: "100%",
                                  fontSize: "18px",
                                  marginBottom: "3%",
                                }}
                              >
                                {items?.title?.length >= 63
                                  ? items?.title?.substring(0, 63) + "..."
                                  : items?.title}
                              </h6>
                              <p>{items?.subtitle}</p>
                              <p
                                style={{
                                  MarginLeft: "5px",
                                  marginRight: "5px",
                                  fontWeight: "600",
                                }}
                              >
                                Afficher la playlist complète
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </CardCaroussel>
                  </div>
                </div>
              </div>
            );
          }
          if (element?.type === "player") {
            if (responsive && ChannelHome) {
              return null;
            }
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  height: "250px",
                  marginBottom: "2%",
                }}
              >
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${element?.videoId}`}
                  className="react-player ShortPlayer"
                  controls
                  width={"500px"}
                  height={"100%"}
                />
                <div
                  style={{
                    width: "55%",
                    border: "1px solid transparent",
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <h5>
                    {element?.title.length >= 70
                      ? element?.description.substring(0, 70) + "..."
                      : element?.title}
                  </h5>
                  <div className="ContenuNumero5">
                    <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
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
                  <p style={{ width: "100%", marginBottom: "1%" }}>
                    {element?.description.length >= 310
                      ? element?.description.substring(0, 310) + "..."
                      : element?.description}
                  </p>
                  <Link
                    to={`/watch/${element?.videoId}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "100%",
                    }}
                  >
                    <button
                      className="mouseOver"
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        fontWeight: "550",
                      }}
                    >
                      LIRE LA SUITE
                    </button>
                  </Link>
                </div>
              </div>
            );
          }
          if (element?.type === "playlist") {
            if (responsive && ChannelHome) {
              return (
                    <div key={index}
                        style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}>
                  <div
                  style={{ 
                    height: `${window.innerWidth <= 500 ? "auto" : "112px"}`,
                    border: "1px solid transparent",
                    display: "flex",
                    width: "100%",
                    flexDirection: `${window.innerWidth <= 500 ? "column" : "row"}`,
                    alignItems: "flex-start",
                    justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                    flexWrap: `${window.innerWidth <= 500 ? "wrap" : "nowrap"}`,
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
                      width: `${window.innerWidth <= 500 ? "100%" : "30%"}`}}
                  >
                    <div style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      }}>
                      <div style={{ 
                        position: "relative", 
                        cursor: "pointer", 
                        width: `${window.innerWidth <= 500 ? "90%" : "100%"}`
                      }}>
                      <img
                        alt={element?.title}
                        src={element?.thumbnail[0]?.url}
                        height={`${window.innerWidth <= 500 ? "200px" : "112px"}`}
                        width="100%"
                        style={{ borderRadius: "10px" }}
                      ></img>
                        <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "30%",
                          bottom: "0",
                          color: "white",
                          fontSize: "14px",
                          background: "rgba(0, 0, 0, 0.5)",
                          borderRadius: "8px",
                          pointerEvents: "none",
                          marginBottom: "0.3rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MdOutlinePlaylistPlay
                          color="white"
                          fontSize={24}
                          style={{ marginRight: "2%" }}
                        />
                        <p style={{ marginRight: "2%", fontWeight: "550" }}>
                          {element?.videoCount}
                        </p>
                      </div>
                      </div>
                    </div>
                  </Link>
                  <Link  to={`/Playlist/${element?.videoId}/${0}/${
                              element?.playlistId
                            }`}
                    style={{ 
                      textDecoration: "none", 
                      color: "black", 
                      width: `${window.innerWidth <= 500 ? "100%" : "70%"}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                      justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                }}>
                  <div
                    style={{
                      width: "90%",
                      marginLeft: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ fontSize: "0.8em", marginBottom: "1%", }}>
                      {element?.title?.length >= 50 ? 
                        element?.title?.substring(0, 50) + "..." : 
                        element?.title}
                    </p>
                    <p style={{ fontSize: "0.8em", marginBottom: "1%" }}>
                      {Data?.data?.meta?.title}
                    </p>
                  </div>
                  </Link>
                </div>
                 
                    </div>    
              )
            }
            return (
              <Link
                to={`/Playlist/${element?.videoId}/${0}/${element?.playlistId}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: `${WidthVideos}`,
                  marginRight: `${MarginRight}`,
                  marginLeft: `${marginLeft}`,
                  marginBottom: "3%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                  onMouseOver={() => setSelect(element?.title)}
                  onMouseLeave={() => setSelect(-1)}
                >
                  <div style={{ position: "relative", width: "100%" }}>
                    <img
                      width="100%"
                      height="160px"
                      style={{ borderRadius: "5%" }}
                      alt={element?.title}
                      src={element?.thumbnail[0]?.url}
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
                    {select === element?.title ? (
                      <div
                        style={{
                          width: "100%",
                          height: "98%",
                          bottom: "0",
                          borderRadius: "5%",
                          marginBottom: "0.3rem",
                          position: "absolute",
                          background: "rgba(0, 0, 0, 0.7)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        <BsPlayFill fontSize={40} />
                        <p style={{ fontWeight: "550", fontSize: "1.1em" }}>
                          TOUT LIRE
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <h6
                    style={{
                      fontWeight: "600",
                      width: "100%",
                      fontSize: "18px",
                      marginBottom: "3%",
                    }}
                  >
                    {element?.title?.length >= 63
                      ? element?.title?.substring(0, 63) + "..."
                      : element?.title}
                  </h6>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "nowrap",
                      width: "100%",
                      fontWeight: "600",
                      fontSize: "0.9em",
                    }}
                  >
                    <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                      Afficher la playlist compléte
                    </p>
                  </div>
                </div>
              </Link>
            );
          }
          if (element?.type === "channel") {
            if (responsive && ChannelHome) {
              return (
                <Link  to={`/Channel/${element?.channelId}`}
                key={index}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}>
                  <div 
                      style={{
                        width: "100%",
                        height: `${window.innerWidth <= 500 ? "auto" : "115px"}`,
                        display:"flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: `${window.innerWidth <= 500 ? "column" : "row"}`,
                        flexWrap: "nowrap",
                        marginBottom: `${window.innerWidth <= 500 ? "9%" : "1%"}`
                      }}
                  >
                      <div style={{
                          width: `${window.innerWidth <= 500 ? "100%" : "30%"}`,
                          height: "100%",
                          display :"flex",
                          alignItems: "center",
                          justifyContent: "center",
                      }}>
                          <img
                      alt={element?.title}
                      width="80px"
                      height="80px"
                      style={{ borderRadius: "50%" }}
                      src={`${
                        element?.thumbnail[1]?.url.includes("https:")
                          ? element?.thumbnail[1]?.url
                          : "https:" + element?.thumbnail[1]?.url
                      }`}
                    ></img>
                    </div>
                    <div style={{
                      width: `${window.innerWidth <= 500 ? "100%" : "70%"}`,
                      height: "100%",
                      display: "flex",
                      alignItems: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                      justifyContent: `${window.innerWidth <= 500 ? "center" : "flex-start"}`,
                      flexDirection: "column", 
                  }}>
                    <h3 style={{
                      fontWeight: "550", 
                      fontSize: "1.2em",
                    }}>
                        {element?.title}
                      </h3>
                    <p style={{ 
                      fontSize: "1em",
                    }}>
                        {element?.subscriberCount}
                    </p>
                  </div>
                  </div>
                </Link> 
              )
            }
            return (
              <Link
                to={`/Channel/${element?.channelId}`}
                key={index}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "20%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    cursor: "pointer",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "45vh",
                  }}
                >
                  <div style={{ width: "50%", marginBottom: "1%" }}>
                    <img
                      alt={element?.title}
                      width={"100%"}
                      style={{ borderRadius: "50%" }}
                      src={`${
                        element?.thumbnail[1]?.url.includes("https:")
                          ? element?.thumbnail[1]?.url
                          : "https:" + element?.thumbnail[1]?.url
                      }`}
                    ></img>
                  </div>
                  <h4 style={{ marginBottom: "1%" }}>{element?.title}</h4>
                  <p style={{ marginBottom: "8%" }}>
                    {element?.subscriberCount}
                  </p>
                  <button
                    style={{
                      border: "none",
                      fontSize: "16px",
                      padding: "1vw",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#efeff1",
                      borderRadius: "30px",
                      fontWeight: "550",
                      height: "15%",
                    }}
                  >
                    S'abonner
                  </button>
                </div>
              </Link>
            );
          }
          return null;
        })
      )}
    </>
  );
};

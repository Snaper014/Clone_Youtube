import * as React from "react";
import "../../App.css";
import { CardCaroussel } from "../Carsoussel";
import { IoIosRadio } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";

export const NewSearchs = ({
  data,
  value,
  WidthShorts,
  marginLeft,
  MarginRight,
  WidthScreen,
}) => {
  const [select, setSelect] = React.useState(-1);

  return (
    <>
      {!data ? (
        <div style={{ width: "100%" }}>chargement...</div>
      ) : (
        data?.data?.data.map((element, index) => {
          if (element?.type === "channel") {
            if (element?.channelId === null) {
              return null;
            }

            if (WidthScreen <= 1024) {
              return (
                <Link
                  to={`/Channel/${element?.channelId}`}
                  key={index}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid transparent",
                      display: "flex",
                      flexDirection: `${WidthScreen <= 500 ? "column" : "row"}`,
                      height: `${WidthScreen <= 500 ? "auto" : "112px"}`,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      marginBottom: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "2%",
                        width: `${WidthScreen <= 500 ? "100%" : "200px"}`,
                        height: `${WidthScreen <= 500 ? "auto" : "112px"}`,
                      }}
                    >
                      <img
                        style={{ borderRadius: "50%" }}
                        alt={element?.title}
                        src={
                          element?.thumbnail[1]?.url.includes("https:")
                            ? element?.thumbnail[1]?.url
                            : `https:${element?.thumbnail[1]?.url}`
                        }
                        width="100px"
                        height="100px"
                      ></img>
                    </div>
                    <div
                      style={{
                        width: `${WidthScreen <= 500 ? "100%" : "auto"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p style={{ fontSize: "0.9em", marginBottom: "1%" }}>
                          {element?.title}
                        </p>
                        <div
                          style={{
                            marginBottom: "2%",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <p style={{ fontSize: "0.9em" }}>
                            {element?.channelTitle}
                          </p>
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
                            height: "45px",
                            width: "115px",
                            fontWeight: "550",
                            textAlign: "center",
                            borderRadius: "30px",
                          }}
                        >
                          S'abonner
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
            return (
              <Link
                to={`/Channel/${element?.channelId}`}
                key={index}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
                }}
              >
                <div className="SearchContainer">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "450px",
                      height: "250px",
                    }}
                  >
                    <img
                      style={{ borderRadius: "50%" }}
                      alt={element?.title}
                      src={
                        element?.thumbnail[1]?.url.includes("https:")
                          ? element?.thumbnail[1]?.url
                          : `https:${element?.thumbnail[1]?.url}`
                      }
                      width="176"
                      height="176"
                    ></img>
                  </div>
                  <div
                    style={{
                      marginLeft: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ fontSize: "20px", marginBottom: "1%" }}>
                      {element?.title}
                    </p>
                    <div
                      style={{
                        marginBottom: "2%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <p>{element?.channelTitle}</p>
                    </div>
                    <p>{element?.description}</p>
                  </div>
                </div>
              </Link>
            );
          }
          if (element?.type === "video") {
            if (element?.channelId === null) {
              return null;
            }
            if (WidthScreen <= 930) {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
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
                    to={`/watch/${element?.videoId}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: `100%`,
                    }}
                  >
                    <div style={{ position: "relative", cursor: "pointer" }}>
                      <img
                        alt={element?.title}
                        src={element?.thumbnail[0]?.url}
                        height={`${WidthScreen * 0.56}px`}
                        width="100%"
                        style={{ borderRadius: "10px" }}
                      ></img>
                      <div
                        style={{ margin: "0.3em" }}
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
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "15% 85%",
                    }}
                  >
                    <Link
                      to={`/Channel/${element?.channelId}`}
                      key={index}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        width: "100%",
                        display: "flex",
                        marginLeft: "2%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "50%",
                        }}
                        width="40px"
                        height="40px"
                        src={element?.channelThumbnail[0]?.url}
                        alt={element?.title}
                      ></img>
                    </Link>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <h3 style={{ fontSize: "1em", marginBottom: "1%" }}>
                        {WidthScreen <= 400
                          ? element?.title.substring(0, 35) + "..."
                          : element?.title}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          marginBottom: "2vh",
                          marginTop: "3px",
                          whiteSpace: "nowrap",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          width: "100%",
                          fontSize: "1em",
                        }}
                      >
                        {element?.viewCount === "" && null}
                        {element?.lengthText === "EN DIRECT" && (
                          <p
                            style={{
                              MarginLeft: "5px",
                              marginRight: "5px",
                              fontSize: "1em",
                            }}
                          >
                            {element?.viewCount} spectateurs
                          </p>
                        )}
                        {element?.viewCount !== "" &&
                          element?.lengthText !== "EN DIRECT" && (
                            <>
                              <p
                                style={{
                                  MarginLeft: "5px",
                                  marginRight: "5px",
                                  fontSize: "1em",
                                }}
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
                              <p style={{ fontSize: "1em" }}>
                                {element?.publishedTimeText}
                              </p>
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (WidthScreen > 931 && WidthScreen <= 1024) {
              return (
                <div
                  key={index}
                  className="SearchContainer"
                  style={{ height: "112px" }}
                >
                  <Link
                    to={`/watch/${element?.videoId}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div style={{ position: "relative", cursor: "pointer" }}>
                      <img
                        alt={element?.title}
                        src={element?.thumbnail[0]?.url}
                        height="112px"
                        width="200px"
                        style={{ borderRadius: "10px" }}
                      ></img>
                      <div
                        style={{ height: "15%", margin: "0.3em" }}
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
                  <div
                    style={{
                      marginLeft: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ fontSize: "0.9em", marginBottom: "1%" }}>
                      {element?.title}
                    </p>
                    <div className="ContenuHomedescripVide">
                      {element?.viewCount === "" && null}
                      {element?.lengthText === "EN DIRECT" && (
                        <p
                          style={{
                            MarginLeft: "5px",
                            marginRight: "5px",
                            fontSize: "0.6em",
                          }}
                        >
                          {element?.viewCount} spectateurs
                        </p>
                      )}
                      {element?.viewCount !== "" &&
                        element?.lengthText !== "EN DIRECT" && (
                          <>
                            <p
                              style={{
                                MarginLeft: "5px",
                                marginRight: "5px",
                                fontSize: "0.6em",
                              }}
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
                            <p style={{ fontSize: "0.6em" }}>
                              {element?.publishedTimeText}
                            </p>
                          </>
                        )}
                    </div>
                    <Link
                      to={`/Channel/${element?.channelId}`}
                      key={index}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={element?.channelThumbnail[0]?.url}
                          alt={element?.title}
                        ></img>
                      </div>
                    </Link>
                  </div>
                </div>
              );
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
                          ? ""
                          : "IndicatorView"
                      }`}
                    >
                      <p style={{ margin: "0.3em", fontWeight: "600" }}>
                        {element?.lengthText === "EN DIRECT"
                          ? ""
                          : element?.lengthText}
                      </p>
                    </div>
                  </div>
                </Link>
                <div
                  style={{
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <p style={{ fontSize: "20px", marginBottom: "1%" }}>
                    {element?.title}
                  </p>
                  <div className="ContenuHomedescripVide">
                    {element?.viewCount === "" && null}
                    {element?.lengthText === "EN DIRECT" && (
                      <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                        {element?.viewCount} spectateurs
                      </p>
                    )}
                    {element?.viewCount !== "" &&
                      element?.lengthText !== "EN DIRECT" && (
                        <>
                          <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
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
                    to={`/Channel/${element?.channelId}`}
                    key={index}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                        src={element?.channelThumbnail[0]?.url}
                        alt={element?.title}
                      ></img>
                      <p style={{ whiteSpace: "nowrap" }}>
                        {element?.channelTitle}
                      </p>
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
                      EN DIRECT
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
          if (element?.type === "shorts_listing") {
            return (
              <div
                key={index}
                className="ContainerSearchShorts"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  marginBottom: "25px",
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
                    width: "100%",
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
                    mobile={WidthScreen <= 1024 ? true : false}
                  >
                    {element?.data.map((items, i) => (
                      <Link
                        to={`/List/Shorts/${items.videoId}`}
                        style={{ textDecoration: "none", color: "black" }}
                        key={i}
                        onClick={() => {
                          const filteredData = element?.data.map(
                            (item) => item?.videoId,
                          );
                          localStorage.setItem(
                            "shorts",
                            JSON.stringify(filteredData),
                          );
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            flexWrap: "nowrap",
                            width: `${WidthShorts}px`,
                            marginLeft: `${marginLeft}px`,
                            marginRight: `${MarginRight}px`,
                            cursor: "pointer",
                          }}
                        >
                          <img
                            style={{ borderRadius: "10px" }}
                            alt={items?.title}
                            src={items?.thumbnail[0]?.url}
                            width={`${WidthShorts}px`}
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
            );
          }
          if (element?.type === "playlist") {
            if (WidthScreen <= 930) {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
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
                      width: `100%`,
                    }}
                  >
                    <div style={{ position: "relative", cursor: "pointer" }}>
                      <img
                        alt={element?.title}
                        src={element?.thumbnail[1]?.url}
                        height={`${WidthScreen * 0.56}px`}
                        width="100%"
                        style={{ borderRadius: "10px" }}
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
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "15% 85%",
                    }}
                  >
                    <Link
                      to={`/Channel/${element?.channelId}`}
                      key={index}
                      style={{
                        textDecoration: "none",
                        color: "black",
                        width: "100%",
                        display: "flex",
                        marginLeft: "2%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{
                          borderRadius: "50%",
                        }}
                        width="40px"
                        height="40px"
                        src={element?.thumbnail[0]?.url}
                        alt={element?.title}
                      ></img>
                    </Link>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <p style={{ fontSize: "0.6em", marginBottom: "1%" }}>
                        {WidthScreen <= 300
                          ? element?.title.substring(0, 25) + "..."
                          : element?.title}
                      </p>
                      <p style={{ fontSize: "0.6em" }}>
                        {element?.channelTitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            if (WidthScreen > 931 && WidthScreen <= 1024) {
              return (
                <div
                  key={index}
                  className="SearchContainer"
                  style={{ height: "112px" }}
                >
                  <Link
                    to={`/Playlist/${element?.videoId}/${0}/${
                      element?.playlistId
                    }`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div style={{ position: "relative", cursor: "pointer" }}>
                      <img
                        alt={element?.title}
                        src={element?.thumbnail[0]?.url}
                        height="112px"
                        width="200px"
                        style={{ borderRadius: "10px" }}
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
                  <div
                    style={{
                      marginLeft: "2%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <p style={{ fontSize: "0.6em", marginBottom: "1%" }}>
                      {element?.title}
                    </p>
                    <p style={{ fontSize: "0.6em", marginBottom: "2%" }}>
                      {element?.channelTitle}
                    </p>
                    <Link
                      to={`/Channel/${element?.channelId}`}
                      key={index}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                          src={element?.thumbnail[0]?.url}
                          alt={element?.title}
                        ></img>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            }
            return (
              <div key={index} className="SearchContainer">
                <Link
                  to={`/Playlist/${element?.videoId}/${0}/${
                    element?.playlistId
                  }`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "450px",
                    height: "250px",
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
                        width="450px"
                        height="250px"
                        style={{ borderRadius: "10px" }}
                        alt={element?.title}
                        src={element?.thumbnail[1]?.url}
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
                  </div>
                </Link>
                <div
                  style={{
                    marginLeft: "2%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6
                    style={{
                      fontWeight: "600",
                      width: "100%",
                      fontSize: "18px",
                    }}
                  >
                    {element?.title?.length >= 63
                      ? element?.title?.substring(0, 63) + "..."
                      : element?.title}
                  </h6>
                  <p style={{ marginBottom: "3%" }}>{element?.subtitle}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginBottom: "4%",
                    }}
                  >
                    {element?.videos.map((items, i) => {
                      return (
                        <Link
                          key={i}
                          to={`/Playlist/${element?.videoId}/${i}/${element?.playlistId}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                              marginBottom: "2%",
                            }}
                          >
                            <p>{items?.title}</p>
                            <div
                              style={{
                                display: "flex",
                                alignSelf: "center",
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                backgroundColor: "black",
                                marginRight: "10px",
                                marginLeft: "10px",
                              }}
                            ></div>
                            <p>{items?.lengthText}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

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
                    <Link
                      to={`/Playlist/${element?.videoId}/${0}/${
                        element?.playlistId
                      }`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                        Afficher la playlist compléte
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })
      )}
    </>
  );
};

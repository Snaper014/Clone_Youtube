import * as React from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
import { IoIosRadio } from "react-icons/io";

export const ElementsVideos = ({
  Data,
  element,
  index,
  ChannelHome,
  responsive,
  LogochannelThumbnail,
  MarginRight,
  marginLeft,
  WidthVideos,
}) => {
  if (ChannelHome) {
    if (responsive) {
      return (
        <div
          key={index}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1%",
            }}
          >
            <img
              alt={element?.title}
              src={element?.thumbnail[0]?.url}
              height={`${window.innerHeight * 0.3}px`}
              width="95%"
              style={{ borderRadius: "10px" }}
            ></img>
          </div>
          <h3
            style={{
              fontWeight: "400",
              fontSize: "1em",
              marginBottom: "1%",
              width: "100%",
            }}
          >
            {element?.title}
          </h3>
        </div>
      );
    }
    return (
      <div key={index} className="SearchContainer">
        <Link
          to={`/watch/${element?.videoId}`}
          style={{
            textDecoration: "none",
            color: "black",
            width: "450px",
            height: "250px",
          }}
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
          <h3
            style={{
              fontSize: "20px",
              marginBottom: "1%",
              fontWeight: "400",
            }}
          >
            {element?.title}
          </h3>
          <div
            className="ContenuHomedescripVide"
            style={{
              whiteSpace: `${window.screen <= 300 ? "wrap" : "nowrap"}`,
            }}
          >
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
            to={`/Channel/${Data?.data?.meta?.channelId}`}
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
          {!element?.badges || element?.lengthText === "EN DIRECT" ? null : (
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
        marginRight: `${window.innerWidth <= 767 ? "0px" : `${MarginRight}px`}`,
        marginLeft: `${window.innerWidth <= 767 ? "0px" : `${marginLeft}px`}`,
        width: `${WidthVideos}px`,
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
            width={`${WidthVideos}px`}
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
              <h3
                style={{ width: "100%", fontSize: "18px", fontWeight: "400" }}
              >
                {element?.channelTitle}
              </h3>
            </Link>
            <Link
              to={`/watch/${element?.videoId}`}
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <div
                className="ContenuHomedescripVide"
                style={{
                  whiteSpace: `${window.screen <= 300 ? "wrap" : "nowrap"}`,
                }}
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
};

import * as React from "react";
import "../../../App.css";
import { Link } from "react-router-dom";

export const ElementChannel = ({ element, index, responsive, ChannelHome }) => {
  if (responsive && ChannelHome) {
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
            height: `${window.innerWidth <= 500 ? "auto" : "115px"}`,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: `${window.innerWidth <= 500 ? "column" : "row"}`,
            flexWrap: "nowrap",
            marginBottom: `${window.innerWidth <= 500 ? "9%" : "1%"}`,
          }}
        >
          <div
            style={{
              width: `${window.innerWidth <= 500 ? "100%" : "30%"}`,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
          <div
            style={{
              width: `${window.innerWidth <= 500 ? "100%" : "70%"}`,
              height: "100%",
              display: "flex",
              alignItems: `${
                window.innerWidth <= 500 ? "center" : "flex-start"
              }`,
              justifyContent: `${
                window.innerWidth <= 500 ? "center" : "flex-start"
              }`,
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontWeight: "550",
                fontSize: "1.2em",
              }}
            >
              {element?.title}
            </h3>
            <p
              style={{
                fontSize: "1em",
              }}
            >
              {element?.subscriberCount}
            </p>
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
        <p style={{ marginBottom: "8%" }}>{element?.subscriberCount}</p>
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
};

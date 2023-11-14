import * as React from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

export const ElementPlayer = ({ element, responsive, ChannelHome, index }) => {
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
};

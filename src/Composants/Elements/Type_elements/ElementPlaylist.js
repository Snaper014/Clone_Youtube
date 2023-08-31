import * as React from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import { MdOutlinePlaylistPlay } from "react-icons/md";

export const ElementPlaylist = ({
  element,
  index,
  responsive,
  ChannelHome,
  WidthVideos,
  marginLeft,
  MarginRight,
  setSelect,
  select,
  Data,
}) => {
  if (responsive && ChannelHome) {
    return (
      <div
        key={index}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            height: `${window.innerWidth <= 500 ? "auto" : "112px"}`,
            border: "1px solid transparent",
            display: "flex",
            width: "100%",
            flexDirection: `${window.innerWidth <= 500 ? "column" : "row"}`,
            alignItems: "flex-start",
            justifyContent: `${
              window.innerWidth <= 500 ? "center" : "flex-start"
            }`,
            flexWrap: `${window.innerWidth <= 500 ? "wrap" : "nowrap"}`,
            marginBottom: "2%",
          }}
        >
          <Link
            to={`/Playlist/${element?.videoId}/${0}/${element?.playlistId}`}
            style={{
              textDecoration: "none",
              color: "black",
              width: `${window.innerWidth <= 500 ? "100%" : "30%"}`,
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  cursor: "pointer",
                  width: `${window.innerWidth <= 500 ? "90%" : "100%"}`,
                }}
              >
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
          <Link
            to={`/Playlist/${element?.videoId}/${0}/${element?.playlistId}`}
            style={{
              textDecoration: "none",
              color: "black",
              width: `${window.innerWidth <= 500 ? "100%" : "70%"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: `${
                window.innerWidth <= 500 ? "center" : "flex-start"
              }`,
              justifyContent: `${
                window.innerWidth <= 500 ? "center" : "flex-start"
              }`,
            }}
          >
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
              <p style={{ fontSize: "0.8em", marginBottom: "1%" }}>
                {element?.title?.length >= 50
                  ? element?.title?.substring(0, 50) + "..."
                  : element?.title}
              </p>
              <p style={{ fontSize: "0.8em", marginBottom: "1%" }}>
                {Data?.data?.meta?.title}
              </p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <Link
      key={index}
      to={`/Playlist/${element?.videoId}/${0}/${element?.playlistId}`}
      style={{
        textDecoration: "none",
        color: "black",
        width: `${WidthVideos}px`,
        marginRight: `${MarginRight}px`,
        marginLeft: `${marginLeft}px`,
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
              <p style={{ fontWeight: "550", fontSize: "1.1em" }}>TOUT LIRE</p>
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
};

import * as React from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { ConvertlengthSeconds } from "../../utils/utils";
import { ModalLibrary } from "./modals/ModalLibrary";

export const CardBiblio = ({
  type,
  logo,
  data,
  index,
  setPlaylist = "",
  responsive,
}) => {
  const Data = type === "playlist" ? data?.data : data;
  const NewLength =
    type !== "playlist"
      ? data?.filter((items) => items?.typeLike === "dislike")
      : null;
  const Length =
    type === "playlist"
      ? null
      : type === "like"
      ? data?.length
      : NewLength?.length;
  const message =
    type === "playlist"
      ? "Ajoutez des vidéos à la playlist pour ajoutez vos vidéos préférées"
      : "Likez des vidéos pour pouvoir les affichez";

  const Content = ({ items, index }) => {
    return (
      <div
        key={index}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          to={`/watch/${items?.idVideo}`}
          style={{
            textDecoration: "none",
            color: "black",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <div
            style={{
              width: "90%",
              position: "relative",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt={items?.title}
              src={items?.thumbnail}
              height="160px"
              width="100%"
              style={{ borderRadius: "10px" }}
            ></img>
            <div
              className={`${
                items?.lengthSeconds === "EN DIRECT"
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
                {ConvertlengthSeconds(items?.lengthSeconds)}
              </p>
            </div>
          </div>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            alignItems: "center",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <h6
            style={{
              fontWeight: "600",
              width: "85%",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {items?.title?.length >= 50
              ? items?.title?.substring(0, 50) + "..."
              : items?.title}
          </h6>
          <Link
            to={`/Channel/${items?.channelId}`}
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {items?.channelTitle}{" "}
            {items?.verified ? <VscVerifiedFilled /> : null}
          </Link>
          <p
            style={{
              MarginLeft: "5px",
              marginRight: "5px",
            }}
          >
            {items?.viewCount} vues
          </p>
        </div>
      </div>
    );
  };
  return (
    <div
      key={index}
      style={{
        width: `${
          responsive <= 1024 ? `${responsive <= 700 ? "85%" : "45%"}` : "450px"
        }`,
        border: "1px solid black",
        borderRadius: "8px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {type === "playlist" ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: `${responsive <= 450 ? "column" : "row"}`,
            flexWrap: "nowrap",
          }}
        >
          <h2 style={{ margin: "7px", width: "85%", textAlign: "center" }}>
            {data?.titlePlaylist}
          </h2>
          <div
            style={{
              width: `${responsive <= 500 ? "100%" : "15%"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ModalLibrary
              data={data}
              setPlaylist={setPlaylist}
              type={type}
              responsive={responsive}
            />
          </div>
        </div>
      ) : (
        <h2
          style={{
            margin: "7px",
            textAlign: "center",
          }}
        >
          {logo} Vidéos {type === "dislike" ? "Négative" : "J'aime"} {Length}
        </h2>
      )}

      {type === "playlist" ? (
        <p style={{ margin: "7px" }}>
          {data?.description.substring(0, 150) + "..."}
        </p>
      ) : null}

      {!Data?.length ? (
        <p style={{ fontSize: "1em" }}>{message}</p>
      ) : (
        Data.map((items, index) => {
          if (type === "playlist") {
            return <Content key={index} index={index} items={items} />;
          } else {
            if (items?.typeLike === type) {
              return <Content key={index} index={index} items={items} />;
            } else return null;
          }
        })
      )}
    </div>
  );
};

import * as React from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
import { CardCaroussel } from "../../Carsoussel";
import { BsPlayFill } from "react-icons/bs";
import { MdOutlinePlaylistPlay, MdKeyboardArrowDown } from "react-icons/md";

export const ListingPlaylist = ({
  element,
  index,
  WidthVideos,
  expandedItems,
  ChannelHome,
  setExpandedItems,
  Data,
  setSelect,
  select,
  value,
  responsive,
  MarginRight,
  marginLeft,
}) => {
  if (element?.title === "Recommandations personnalisées") {
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
        }}
      >
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
        <p
          style={{
            width: "100%",
            fontSize: "0.8em",
            marginBottom: "2%",
          }}
        >
          {element?.subtitle?.length >= 140
            ? element?.subtitle?.substring(0, 140) + "..."
            : element?.subtitle}
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {element?.data.map((items, i) => {
            if (
              expandedItems.includes(element?.title)
                ? element?.data?.length
                : button
                ? i < 3
                : element?.data?.length
            ) {
              return (
                <div
                  key={i}
                  style={{
                    height: `${window.innerWidth <= 500 ? "auto" : "112px"}`,
                    border: "1px solid transparent",
                    display: "flex",
                    width: "100%",
                    flexDirection: `${
                      window.innerWidth <= 500 ? "column" : "row"
                    }`,
                    alignItems: "flex-start",
                    justifyContent: `${
                      window.innerWidth <= 500 ? "center" : "flex-start"
                    }`,
                    flexWrap: `${window.innerWidth <= 500 ? "wrap" : "nowrap"}`,
                    marginBottom: "2%",
                  }}
                >
                  <Link
                    to={`/Playlist/${items?.videoId}/${0}/${items?.playlistId}`}
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
                          width: `${window.innerWidth <= 500 ? "70%" : "100%"}`,
                        }}
                      >
                        <img
                          alt={items?.title}
                          src={items?.thumbnail[0]?.url}
                          height={`${
                            window.innerWidth <= 500 ? "200px" : "112px"
                          }`}
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
                          <p
                            style={{
                              marginRight: "2%",
                              fontWeight: "550",
                            }}
                          >
                            {items?.videoCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={`/Playlist/${items?.videoId}/${0}/${items?.playlistId}`}
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
                        width: "70%",
                        marginLeft: "2%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.8em",
                          marginBottom: "1%",
                        }}
                      >
                        {items?.title?.length >= 50
                          ? items?.title?.substring(0, 50) + "..."
                          : items?.title}
                      </p>
                      <p
                        style={{
                          fontSize: "0.8em",
                          marginBottom: "1%",
                        }}
                      >
                        {Data?.data?.meta?.title}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            }
            return null;
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
          }}
        >
          <MdKeyboardArrowDown fontSize={22} />
        </div>
      </div>
    );
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
                  to={`/Playlist/${items?.videoId}/${0}/${items?.playlistId}`}
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
};

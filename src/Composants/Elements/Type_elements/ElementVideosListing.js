import * as React from "react";
import "../../../App.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CardCaroussel } from "../../Carsoussel";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MoreContent } from "../../../utils/utils";
import { Link } from "react-router-dom";

export const ListingVideos = ({
  element,
  index,
  responsive,
  ChannelHome,
  HasCaroussel,
  expandedItems,
  Data,
  setExpandedItems,
  value,
  WidthVideos,
  marginLeft,
  MarginRight,
  LogochannelThumbnail,
}) => {
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
                ? i <= element?.data?.length
                : i < 3
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
                    to={`/watch/${items?.videoId}`}
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
                          style={{ height: "15%", margin: "0.3em" }}
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
                            {items?.lengthText === "EN DIRECT"
                              ? "EN DIRECT"
                              : items?.lengthText}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={`/watch/${items?.videoId}`}
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
                      <div
                        className="ContenuHomedescripVide"
                        style={{
                          whiteSpace: `${
                            window.screen <= 300 ? "wrap" : "nowrap"
                          }`,
                        }}
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
            setExpandedItems([...expandedItems, element?.title]);
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
            {element?.subtitle?.length >= 350
              ? element?.subtitle.substring(0, 350) + "..."
              : element?.subtitle}
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
                      width: `${WidthVideos}px`,
                      marginLeft: `${marginLeft}px`,
                      marginRight: `${MarginRight}px`,
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
                          width={`${WidthVideos}px`}
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
                                fontSize: "1.2em",
                              }}
                            >
                              {items?.title.length >= 40
                                ? items?.title?.substring(0, 40) + "..."
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
                              <div
                                className="ContenuHomedescripVide"
                                style={{ fontSize: "0.8em" }}
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
  if (window.innerWidth >= 1025) {
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
            margin: `2% 0px ${element?.subtitle !== null ? "3px" : "2%"} 0px`,
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
          className="MoreVideos"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
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
                  width: `${WidthVideos}px`,
                  marginLeft: `${marginLeft}px`,
                  marginRight: `${MarginRight}px`,
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
                      width={`${WidthVideos}px`}
                      style={{ borderRadius: "10px" }}
                    ></img>
                    <div
                      className={`${
                        items?.lengthText === "EN DIRECT"
                          ? "IndicatorLive"
                          : "IndicatorView"
                      }`}
                    >
                      <p style={{ margin: "0.3em", fontWeight: "600" }}>
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
                  <div
                    style={{ width: `${LogochannelThumbnail ? "20%" : "0%"}` }}
                  >
                    {LogochannelThumbnail ? (
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
                    ) : null}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: `${LogochannelThumbnail ? "80%" : "100%"}`,
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
                      {LogochannelThumbnail ? (
                        <Link
                          to={`/Channel/${items?.channelId}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                        >
                          <p style={{ width: "100%", fontSize: "18px" }}>
                            {items?.channelTitle}
                          </p>
                        </Link>
                      ) : null}
                      {items?.lengthText !== "EN DIRECT" ? (
                        <Link
                          to={`/watch/${items?.videoId}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            width: "100%",
                          }}
                        >
                          <div
                            className="ContenuHomedescripVide"
                            style={{
                              whiteSpace: `${
                                window.screen <= 300 ? "wrap" : "nowrap"
                              }`,
                            }}
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
};

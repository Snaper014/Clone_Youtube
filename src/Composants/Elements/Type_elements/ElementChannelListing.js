import * as React from "react";
import "../../../App.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CardCaroussel } from "../../Carsoussel";
import { Link } from "react-router-dom";

export const ListingChannel = ({
  element,
  responsive,
  ChannelHome,
  index,
  expandedItems,
  setExpandedItems,
  WidthVideos,
  marginLeft,
  MarginRight,
  value,
}) => {
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
                    to={`/Channel/${items?.channelId}`}
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
                      <img
                        alt={items?.title}
                        src={`${
                          items?.thumbnail[1]?.url.includes("https:")
                            ? items?.thumbnail[1]?.url
                            : "https:" + items?.thumbnail[1]?.url
                        }`}
                        height={`100px`}
                        width={`100px`}
                        style={{ borderRadius: "50%" }}
                      ></img>
                    </div>
                  </Link>
                  <Link
                    to={`/Channel/${items?.channelId}`}
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
                        width: "100%",
                        marginLeft: "2%",
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
              );
            }
            return null;
          })}
        </div>
        <div
          id={`Mobile-Buttton-${index}`}
          onClick={() => {
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
                    <h4 style={{ marginBottom: "1%" }}>{items?.title}</h4>
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
};

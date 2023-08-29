import * as React from "react";
import "../../../App.css";
import { Link } from "react-router-dom";
import { CardCaroussel } from "../../Carsoussel";
import { MoreContent } from "../../../utils/utils";
import { MdKeyboardArrowDown } from "react-icons/md";

export const ListingShorts = ({
  element,
  index,
  value,
  WidthShorts,
  responsive,
  MarginRight,
  marginLeft,
  setOption,
  setDataContext,
  HasCaroussel,
}) => {
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
  if (HasCaroussel) {
    return (
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
          <CardCaroussel value={value} shorts>
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
    );
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
                height={`${window.innerWidth <= 550 ? "250px" : "465px"}`}
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
};

import * as React from "react";
import "../App.css";
import { CardCaroussel } from "../Composants/Carsoussel";
import { IoIosRadio } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AppBarSecondary } from "../Composants/AppBarSecondary";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../Composants/FallbackError";
import { BarSearch } from "../Composants/AppBarPrimary";
import { useQuery } from "@tanstack/react-query";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchTrends } from "./Appel";

export const ButtonNaviguation = ({
  route,
  texte,
  logo,
  width = "80%",
  height = "13vh",
}) => {
  return (
    <Link
      to={`${route}`}
      className="HoverColorGray"
      style={{
        textDecoration: "none",
        color: "black",
        height: `${height}`,
        display: "flex",
        borderRadius: "10px",
        width: `${width}`,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {logo}
        <p>{texte}</p>
      </div>
    </Link>
  );
};
export const ButtonNavPrimaryOne = ({
  route,
  logo,
  texte,
  width = "100%",
  height = "auto",
}) => {
  return (
    <Link
      to={`${route}`}
      style={{
        textDecoration: "none",
        color: "black",
        width: "75%",
        cursor: "pointer",
        margin: `${
          texte === "Historique" ? "0vh 2vw 3vh 2vw" : "0vh 2vw 0vh 2vw"
        }`,
      }}
    >
      <div
        className="HoverColorGray"
        style={{
          display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: `${width}`,
          fontSize: "18px",
          height: `${height}`,
          border: "1px solid transparent",
        }}
      >
        {logo}
        <p>{texte}</p>
      </div>
    </Link>
  );
};

export const ContentSectionMenu = ({ Logo, title, paragraphe }) => {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />

        <div className="GridP">
          <div>
            <AppBarSecondary />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
              border: "2px solid rgb(0, 255, 149)",
              margin: "3vh 0vh 3vh 0vh",
            }}
          >
            {Logo}
            <h2 style={{ margin: "1%" }}>{title}</h2>
            <p style={{ margin: "1%" }}>{paragraphe}</p>
            <div className="StyleMenuBtnConnecter">
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BiUserCircle fontSize={35} color="#065fd4" />
              </div>
              <p
                style={{
                  color: "#065fd4",
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  alignItems: "center",
                  width: "60%",
                  height: "100%",
                }}
              >
                Se connecter
              </p>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export const MobileResponsive = (setResponsive) => {
  if (window.innerWidth <= 1024) {
    setResponsive(true);
  } else {
    setResponsive(false);
  }
};

export const CheckWidth = (
  ref,
  setWidthVideos,
  setWidthShorts,
  setMarginLeft,
  setMarginRight,
  HasCaroussel = false,
  setValue = 0,
) => {
  let Largeur = window.innerWidth;
  const { width } = ref?.current?.getBoundingClientRect();
  let WidthContainer = width;
  //Width Container with Caroussel
  let WCWC = width * 0.9;
  // console.log("test" , width);
  // console.log("Largeur Fenetre", Largeur);
  // console.log("largeur conteneur", WidthContainer);
  if (HasCaroussel) {
    if (WCWC) {
      if (Largeur <= 1175) {
        let width = WCWC * 0.23;
        console.log(width);
        setWidthVideos(`${width}px`);
        setMarginLeft(`${Math.round(WCWC) * 0.005}px`);
        setMarginRight(`${Math.round(WCWC) * 0.014}px`);
        setValue(4);
      }
      if (Largeur >= 1176 && Largeur <= 1604) {
        let width = WCWC * 0.185;
        console.log(width);
        setWidthVideos(`${width}px`);
        setMarginLeft(`${Math.round(WCWC) * 0.009}px`);
        setMarginRight(`${Math.round(WCWC) * 0.006}px`);
        setValue(5);
      }
      if (Largeur >= 1605) {
        let width = Math.round(WCWC * 0.15);
        console.log(width);
        setWidthVideos(`${width}px`);
        setMarginLeft(`${Math.round(WCWC) * 0.01}px`);
        setMarginRight(`${Math.round(WCWC) * 0.006}px`);
        setValue(6);
      }
    }
  } else {
    if (WidthContainer) {
      if (Largeur <= 767) {
        // console.log("Sous les 767 pixels", WidthContainer);
        let WidthShorts = WidthContainer * 0.45;
        setWidthVideos(`${WidthContainer * 0.993}px`);
        setWidthShorts(`${WidthShorts}px`);
        setMarginLeft(`${WidthContainer * 0.05}px`);
        setMarginRight(`${WidthContainer * 0.015}px`);
        setValue(2);
      }
      if (Largeur >= 768 && Largeur <= 1115) {
        let width = WidthContainer * 0.46;
        let WidthShorts = WidthContainer * 0.3;
        // console.log("Largeur comprise entre 768px et 1115px", WidthContainer);
        setWidthVideos(`${width}px`);
        setWidthShorts(`${WidthShorts}px`);
        setMarginLeft(`${Math.round(WidthContainer) * 0.014}px`);
        setMarginRight(`${Math.round(WidthContainer) * 0.023}px`);
        setValue(3);
      }
      if (Largeur >= 1116 && Largeur <= 1603) {
        let width = WidthContainer * 0.315;
        let WidthShorts = WidthContainer * 0.183;
        console.log(width);
        setWidthVideos(`${width}px`);
        setWidthShorts(`${WidthShorts}px`);
        setMarginLeft(`${Math.round(WidthContainer) * 0.005}px`);
        setMarginRight(`${Math.round(WidthContainer) * 0.012}px`);
        setValue(5);
      }
      if (Largeur >= 1604 && Largeur <= 1945) {
        let width = WidthContainer * 0.23;
        let WidthShorts = WidthContainer * 0.148;
        console.log(width);
        setWidthVideos(`${width}px`);
        setWidthShorts(`${WidthShorts}px`);
        setMarginLeft(`${Math.round(WidthContainer) * 0.005}px`);
        setMarginRight(`${Math.round(WidthContainer) * 0.014}px`);
        setValue(6);
      }
      if (Largeur >= 1946 && Largeur <= 2295) {
        let width = WidthContainer * 0.183;
        let WidthShorts = WidthContainer * 0.108;
        console.log(width);
        setWidthVideos(`${width}px`);
        setWidthShorts(`${WidthShorts}px`);
        setMarginLeft(`${Math.round(WidthContainer) * 0.01}px`);
        setMarginRight(`${Math.round(WidthContainer) * 0.006}px`);
        setValue(8);
      }
      if (Largeur >= 2296) {
        let width = Math.round(WidthContainer * 0.15);
        let WidthShorts = WidthContainer * 0.095;
        console.log(width);
        setWidthVideos(`${width}px`);
        setWidthShorts(`${WidthShorts}px`);
        setMarginLeft(`${Math.round(WidthContainer) * 0.01}px`);
        setMarginRight(`${Math.round(WidthContainer) * 0.006}px`);
        setValue(9);
      }
    }
  }
};

export const CheckRelatedVideos = (setWidthVideos, ref, setHeightVideos) => {
  let Largeur = window.innerWidth;
  const { width } = ref?.current?.getBoundingClientRect();
  let WidthContainer = width;
  if (Largeur <= 580) {
    setWidthVideos(WidthContainer * 0.995);
    setHeightVideos(Largeur * 0.56);
  }
  if (Largeur > 581 && Largeur <= 780) {
    setWidthVideos(WidthContainer * 0.47);
    setHeightVideos(Largeur * 0.56);
  }
  if (Largeur > 781 ) {
    setWidthVideos(WidthContainer * 0.3);
    setHeightVideos(Largeur * 0.56);
  }
};

export const MoreContent = (numero, choice = false) => {
  let Container = document.getElementById(`Container-level-${numero}`);
  let button = document.getElementById(`Button-section-${numero}`);
  let element = Container.querySelector(`${choice ? ".shorts" : "div"}`);
  console.log(element);
  element.style.flexWrap = "wrap";
  button.remove();
};

export function ContentTrend({ choix = "now" }) {
  const {
    data: dataTrend,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch${choix}Tendance`],
    queryFn: () => fetchTrends(choix),
  });
  if (isLoading) {
    return (
      <div style={{ margin: "0 auto", width: "15%" }}>
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    return (
      <div style={{ margin: "0 auto", width: "15%" }}>
        <p>Une Erreur est survenu {error.message}</p>
      </div>
    );
  }
  return (
    <>
      {dataTrend?.data?.data?.map((element, index) => {
        if (element?.type === "video") {
          return (
            <div key={index} className="GridTrend">
              <Link
                to={`/watch/${element?.videoId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div style={{ marginLeft: "2%", position: "relative" }}>
                  <img
                    alt={element?.title}
                    src={element?.thumbnail[0]?.url}
                    height="175px"
                    width={"300px"}
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
              <div className="BoxeTends">
                <Link
                  to={`/watch/${element?.videoId}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "50%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      width: "100%",
                      fontWeight: "550",
                      cursor: "pointer",
                    }}
                  >
                    {element?.title}
                  </p>
                </Link>
                <div className="ContenuNumero5">
                  <Link
                    to={`/Channel/${element?.channelId}`}
                    style={{
                      MarginLeft: "5px",
                      marginRight: "5px",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {element?.channelTitle}
                  </Link>
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
                <Link
                  to={`/watch/${element?.videoId}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "50%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      width: "70%",
                      cursor: "pointer",
                    }}
                  >
                    {element?.description}
                  </p>
                </Link>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}

export const NewSearchs = ({
  data,
  setDataContext,
  setOption,
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
                      border: "1px solid rgb(23, 184, 206)",
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
                style={{ textDecoration: "none", color: "black", width: "100%" }}
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
                    border: "1px solid rgb(23, 184, 206)",
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
                      <p style={{ fontSize: "0.6em", marginBottom: "1%" }}>
                        {WidthScreen <= 300
                          ? element?.title.substring(0, 25) + "..."
                          : element?.title}
                      </p>
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
                          fontSize: "18px",
                        }}
                      >
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
                    <p style={{ fontSize: "0.6em", marginBottom: "1%" }}>
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
                  border: "2px solid orange",
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
          if (element?.type === "playlist") {
            if (WidthScreen <= 930) {
              return (
                <div
                  key={index}
                  style={{
                    width: "100%",
                    border: "1px solid rgb(23, 184, 206)",
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
                          to={`/Playlist/${element?.videoId}/${i}/${element?.playlistId}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          <div
                            key={i}
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

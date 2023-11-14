import * as React from "react";
import { AppBarSecondary } from "./AppBarSecondary";
import "../App.css";
import { BarSearch } from "./AppBarPrimary";
import ReactPlayer from "react-player/youtube";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { FetchHomeShorts } from "../utils/Appel";
import { Carsoussel } from "./Carsoussel";
import { useParams, useNavigate } from "react-router-dom";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

import { BiArrowBack } from "react-icons/bi";

function ShortsHome() {
  const {
    data: dataShorts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch/Shorts`],
    queryFn: () => FetchHomeShorts(),
  });

  const [WidthScreen, setWidthScreen] = React.useState(window.innerWidth);
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const Back = () => {
    window.history.back();
  };

  React.useEffect(() => {
    const CheckResponsive = () => {
      if (window.innerWidth <= 1024) {
        setResponsive(true);
        console.log("Gerts");
        setWidthScreen(window.innerWidth);
        console.log("Largeur d'écran", WidthScreen);
      } else {
        setResponsive(false);
      }
    };
    window.addEventListener("resize", CheckResponsive);
    return () => {
      window.removeEventListener("resize", CheckResponsive);
    };
  }, [WidthScreen]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress style={{ fontSize: "40px" }} />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="GridTrend">
        <p>Une Erreur est survenu {error.message}</p>
      </div>
    );
  }

  return (
    <>
      {responsive ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            zIndex: "30",
            backgroundColor: "black",
            pointerEvents: "auto",
          }}
        >
          {dataShorts?.data?.data.map((element, index) => {
            if (element.type === "shorts_listing") {
              return (
                <Carsoussel
                  key={index}
                  InitialValue={0}
                  height="92vh"
                  mobile
                  WidthScreen={WidthScreen}
                >
                  {element?.data.map((item, index) => (
                    <ReactPlayer
                      config={{
                        youtube: {
                          playerVars: {
                            showinfo: 1,
                            origin: "http://localhost:3000",
                            enablejsapi: 1,
                          },
                        },
                      }}
                      key={index}
                      url={`https://www.youtube.com/embed/${item?.videoId}`}
                      className="react-player ShortPlayer"
                      width="100%"
                      height="100%"
                      style={{ margin: "0 auto", pointerEvents: "none" }}
                    />
                  ))}
                </Carsoussel>
              );
            }
            return null;
          })}
          <button
            onClick={() => Back()}
            style={{
              width: "20%",
              height: "3%",
              backgroundColor: "transparent",
              position: "fixed",
              border: "none",
              top: "0",
              left: "0",
              zIndex: "5000",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <BiArrowBack color="white" fontWeight={600} fontSize={28} />
          </button>
        </div>
      ) : (
        <>
          <BarSearch />
          <AppBarSecondary />

          <div
            style={{
              position: "relative",
              top: `${responsive ? "8vh" : "11vh"}`,
              left: `${responsive ? "0px" : "9.8vw"}`,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
              border: "2px solid transparent",
              color: "black",
              width: `${responsive ? "100%" : "90%"}`,
            }}
          >
            {dataShorts?.data?.data.map((element, index) => {
              if (element.type === "shorts_listing") {
                return (
                  <Carsoussel
                    key={index}
                    InitialValue={0}
                    WidthScreen={WidthScreen}
                  >
                    {element?.data.map((item, index) => (
                      <ReactPlayer
                        config={{
                          youtube: {
                            playerVars: {
                              showinfo: 1,
                              origin: "http://localhost:3000",
                              enablejsapi: 1,
                            },
                          },
                        }}
                        key={index}
                        url={`https://www.youtube.com/shorts/${item?.videoId}`}
                        className="react-player ShortPlayer"
                        width={"30vw"}
                        height={"100%"}
                        style={{ margin: "0 auto", pointerEvents: "auto" }}
                      />
                    ))}
                  </Carsoussel>
                );
              }
              return null;
            })}
          </div>
        </>
      )}
    </>
  );
}

function ShortsElements() {
  const startXRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(true);
  const DataContext = JSON.parse(localStorage.getItem("shorts"));
  console.log("log", typeof DataContext);
  let { IndexShorts } = useParams();
  const navigate = useNavigate();
  const firstShort = DataContext.indexOf(IndexShorts) === 0 ? true : false;
  const LastShort =
    DataContext.indexOf(IndexShorts) === DataContext.length - 1 ? true : false;

  console.log("shorts elements", DataContext);
  const [WidthScreen, setWidthScreen] = React.useState(window.innerWidth);

  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const Back = () => {
    navigate("/");
  };
  const NextShorts = () => {
    if (responsive) {
      const value = DataContext.indexOf(IndexShorts) - 1;
      const idx = value === -1 ? DataContext.length - 1 : value;
      console.log("idx", idx);
      console.log("value", value);
      navigate(`/List/Shorts/${DataContext[idx]}`);
    } else {
      const value = DataContext.indexOf(IndexShorts) - 1;
      navigate(`/List/Shorts/${DataContext[value]}`);
    }
  };
  const PrevShorts = () => {
    if (responsive) {
      const value = DataContext.indexOf(IndexShorts) + 1;
      const idx = value === DataContext.length + 1 - 1 ? 0 : value;
      console.log("idx", idx);
      console.log("value", value);
      navigate(`/List/Shorts/${DataContext[idx]}`);
    } else {
      const value = DataContext.indexOf(IndexShorts) + 1;
      console.log("Prevhshot Value", value);
      navigate(`/List/Shorts/${DataContext[value]}`);
    }
  };

  /*mobile*/
  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (startXRef.current === null) {
      return; // Pas de touchstart enregistré, ne rien faire
    }

    const deltaY = e.changedTouches[0].clientY - startXRef.current;
    //console.log("touchend", e.changedTouches[0].clientY);
    //console.log("deltaY", deltaY);

    // Exécutez la translation seulement si deltaX dépasse une certaine valeur (par exemple, 50)
    if (deltaY > 0) {
      NextShorts();
    } else if (deltaY < 0) {
      PrevShorts();
    }
  };
  /*mobile*/

  React.useEffect(() => {
    const CheckResponsive = () => {
      if (window.innerWidth <= 1024) {
        setResponsive(true);
        setWidthScreen(window.innerWidth);
      } else {
        setResponsive(false);
      }
    };
    window.addEventListener("resize", CheckResponsive);
    return () => {
      window.removeEventListener("resize", CheckResponsive);
    };
  }, [WidthScreen]);

  return (
    <>
      {responsive ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            zIndex: "1000",
            backgroundColor: "black",
          }}
        >
          <div
            ref={startXRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setPlaying((prev) => !prev)}
            style={{
              height: "92vh",
              width: "100%",
              position: "fixed",
              top: "8vh",
            }}
          >
            <ReactPlayer
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 1,
                    origin: "http://localhost:3000",
                    enablejsapi: 1,
                  },
                },
              }}
              url={`https://www.youtube.com/embed/${IndexShorts}`}
              className="react-player ShortPlayer"
              playing={playing}
              loop
              width={"100%"}
              height={"100%"}
              style={{ margin: "0 auto", pointerEvents: "none" }}
            />
          </div>
          <button
            onClick={() => Back()}
            style={{
              width: "20%",
              height: "3%",
              backgroundColor: "transparent",
              position: "fixed",
              border: "none",
              top: "0",
              left: "0",
              zIndex: "5000",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <BiArrowBack color="white" fontWeight={600} fontSize={28} />
          </button>
        </div>
      ) : (
        <>
          <BarSearch />
          <AppBarSecondary />

          <div
            style={{
              position: "relative",
              top: `11vh`,
              left: `9.8vw`,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
              flexWrap: "wrap",
              border: "2px solid transparent",
              color: "black",
              width: `90%`,
            }}
          >
            <div
              style={{
                height: "90vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReactPlayer
                config={{
                  youtube: {
                    playerVars: {
                      showinfo: 1,
                      origin: "http://localhost:3000",
                      enablejsapi: 1,
                    },
                  },
                }}
                url={`https://www.youtube.com/shorts/${IndexShorts}`}
                className="react-player ShortPlayer"
                loop
                playing
                width={"30vw"}
                height={"100%"}
                style={{ margin: "0 auto", pointerEvents: "auto" }}
              />
              <div
                style={{
                  width: "5%",
                  height: "100%",
                  display: "flex",
                  alignSelf: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  {firstShort ? (
                    <div></div>
                  ) : (
                    <button
                      style={{
                        backgroundColor: "#efeff1",
                        height: "60px",
                        border: "none",
                        width: "60px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={NextShorts}
                    >
                      <RiArrowUpSLine fontSize={28} />
                    </button>
                  )}
                  {LastShort ? (
                    <div></div>
                  ) : (
                    <button
                      style={{
                        backgroundColor: "#efeff1",
                        height: "60px",
                        border: "none",
                        width: "60px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={PrevShorts}
                    >
                      <RiArrowDownSLine fontSize={28} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export { ShortsHome, ShortsElements };

import * as React from "react";
import { AppBarSecondary } from "./AppBarSecondary";
import "../App.css";
import { BarSearch } from "./AppBarPrimary";
import ReactPlayer from 'react-player/youtube';
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { FetchHomeShorts } from "../utils/Appel";
import { Carsoussel } from "./Carsoussel";
import { useContext } from "../Context/ContextProvider";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

function ShorterCAC40() {
  /* 
  Problème cross-oirigin avec le composant react-player
  qui n'est pas modifiable
  */

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
  const navigate = useNavigate();
  const Back = () => {
    navigate("/");
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
                      config={{ youtube: { playerVars: { showinfo: 1, origin: "http://localhost:3000", enablejsapi: 1,} }}} 
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
              border: "2px solid rgb(0, 255, 149)",
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
                        config={{ youtube: { playerVars: { showinfo: 1 } }}} 
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

function ShorterSBF30() {
  const { DataContext, option } = useContext();
  let { IndexShorts } = useParams();
  const CheckedData = option ? DataContext?.data : DataContext?.data?.data;
  const [WidthScreen, setWidthScreen] = React.useState(window.innerWidth);

  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const navigate = useNavigate();
  const Back = () => {
    navigate("/");
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
  //Régler l'histoire des shorts en erreur cross-origin qui créer des erreurs
  // Cross Origin
  if (!DataContext) {
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
          <Carsoussel
            InitialValue={IndexShorts}
            height="92vh"
            mobile
            WidthScreen={WidthScreen}
          >
            {CheckedData.map((item, index) => (
              <ReactPlayer
                config={{ youtube: { playerVars: { showinfo: 1 } } }}
                key={index}
                url={`https://www.youtube.com/embed/${item?.videoId}`}
                className="react-player ShortPlayer"
                width={"100%"}
                height={"100%"}
                style={{ margin: "0 auto", pointerEvents: "none" }}
              />
            ))}
          </Carsoussel>
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
              border: "2px solid rgb(0, 255, 149)",
              color: "black",
              width: `${responsive ? "100%" : "90%"}`,
            }}
          >
            <Carsoussel InitialValue={IndexShorts} WidthScreen={WidthScreen}>
              {CheckedData.map((item, index) => (
                <ReactPlayer
                  config={{ youtube: { playerVars: { showinfo: 1 } } }}
                  key={index}
                  url={`https://www.youtube.com/shorts/${item?.videoId}`}
                  className="react-player ShortPlayer"
                  width={"25vw"}
                  height={"100%"}
                  style={{ margin: "0 auto", pointerEvents: "auto" }}
                />
              ))}
            </Carsoussel>
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
        </>
      )}
    </>
  );
}

export { ShorterCAC40, ShorterSBF30 };

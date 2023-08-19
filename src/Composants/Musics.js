import * as React from "react";
import "../App.css";
import { AppBarSecondary } from "./AppBarSecondary";
import { CircularProgress } from "@mui/material";
import { BarSearch } from "./AppBarPrimary";
import { FetchMusique } from "../utils/Appel";
import { useQuery } from "@tanstack/react-query";
import { DisplayContent } from "../utils/utils2";
import { useContext } from "../Context/ContextProvider";

function Music() {
  const {
    data: DataMusic,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Sport`],
    queryFn: () => FetchMusique(),
    cacheTime: 60000,
    staleTime: 30000,
  });
  const refWidth = React.useRef(null);
  const { setDataContext, setOption } = useContext();
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  //console.log(DataMusic);
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
      <div style={{ margin: "0 auto", width: "15%" }}>
        <p>Une Erreur est survenu {error.message}</p>
      </div>
    );
  }
  return (
    <>
      <BarSearch />
      <AppBarSecondary />
      <div className="ConteneurTendances">
        <div
          ref={refWidth}
          style={{
            padding: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWwrap: "nowrap",
            border: "2px solid transparent",
            color: "black",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "180px",
              backgroundColor: "#efeff1",
              display: "flex",
              flexDirection: "column",
              marginBottom: "40px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  width: "10%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    height: "80px",
                    width: "80px",
                    borderRadius: "50%",
                  }}
                  alt="logo music"
                  src={
                    DataMusic?.data?.meta?.avatar[0]?.url.includes("https:")
                      ? DataMusic?.data?.meta?.avatar[0]?.url
                      : "https:" + DataMusic?.data?.meta?.avatar[0]?.url
                  }
                ></img>
              </div>
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <h1 style={{ fontWeight: "400" }}>
                  {DataMusic?.data?.meta?.title}
                </h1>
                <p>{DataMusic?.data?.meta?.subscriberCountText} d'abonnés</p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <h2
                style={{
                  width: "12%",
                  borderBottom: "2px solid black",
                  fontWeight: "500",
                  fontSize: "18px",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Accueil
              </h2>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <DisplayContent
              Data={DataMusic}
              refWidth={refWidth}
              setDataContext={setDataContext}
              setOption={setOption}
              LogochannelThumbnail={false}
              HasCaroussel
              responsive={responsive}
              setResponsive={setResponsive}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export { Music };

import * as React from "react";
import "../App.css";
import { AppBarSecondary } from "./AppBarSecondary";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../Composants/FallbackError";
import CircularProgress from "@mui/material/CircularProgress";
import { GetCategoryMode } from "../utils/Appel";
import { useQuery } from "@tanstack/react-query";
import { DisplayContent } from "../utils/utils2";
import BarSearch from "./AppBarPrimary";
import { useData } from "../utils/ContextProvider";

export function Mode() {
  const {
    data: DataMode,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: [`Fetch Mode`], queryFn: () => GetCategoryMode() });
  const refWidth = React.useRef(null);
  const { setDataContext, setOption } = useData();
  console.log(DataMode);

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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
        <div className="GridP">
          <div>
            <AppBarSecondary />
          </div>
          <div
            ref={refWidth}
            style={{
              padding: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              flexWwrap: "nowrap",
              border: "2px solid rgb(0, 255, 149)",
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
                    alt="logo actus"
                    src="https://yt3.googleusercontent.com/uuEgOraB12_CH7Jbth-M1-YojvZOQcd3qlYDXXy7EVouDO-Ftpm4QJlntzKTGyTXhfI_Q9Tr_g=s176-c-k-c0x00ffffff-no-rj-mo"
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
                    {DataMode?.data?.meta?.title}
                  </h1>
                  <p>{DataMode?.data?.meta?.subscriberCountText} d'abonnés</p>
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
                Data={DataMode}
                refWidth={refWidth}
                setDataContext={setDataContext}
                setOption={setOption}
                HasCaroussel={true}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

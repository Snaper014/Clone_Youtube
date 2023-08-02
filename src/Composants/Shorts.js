import * as React from "react";
import { AppBarSecondary } from "./AppBarSecondary";
import { ErrorBoundary } from "react-error-boundary";
import "../App.css";
import BarSearch from "./AppBarPrimary";
import ReactPlayer from "react-player/lazy";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { FetchHomeShorts } from "../utils/Appel";
import { ErrorFallback } from "../Composants/FallbackError";
import { Carsoussel } from "./Carsoussel";
import { useData } from "../utils/ContextProvider";
import { useParams } from "react-router-dom";

function ShorterCAC40() {
  const {
    data: dataShorts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch/Shorts`],
    queryFn: () => FetchHomeShorts(),
    cacheTime: 60000,
    staleTime: 30000,
  });

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
      <ErrorBoundary fallback={ErrorFallback}>
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
              border: "2px solid rgb(0, 255, 149)",
              width: "95%",
            }}
          >
            {dataShorts?.data?.data.map((element, index) => {
              if (element.type === "shorts_listing") {
                return (
                  <Carsoussel key={index} InitialValue={0}>
                    {element?.data.map((AUelment, index) => (
                      <ReactPlayer
                        key={index}
                        url={`https://www.youtube.com/shorts/${AUelment.videoId}`}
                        className="react-player ShortPlayer"
                        width={"25vw"}
                        height={"100%"}
                        style={{ margin: "0 auto" }}
                      />
                    ))}
                  </Carsoussel>
                );
              }
              return null;
            })}
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

function ShorterSBF30() {
  const { DataContext, option } = useData();
  let { IndexShorts } = useParams();
  const CheckedData = option ? DataContext?.data : DataContext?.data?.data;
  //Régler l'histoire des shorts en erreur cross-origin qui créer des erreurs
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
      <ErrorBoundary fallback={ErrorFallback}>
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
              border: "2px solid rgb(0, 255, 149)",
              width: "95%",
            }}
          >
            <Carsoussel InitialValue={IndexShorts}>
              {CheckedData.map((AUelment, index) => (
                <ReactPlayer
                  key={index}
                  url={`https://www.youtube.com/shorts/${AUelment.videoId}&origin=https://www.youtube.com`}
                  className="react-player ShortPlayer"
                  width={"25vw"}
                  height={"100%"}
                  style={{ margin: "0 auto" }}
                />
              ))}
            </Carsoussel>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export { ShorterCAC40, ShorterSBF30 };

import * as React from "react";
import { AppBarSecondary } from "./AppBarSecondary";
import "../App.css";
import { BarSearch, MobileBarSearch } from "./AppBarPrimary";
import { CircularProgress } from "@mui/material";
import { DisplayContent } from "./Elements/Content";
import { MobileSecondaryBar } from "./AppBarSecondary";
import { useQuery } from "@tanstack/react-query";
import { FetchHomeFeed } from "../utils/Appel";

function Home() {
  const {
    data: DataYTB,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Home Page`],
    queryFn: () => FetchHomeFeed(),
    staleTime: 1000,
  });

  //Enlever l'authentifciation
  //Playlist Recherche
  // responsive mobile/tablette
  //trouver une solution pour les shorts
  // test
  // mettre sur le portfolio
  // Faire le back-end bien plus tard dans une autre branche

  //console.log("data Home", DataYTB);
  const refWidth = React.useRef(null);
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );

  if (isLoading) {
    return (
      <div
        data-testid="users-loading"
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
      <div data-testid="users-error" style={{ margin: "0 auto", width: "15%" }}>
        <p>Une Erreur est survenu {error.message}</p>
      </div>
    );
  }

  return (
    <>
      {responsive ? (
        <>
          <MobileBarSearch />
          <MobileSecondaryBar />
        </>
      ) : (
        <>
          <BarSearch />
          <AppBarSecondary />
        </>
      )}
      <div
        ref={refWidth}
        style={{
          position: "relative",
          top: `${responsive ? "8vh" : "11vh"}`,
          left: `${responsive ? "0px" : "9.8vw"}`,
          padding: `${responsive ? "0px 0px 7vh 0px" : "3vh 0px 3vh 0px"}`,
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
            Data={DataYTB}
            refWidth={refWidth}
            LogochannelThumbnail={true}
            setResponsive={setResponsive}
            responsive={responsive}
          />
        </div>
      </div>
    </>
  );
}
export { Home };

import * as React from "react";
import { useParams } from "react-router-dom";
import { GetSubscriptions } from "../../utils/Appel";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { DisplayContent } from "../../utils/utils2";

export function Subscriptions() {
  let { chaId } = useParams();
  const {
    data: Subscriptions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Channel Subscriptions`, chaId],
    queryFn: () => GetSubscriptions(chaId),
    staleTime: 1000,
  });
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const refWidth = React.useRef(null);
  console.log("Subscriptions", Subscriptions)

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
    <div
      ref={refWidth}
      style={{
        width: "100%",
        border: "2px solid transparent",
        display: "flex",
        flexDirection: `${responsive ? "column" : "row"}`,
        alignItems: "flex-start",
        paddingBottom: "7vh",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {Subscriptions?.data?.msg === "Cette chaîne ne présente aucune autre chaîne."
        ||
        Subscriptions?.data?.msg === "Selected tab not available" 
       ? 
      (
        <h3 style={{width: "100%", 
        textAlign: "center", 
        fontWeight: "400"
      }}>
          Cette chaîne ne présente aucune autre chaîne.
      </h3>
      ) :
      <DisplayContent 
        Data={Subscriptions} 
        refWidth={refWidth} 
        HasCaroussel 
        setResponsive={setResponsive}
        ChannelHome
        responsive={responsive}
      />
      }
    </div>
  );
}

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
    queryKey: [`Fetch Home Page`],
    queryFn: () => GetSubscriptions(chaId),
  });
  const refWidth = React.useRef(null);

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
        border: "2px solid yellow",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {Subscriptions?.data?.msg ===
        "Cette chaîne ne contient aucune playlist." && (
        <p>Cette chaîne ne contient aucune playlist.</p>
      )}
      <DisplayContent Data={Subscriptions} refWidth={refWidth} HasCaroussel />
    </div>
  );
}

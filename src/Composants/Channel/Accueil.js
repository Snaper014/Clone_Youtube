import * as React from "react";
import { useContext } from "../../Context/ContextProvider";
import { DisplayContent } from "../../utils/utils2";
import { GetChannelHomeUser } from "../../utils/Appel";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export function ChannelHome() {
  let { chaId } = useParams();
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Channel Home`, chaId],
    queryFn: () => GetChannelHomeUser(chaId),
    enabled: !!chaId,
    staleTime: 1000,
  });
  console.log("dataVideos", data);
  const refWidth = React.useRef(null);
  const { setDataContext, setOption } = useContext();
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );

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
    <div
      ref={refWidth}
      style={{
        width: "100%",
        border: "1px solid transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingBottom: "7vh",
        justifyContent: "flex-start",
      }}
    >
      {data?.data?.msg === "Chaîne sans contenu" 
      ||
      data?.data.msg === "Selected tab not available"
      ? (
        <h3 style={{width: "100%", 
              textAlign: "center", 
              fontWeight: "400",
              paddingBottom: "7vh",
            }}>
                Chaîne sans Contenu
          </h3>
        )
      :
      <DisplayContent
        Data={data}
        refWidth={refWidth}
        setDataContext={setDataContext}
        setOption={setOption}
        HasCaroussel={responsive ? false : true}
        ChannelHome
        setResponsive={setResponsive}
        responsive={responsive}
      />}
    </div>
  );
}

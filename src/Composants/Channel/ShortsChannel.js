import * as React from "react";
import "../../App.css";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetChannelShorts } from "../../utils/Appel";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "../../Context/ContextProvider";

export function AllShortsChannel() {
  let { chaId } = useParams();
  const navigate = useNavigate();
  const { setDataContext } = useContext();
  const {
    data: DataShorts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Channel Shorts`],
    queryFn: () => GetChannelShorts(chaId),
  });
  
  const [WidthVideos, setWidthVideos] = React.useState();
  const [loading, setLoading] = React.useState(true);

  console.log(DataShorts);
  React.useLayoutEffect(() => {
    let chargement = setTimeout(() => {
        SizeVideos(setWidthVideos);
        setLoading(false);
    }, 1200);

    return () => clearTimeout(chargement);
  }, []);

  React.useEffect(() => {
    const HandleResize = () => {
      SizeVideos(setWidthVideos);
    }
    window.addEventListener("resize", HandleResize);
    return () => window.removeEventListener("resize", HandleResize);
  }, []);

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
  
  
  const HandleShorts = (index, data) => {
    setDataContext(data);
    navigate(`/List/Shorts/${index}`);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        border: "2px solid transparent",
        display: "flex",
        alignItems: "flex-start",
        paddingBottom: "7vh",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      { DataShorts?.data?.msg === "Cette Chaîne ne contient aucun shorts" 
        ||
        DataShorts?.data.msg === "Selected tab not available"
      ? 
      (
        <h3 style={{width: "100%", 
              textAlign: "center", 
              fontWeight: "400"
            }}>
                Cette Chaîne ne contient aucun shorts
          </h3>
        )
      : (loading ? <div>chargement...</div> : 
          DataShorts?.data?.data.map((items, i) => (
          <div
            key={i}
            style={{
              height: "70vh",
              display: "flex",
              width: `${WidthVideos}`,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              cursor: "pointer",
              marginBottom: "0.5%",
            }}
            onClick={() => HandleShorts(i, DataShorts)}
          >
            <div style={{ 
              width: "100%", 
              position: "relative",
              height: `${window.innerWidth <= 1024 ? "100%" : "75%"}` }}>
              <img
                style={{ borderRadius: "10px" }}
                alt={items?.title}
                width="100%"
                height="100%"
                src={items?.thumbnail[0]?.url}
              ></img>
              {window.innerWidth <= 1024 ? 
                <div style={{
                  position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  bottom: "0px",
                  width: "100%",
                  color: "white",
                  fontSize: "1.2em",
                  height: "20%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-end"
                }}>
                  <h6
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1em",
                  marginBottom: "2%",
                  color: "white",
                }}
              >
                {items?.title?.substring(0, 25) + "..."}
              </h6>
              <p style={{
                  fontWeight: "600",
                  width: "100%",
                  }}>
                {items?.viewCountText}
              </p>  
            </div>
              : null}
            </div>
            {window.innerWidth > 1025 ? 
              <div style={{ width: "100%", height: "25%" }}>
              <h6
                style={{
                  fontWeight: "600",
                  width: "100%",
                  fontSize: "1em",
                  marginBottom: "2%",
                }}
              >
                {items?.title.length >= 63
                  ? items?.title?.substring(0, 63) + "..."
                  : items?.title}
              </h6>
              <p>{items?.viewCountText}</p>
            </div>: null}
          </div>
        )))
      }
    </div>
  );
}

const SizeVideos = (setWidthVideos) => {
  if(window.innerWidth <= 519){
      setWidthVideos("100%");
  }
  if(window.innerWidth >= 520 && window.innerWidth <= 864){
      setWidthVideos("46%");
  }
  if(window.innerWidth >= 865){
      setWidthVideos("24%");
  }
}
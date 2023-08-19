import * as React from "react";
import "../../App.css";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GetChannelVideos } from "../../utils/Appel";
import { useQuery } from "@tanstack/react-query";

export function AllVideos() {
  let { chaId } = useParams();
  const {
    data: DataVideos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Channel All videos`],
    queryFn: () => GetChannelVideos(chaId),
  });
 
  const [WidthVideos, setWidthVideos] = React.useState();
  const [loading, setLoading] = React.useState(true);
  console.log("dataVideos", DataVideos);


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
      style={{
        width: "100%",
        border: "2px solid transparent",
        display: "flex",
        paddingBottom: "7vh",
        alignItems: "flex-start",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {DataVideos?.data?.msg === "Cette Chaîne ne contient aucun vidéos"
        ||
        DataVideos?.data.msg === "Selected tab not available" 
      ? (
        <h3 style={{width: "100%", 
        textAlign: "center", 
        fontWeight: "400",
        paddingBottom: "7vh",
      }}>
          Cette Chaîne ne contient aucun vidéos
    </h3>
        )
      :
      (loading ? <div>chargement...</div> : 
        DataVideos?.data?.data.map((items, i) => (
          <div
            key={i}
            style={{
              height: "100%",
              display: "flex",
              width: `${WidthVideos}`,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginBottom: "3%",
            }}
          >
            <Link
              to={`/watch/${items?.videoId}`}
              style={{
                textDecoration: "none",
                color: "black",
                width: "100%",
              }}
            >
              <div style={{ position: "relative", width: "100%" }}>
                <img
                  width={"100%"}
                  style={{ borderRadius: "5%", cursor: "pointer" }}
                  alt={items?.title}
                  src={items?.thumbnail[1]?.url}
                ></img>
                <div className="IndicatorView">
                  <p style={{ margin: "0.3em", fontWeight: "600" }}>
                    {items?.lengthText}
                  </p>
                </div>
              </div>
            </Link>
            <h6
              style={{
                fontWeight: "600",
                width: "100%",
                fontSize: "18px",
                marginBottom: "2%",
              }}
            >
              {items?.title.length >= 63
                ? items?.title?.substring(0, 63) + "..."
                : items?.title}
            </h6>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "nowrap",
                width: "100%",
                fontSize: "0.8em",
              }}
            >
              <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                {items?.viewCount} vues
              </p>
              <div
                style={{
                  width: "2px",
                  height: "2px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                  MarginLeft: "5px",
                  marginRight: "5px",
                }}
              ></div>
              <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                il y a {items?.publishedTimeText}
              </p>
            </div>
          </div>
        )))}
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
    if(window.innerWidth >= 865 && window.innerWidth <= 1024){
        setWidthVideos("28%");
    }
    if(window.innerWidth > 1025){
      setWidthVideos("23%");
    }
}

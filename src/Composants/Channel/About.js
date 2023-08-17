import * as React from "react";
import "../../App.css";
import { useParams } from "react-router-dom";
import { GetAbout } from "../../utils/Appel";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MobileResponsive } from "../../utils/utils";

export function Liens() {
  let { chaId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`Fetch Channel Liens`],
    queryFn: () => GetAbout(chaId),
  });
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  React.useLayoutEffect(() => {
    let chargement = setTimeout(() => {
        MobileResponsive(setResponsive);
    }, 1200);

    return () => clearTimeout(chargement);
  }, []);

  React.useEffect(() => {
    const HandleResize = () => {
      MobileResponsive(setResponsive);
    }
    window.addEventListener("resize", HandleResize);
    return () => window.removeEventListener("resize", HandleResize);
  }, []);

  console.log("About", data);
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
    { 
    responsive ? 
    
    <div style={{
      width: "100%",
      border: "1px sold transparent",
      display: "flex",
      flexDirection: "column",
      fontSize: "1.2em",
      paddingBottom: "7vh",
    }}>
      <h3 style={{width: "100%", fontWeight: "400", marginBottom: "2%"}}> A propos</h3>
      <p style={{width: "100%", fontSize : "1em", marginBottom : "2%"}}>{data?.data?.description}</p>
      <div style={{
            width: "100%", 
            marginBottom: "2%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}>
      {!data?.data?.links ? "" : data?.data?.links.map((element, index) => (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={element?.link}
                    key={index}
                    style={{ 
                      width: "100%", 
                      color: "#065FD4",
                      marginBottom: "0.5%",
                      textDecoration: "none",
                    }}
                  >
                    {element?.title}
                  </Link>
                ))}
          </div>      
        <p style={{ marginBottom: "2%"}}>
            {" "}
            Actif depuis le {data?.data?.joinedDate}
          </p>
          <p style={{ marginBottom: "2%"}}>
            {data?.data?.viewCount} vues
          </p>           

    </div> 
    
    :
    <div
      style={{
        width: "100%",
        border: "1px sold transparent",
        display: "flex",
        flexDirection: "column",
        fontSize: "1em",
      }}
    >
      <div
        style={{
          width: "100%",
          border: "1px solid transparent",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            border: "1px solid transparent",
          }}
        >
          <h4 style={{ marginBottom: "2%", fontSize: "22px" }}>Description</h4>
          <p style={{ marginBottom: "4%" }}>{data?.data?.description}</p>
          <hr />
          <p style={{ marginBottom: "2%", fontSize: "18px" }}>Informations</p>
          <div style={{ width: "100%", marginBottom: "5%" }}>
            pays :{" "}
            <span style={{ marginLeft: "5%" }}>{data?.data?.country}</span>
          </div>
          <hr />
          {
            <>
              <p style={{ marginBottom: "2%", fontSize: "18px" }}>Liens</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "50%",
                }}
              >
                {!data?.data?.links ? "" : data?.data?.links.map((element, index) => (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={element?.link}
                    key={index}
                    style={{ width: "50%", marginBottom: "5%", color: "#065FD4"}}
                  >
                    {element?.title}
                  </Link>
                ))}
              </div>
            </>
          }
        </div>
        <div
          style={{
            width: "30%",
            border: "1px solid transparent",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p style={{ marginBottom: "2%", fontSize: "22px" }}>Statistiques</p>
          <hr />
          <p style={{ marginBottom: "2%", fontSize: "18px" }}>
            {" "}
            Actif depuis le {data?.data?.joinedDate}
          </p>
          <hr />
          <p style={{ marginBottom: "2%", fontSize: "18px" }}>
            {data?.data?.viewCount} vues
          </p>
          <hr />
        </div>
      </div>
    </div>
        }
    </> 
  );
}


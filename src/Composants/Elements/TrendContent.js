import * as React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchTrends } from "../../utils/Appel";

export function ContentTrend({ choix = "now" }) {
    const {
      data: dataTrend,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: [`Fetch${choix}Tendance`],
      queryFn: () => fetchTrends(choix),
    });
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
      <>
        {dataTrend?.data?.data?.map((element, index) => {
          if (element?.type === "video") {
            return (
              <div key={index} className="GridTrend">
                <Link
                  to={`/watch/${element?.videoId}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div style={{ marginLeft: "2%", position: "relative" }}>
                    <img
                      alt={element?.title}
                      src={element?.thumbnail[0]?.url}
                      height="175px"
                      width={"300px"}
                      style={{ borderRadius: "10px" }}
                    ></img>
                    <div
                      className={`${
                        element?.lengthText === "EN DIRECT"
                          ? "IndicatorLive"
                          : "IndicatorView"
                      }`}
                    >
                      <p style={{ margin: "0.3em", fontWeight: "600" }}>
                        {element?.lengthText}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="BoxeTends">
                  <Link
                    to={`/watch/${element?.videoId}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "50%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "18px",
                        width: "100%",
                        fontWeight: "550",
                        cursor: "pointer",
                      }}
                    >
                      {element?.title}
                    </p>
                  </Link>
                  <div className="ContenuNumero5">
                    <Link
                      to={`/Channel/${element?.channelId}`}
                      style={{
                        MarginLeft: "5px",
                        marginRight: "5px",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {element?.channelTitle}
                    </Link>
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
                      {element?.viewCount} vues
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
                      {element?.publishedTimeText}
                    </p>
                  </div>
                  <Link
                    to={`/watch/${element?.videoId}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "50%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        width: "70%",
                        cursor: "pointer",
                      }}
                    >
                      {element?.description}
                    </p>
                  </Link>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  }
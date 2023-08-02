import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../Composants/FallbackError";
import ReactPlayer from "react-player/lazy";
import { CircularProgress } from "@mui/material";
import "../App.css";
import { useFetchData } from "../utils/Fetch";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GetVideos } from "../utils/Appel";
import { VscVerifiedFilled } from "react-icons/vsc";
import BarSearch from "./AppBarPrimary";

function Videos() {
  const navigate = useNavigate();

  const { data: dataYTB, error, status, execute } = useFetchData();
  const [DisplayDescription, setDisplayDescription] = React.useState(false);
  let { id } = useParams();

  React.useEffect(() => {
    execute(GetVideos(id));
  }, [id, execute]);

  console.log("Data", dataYTB);
  if (status === "fetching") {
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
  if (error) {
    return (
      <div className="Principale">
        <h1>Une Erreur est survenu</h1>
        <p style={{ color: "red" }}>{error.message}</p>
      </div>
    );
  }
  const HandleVideos = (id) => {
    navigate(`/watch/${id}`);
  };
  const HandleChannel = (Channelid) => {
    navigate(`/Channel/${Channelid}`);
  };
  const HoverEnter = () => {
    if (DisplayDescription === false) {
      let element = document.getElementById("HandleHoverD");
      element.style.backgroundColor = "#dfdfdf";
    } else {
      let element = document.getElementById("HandleHoverD");
      element.style.backgroundColor = "#efeff1";
    }
  };
  const HoverLeave = () => {
    let element = document.getElementById("HandleHoverD");
    element.style.backgroundColor = "#efeff1";
  };
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
        <div
          className="GridVideoyoutube"
          style={{
            border: "2px solid red",
            display: "grid",
            width: "90%",
            left: "16vh",
            position: "relative",
            top: "11vh",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid pink",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              width={"100%"}
              height={"500px"}
              className="react-player"
              controls
            />
            <h1
              style={{
                fontWeight: "bolder",
                marginTop: "1%",
                fontSize: "20px",
                width: "100%",
                marginBottom: "2%",
              }}
            >
              {dataYTB?.data?.title}
            </h1>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
              }}
            >
              <div
                onClick={() => HandleChannel(dataYTB?.data?.channelId)}
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  alignItems: "flex-start",
                  cursor: "pointer",
                }}
              >
                <img
                  alt="kiche"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "1%",
                  }}
                  src={dataYTB?.data?.channelThumbnail[0]?.url}
                ></img>

                <div style={{ marginLeft: "2%", marginRight: "5%" }}>
                  <h5 style={{ fontSize: "18px" }}>
                    {dataYTB?.data?.channelBadges === null ? (
                      <>{dataYTB?.data?.channelTitle}</>
                    ) : (
                      <>
                        {dataYTB?.data?.channelTitle}{" "}
                        <span>
                          <VscVerifiedFilled />
                        </span>
                      </>
                    )}
                  </h5>
                  <p style={{ fontSize: "14px" }}>
                    {dataYTB?.data?.subscriberCountText}
                  </p>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "18px",
                    height: "100%",
                    width: "30%",
                    fontWeight: "550",
                    textAlign: "center",
                    borderRadius: "30px",
                  }}
                >
                  S'abonner
                </button>
              </div>
            </div>
            <div
              id="HandleHoverD"
              onClick={() => setDisplayDescription(!DisplayDescription)}
              onMouseEnter={() => HoverEnter()}
              onMouseLeave={() => HoverLeave()}
              style={{
                backgroundColor: "#efeff1",
                width: "95%",
                margin: "2vh 1vw 2vh 1vw",
                padding: "1%",
                borderRadius: "7px",
                height: `${DisplayDescription ? "auto" : "20vh"}`,
                overflow: "hidden",
                cursor: `${DisplayDescription ? "auto" : "pointer"}`,
              }}
            >
              <h3 style={{ width: "100%" }}>
                {dataYTB?.data?.viewCount} vues - {dataYTB?.data?.publishDate}
              </h3>
              <div style={{ fontSize: "20px" }}>
                {DisplayDescription ? (
                  <>
                    <p>{dataYTB?.data?.description}</p>
                    <button
                      style={{
                        marginTop: "2%",
                        marginLeft: "2%",
                        border: "none",
                        backgroundColor: "#efeff1",
                        fontWeight: "550",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                      onClick={() => setDisplayDescription(!DisplayDescription)}
                    >
                      Moins
                    </button>
                  </>
                ) : (
                  <p>
                    {dataYTB?.data?.description.substring(0, 312)}{" "}
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "550",
                        fontSize: "18px",
                      }}
                    >
                      Plus
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "skyblue",
              border: "1px solid skyblue",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
            }}
          >
            {dataYTB?.data?.relatedVideos?.data?.map((element, index) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-evenly",
                  margin: "2vh 0vh 2vh 0vh",
                }}
                key={index}
              >
                <div
                  style={{
                    position: "relative",
                    width: "35%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={() => HandleVideos(element?.videoId)}
                >
                  <img
                    style={{
                      borderRadius: "10px",
                      height: "18vh",
                      width: "100%",
                    }}
                    src={element?.thumbnail[0]?.url}
                    alt={index}
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    width: "50%",
                  }}
                >
                  <p
                    style={{
                      width: "100%",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    {element?.title.length > 60
                      ? element?.title.substring(0, 45) + "..."
                      : element?.title}
                  </p>
                  <p
                    style={{
                      width: "100%",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                    onClick={() => HandleChannel(element?.channelId)}
                  >
                    {element?.channelTitle}
                  </p>
                  <div className="SuggesVdeo">
                    <p style={{ marginRight: "5px" }}>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}
export { Videos };

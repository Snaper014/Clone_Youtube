import * as React from "react";
import "../../App.css";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";
import { GetChannelHomeUser } from "../../utils/Appel";
import { VscVerifiedFilled } from "react-icons/vsc";
import { ButtonAndContainer, MobileButtonAndContainer } from "./Tabs";
import { useQuery } from "@tanstack/react-query";
import { ContainerDesktop } from "../Container/ContainerDesktop";
import { CheckSubs } from "../../actions/Actions";
import { ContainerMobile } from "../Container/ContainerMobile";
import { AddSub } from "../../actions/Actions";
import { ModalSub } from "../Elements/modals/ModalSub";
import { AiOutlineCheck } from "react-icons/ai";
import { GetInfosSubsChannel } from "../../utils/utils";
import { useContext } from "../../Context/ContextProvider";

export function PageYoutubeur() {
  let { chaId } = useParams();
  const {
    data: dataChannel,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch Channel Home`, chaId],
    queryFn: () => GetChannelHomeUser(chaId),
    enabled: !!chaId,
    staleTime: 1000,
  });
  const [responsive, setResponsive] = React.useState(window.innerWidth);
  const [isSubs, setIsSubs] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { user } = useContext();

  console.log("DataChannel", dataChannel);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const CheckResponsive = () => setResponsive(window.innerWidth);
    if (user) {
      CheckSubs(dataChannel?.data?.meta?.channelId)
        .then((response) => setIsSubs(response?.data?.data))
        .catch((error) => console.log(error));
    }
    window.addEventListener("resize", CheckResponsive);
    return () => window.removeEventListener("resize", CheckResponsive);
  }, [user, dataChannel]);

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
      {responsive <= 1024 ? (
        <ContainerMobile
          name={dataChannel?.data?.meta?.title}
          styles={{
            position: "relative",
            top: "8vh",
            left: "0px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            flexWrap: "wrap",
            border: "2px solid transparent",
            color: "black",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              border: "1px solid transparent",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "40%",
                marginBottom: "1%",
              }}
            >
              {dataChannel?.data?.meta?.banner !== null ? (
                <img
                  width={"100%"}
                  height={"100%"}
                  alt={dataChannel?.data?.meta?.channelHandle}
                  src={dataChannel?.data?.meta?.mobileBanner[3]?.url}
                ></img>
              ) : (
                <div
                  style={{
                    backgroundColor: "white",
                    height: "100%",
                    width: "100%",
                  }}
                ></div>
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{ borderRadius: "50%" }}
                alt={dataChannel?.data?.meta?.title}
                src={dataChannel?.data?.meta?.avatar[1]?.url}
                width="70px"
                height="70px"
              ></img>
              <h4 style={{ fontSize: "2em", fontWeight: "550" }}>
                {dataChannel?.data?.meta?.title}{" "}
                {dataChannel?.data?.meta?.isVerified ? (
                  <VscVerifiedFilled />
                ) : null}
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "2%",
                }}
              >
                <p
                  style={{
                    display: "inline",
                    marginRight: "10px",
                    fontWeight: "600",
                  }}
                >
                  {dataChannel?.data?.meta?.channelHandle}
                </p>
                <h4
                  style={{
                    display: "inline",
                    marginRight: "10px",
                    fontWeight: "400",
                  }}
                >
                  {!dataChannel?.data?.meta?.subscriberCountText ? (
                    ""
                  ) : (
                    <p>
                      {dataChannel?.data?.meta?.subscriberCountText} d'abonnés
                    </p>
                  )}
                </h4>
                <h4
                  style={{
                    display: "inline",
                    marginRight: "10px",
                    fontWeight: "400",
                  }}
                >
                  {dataChannel?.data?.meta?.videosCountText ===
                  "Aucune vidéo" ? (
                    dataChannel?.data?.meta?.videosCountText
                  ) : (
                    <p>{dataChannel?.data?.meta?.videosCountText} vidéos</p>
                  )}
                </h4>
              </div>
              <div
                style={{
                  fontSize: "1.2em",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2%",
                }}
              >
                {dataChannel?.data?.meta?.description.length >= 70 ? (
                  <p>
                    {dataChannel?.data?.meta?.description.substring(0, 78) +
                      "..."}{" "}
                  </p>
                ) : (
                  <p>{dataChannel?.data?.meta?.description}</p>
                )}
              </div>
              <button
                onClick={() => {
                  if (user) {
                    AddSub(GetInfosSubsChannel(dataChannel))
                      .then((response) => setIsSubs(response?.data?.data))
                      .catch((error) => console.log(error));
                  } else return setOpen(true);
                }}
                style={{
                  display: "flex",
                  cursor: "pointer",
                  border: `${isSubs ? "1px solid black" : "none"}`,
                  marginBottom: "2%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${isSubs ? "#efeff1" : "black"}`,
                  marginRight: "5%",
                  color: `${isSubs ? "black" : "white"}`,
                  fontSize: "1.1em",
                  height: "50px",
                  width: "250px",
                  fontWeight: "550",
                  textAlign: "center",
                  borderRadius: "30px",
                }}
              >
                {isSubs ? (
                  <AiOutlineCheck color="black" />
                ) : (
                  <BsYoutube fontSize={30} style={{ marginRight: "3%" }} />
                )}
                <p>{isSubs ? "abonné" : "S'abonner"}</p>
              </button>
            </div>
            <ModalSub
              open={open}
              handleClose={handleClose}
              responsive={responsive}
            />
          </div>
          <MobileButtonAndContainer />
        </ContainerMobile>
      ) : (
        <ContainerDesktop
          Styles={{
            position: "relative",
            top: "11vh",
            left: "9.8vw",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            flexWrap: "wrap",
            border: "2px solid transparent",
            color: "black",
            width: "90%",
          }}
        >
          <div className="SectionImageChannel">
            <div
              style={{
                width: "100%",
                height: "65%",
              }}
            >
              {dataChannel?.data?.meta?.banner !== null ? (
                <img
                  width={"100%"}
                  height={"100%"}
                  alt={dataChannel?.data?.meta?.channelHandle}
                  src={dataChannel?.data?.meta?.banner[3]?.url}
                ></img>
              ) : (
                <div
                  style={{
                    backgroundColor: "white",
                    height: "100%",
                    width: "100%",
                  }}
                ></div>
              )}
            </div>
            <div
              style={{
                width: "100%",
                height: "35%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0px 0px 0px 2%",
                  height: "100%",
                }}
              >
                <img
                  style={{ borderRadius: "50%" }}
                  alt={dataChannel?.data?.meta?.title}
                  src={dataChannel?.data?.meta?.avatar[1]?.url}
                  width="100px"
                  height="100px"
                ></img>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  marginLeft: "2%",
                }}
              >
                <div style={{ width: "100%", marginBottom: "1%" }}>
                  <h4 style={{ fontSize: "20px", fontWeight: "400" }}>
                    {dataChannel?.data?.meta?.title}{" "}
                    {dataChannel?.data?.meta?.isVerified ? (
                      <VscVerifiedFilled />
                    ) : null}
                  </h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      display: "inline",
                      marginRight: "10px",
                      fontWeight: "600",
                    }}
                  >
                    {dataChannel?.data?.meta?.channelHandle}
                  </p>
                  <h4
                    style={{
                      display: "inline",
                      marginRight: "10px",
                      fontWeight: "400",
                    }}
                  >
                    {!dataChannel?.data?.meta?.subscriberCountText ? (
                      ""
                    ) : (
                      <p>
                        {dataChannel?.data?.meta?.subscriberCountText} d'abonnés
                      </p>
                    )}
                  </h4>
                  <h4
                    style={{
                      display: "inline",
                      marginRight: "10px",
                      fontWeight: "400",
                    }}
                  >
                    {dataChannel?.data?.meta?.videosCountText ===
                    "Aucune vidéo" ? (
                      dataChannel?.data?.meta?.videosCountText
                    ) : (
                      <p>{dataChannel?.data?.meta?.videosCountText} vidéos</p>
                    )}
                  </h4>
                </div>
                <div style={{ fontSize: "0.8em", width: "100%" }}>
                  {dataChannel?.data?.meta?.description.length >= 70 ? (
                    <p>
                      {dataChannel?.data?.meta?.description.substring(0, 78) +
                        "..."}{" "}
                    </p>
                  ) : (
                    <p>{dataChannel?.data?.meta?.description}</p>
                  )}
                </div>
              </div>
              <div
                style={{
                  width: "200px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    if (user) {
                      AddSub(GetInfosSubsChannel(dataChannel))
                        .then((response) => setIsSubs(response?.data?.data))
                        .catch((error) => console.log(error));
                    } else return setOpen(true);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    border: `${isSubs ? "none" : "1px solid black"}`,
                    justifyContent: `${isSubs ? "space-evenly" : "center"}`,
                    backgroundColor: `${isSubs ? "#efeff1" : "black"}`,
                    color: `${isSubs ? "black" : "white"}`,
                    fontSize: "18px",
                    height: "50px",
                    width: "128px",
                    fontWeight: "550",
                    textAlign: "center",
                    borderRadius: "30px",
                  }}
                >
                  {isSubs ? (
                    <>
                      abonné <AiOutlineCheck color="black" />
                    </>
                  ) : (
                    "S'abonner"
                  )}
                </button>
                <ModalSub open={open} handleClose={handleClose} />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "0vh 2vh 0px 2vh",
            }}
          >
            <ButtonAndContainer />
          </div>
        </ContainerDesktop>
      )}
    </>
  );
}

import * as React from "react";
import { ContentSectionMenu } from "./Elements/MenuContent";
import { BsCollectionPlay } from "react-icons/bs";
import { useContext } from "../Context/ContextProvider";
import { DeleteSubs, GetSubs } from "../actions/Actions";
import { AiOutlineCheck } from "react-icons/ai";
import { ContainerMobile } from "./Container/ContainerMobile";
import { ContainerDesktop } from "./Container/ContainerDesktop";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";

function Abonner() {
  const { user } = useContext();
  const navigate = useNavigate();
  const [Data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [responsive, setResponsive] = React.useState(window.innerWidth);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    const CheckResponsive = () => setResponsive(window.innerWidth);
    if (user) {
      GetSubs()
        .then((response) => {
          setData(response?.data?.data);
        })
        .catch((error) => console.log(error));
    }
    window.addEventListener("resize", CheckResponsive);
    return () => window.removeEventListener("resize", CheckResponsive);
  }, [user]);

  return (
    <>
      {responsive <= 1024 ? (
        <ContainerMobile
          styles={{
            position: "relative",
            height: `${!user ? "100vh" : "auto"}`,
            backgroundColor: `${!user ? "#efeff1" : "white"}`,
            top: `7vh`,
            left: `0px`,
            padding: "3px 0px 120px 0px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            border: "none",
            color: "black",
            width: "100%",
          }}
        >
          {!user ? (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: "2%",
                }}
              >
                <BiUserCircle fontSize={35} />
                <p style={{ marginLeft: "5px" }}>Connexion</p>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  height: "60vh",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MdOutlineVideoLibrary
                  style={{ marginBottom: "5%" }}
                  fontSize={200}
                />
                <h2 style={{ marginBottom: "2%" }}>Vous n'êtes pas connecté</h2>
                <p style={{ marginBottom: "3%", textAlign: "center" }}>
                  Connectez-vous maintenant pour mettre en ligne et enregistrer
                  des vidéos, et publier des commentaires
                </p>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    width: "25%",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    backgroundColor: "#065fd4",
                    borderRadius: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>Connexion</p>
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: `${responsive <= 500 ? "column" : "row"}`,
                justifyContent: `${
                  responsive <= 500 ? "flex-start" : "space-between"
                }`,
                flexWrap: "wrap",
                alignItems: "flex-start",
                border: "2px solid Transparent",
              }}
            >
              {Data.length === 0 ? (
                <p>Vous n'avez aucun abonnement</p>
              ) : !Data ? (
                <p>chargement...</p>
              ) : (
                Data.map((element, index) => {
                  return (
                    <div
                      style={{
                        width: `${
                          responsive <= 500
                            ? "100%"
                            : `${
                                responsive <= 700 && responsive > 500
                                  ? "50%"
                                  : "25%"
                              }`
                        }`,
                        display: "flex",
                        cursor: "pointer",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "20px 0px",
                        justifyContent: "center",
                      }}
                    >
                      <Link
                        to={`/Channel/${element?.channelId}`}
                        key={index}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          width: "100%",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: "50%", marginBottom: "1%" }}>
                          <img
                            alt={element?.channelTitle}
                            width={"100%"}
                            style={{ borderRadius: "50%" }}
                            src={element?.channelThumbnail}
                          ></img>
                        </div>
                        <h4 style={{ marginBottom: "1%" }}>
                          {element?.channelTitle}
                        </h4>
                        <p style={{ marginBottom: "8%" }}>
                          {element?.numberSubs}
                        </p>
                      </Link>
                      <button
                        onClick={() => {
                          if (user) {
                            DeleteSubs(element?.channelId)
                              .then((response) => {
                                setData(response?.data?.data);
                                setOpen(true);
                              })
                              .catch((error) => console.log(error));
                          }
                        }}
                        style={{
                          border: "none",
                          width: "48%",
                          cursor: "pointer",
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          backgroundColor: "#efeff1",
                          borderRadius: "30px",
                          fontWeight: "550",
                          height: "50px",
                        }}
                      >
                        abonné <AiOutlineCheck color="black" />
                      </button>
                    </div>
                  );
                })
              )}
              <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Vous vous etes désabonné avec <strong>succès!</strong>
                </Alert>
              </Snackbar>
            </div>
          )}
        </ContainerMobile>
      ) : (
        <ContainerDesktop
          Styles={{
            position: "relative",
            width: "90%",
            height: `${user ? "auto" : "80vh"}`,
            display: "flex",
            top: "11vh",
            left: "9.8vw",
            padding: `${user ? "20px 0px" : "0px"}`,
            flexDirection: `${user ? "row" : "column"}`,
            justifyContent: `${user ? "space-between" : "center"}`,
            flexWrap: "wrap",
            alignItems: `${user ? "flex-start" : "center"}`,
            border: "2px solid Transparent",
          }}
        >
          {user ? (
            <>
              {!Data.length ? (
                <p>Vous n'avez aucun abonnement</p>
              ) : !Data ? (
                <p>chargement...</p>
              ) : (
                Data.map((element, index) => {
                  return (
                    <div
                      style={{
                        width: "20%",
                        display: "flex",
                        cursor: "pointer",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "45vh",
                      }}
                    >
                      <Link
                        to={`/Channel/${element?.channelId}`}
                        key={index}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          display: "flex",
                          width: "100%",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: "50%", marginBottom: "1%" }}>
                          <img
                            alt={element?.channelTitle}
                            width={"100%"}
                            style={{ borderRadius: "50%" }}
                            src={element?.channelThumbnail}
                          ></img>
                        </div>
                        <h4 style={{ marginBottom: "1%" }}>
                          {element?.channelTitle}
                        </h4>
                        <p style={{ marginBottom: "8%" }}>
                          {element?.numberSubs}
                        </p>
                      </Link>
                      <button
                        onClick={() => {
                          if (user) {
                            DeleteSubs(element?.channelId)
                              .then((response) => {
                                setData(response?.data?.data);
                                setOpen(true);
                              })
                              .catch((error) => console.log(error));
                          }
                        }}
                        style={{
                          border: "none",
                          width: "48%",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "1vw",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          backgroundColor: "#efeff1",
                          borderRadius: "30px",
                          fontWeight: "550",
                          height: "15%",
                        }}
                      >
                        abonné <AiOutlineCheck color="black" />
                      </button>
                    </div>
                  );
                })
              )}
              <Snackbar
                open={open}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Vous vous etes désabonné avec <strong>succès!</strong>
                </Alert>
              </Snackbar>
            </>
          ) : (
            <ContentSectionMenu
              Logo={<BsCollectionPlay fontSize={120} />}
              title="Ne manquez pas les nouvelles vidéos"
              paragraphe="Connectez-vous pour découvrir les nouveautés de vos chaînes YouTube préférées"
            />
          )}
        </ContainerDesktop>
      )}
    </>
  );
}
export { Abonner };

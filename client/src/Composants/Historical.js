import * as React from "react";
import { ContentSectionMenu } from "./Elements/MenuContent";
import { RxCross1 } from "react-icons/rx";
import { TbSelect } from "react-icons/tb";
import { GoHistory } from "react-icons/go";
import {
  GetHistory,
  DeleteById,
  DeleteBySelect,
  DeleteAllHistory,
} from "../actions/Actions";
import { useContext } from "../Context/ContextProvider";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { ConvertlengthSeconds } from "../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ContainerMobile } from "./Container/ContainerMobile";
import { ContainerDesktop } from "./Container/ContainerDesktop";

function History() {
  const { user } = useContext();
  let location = useLocation();
  const navigate = useNavigate();
  const [History, setHistory] = React.useState([]);
  const [responsive, setResponsive] = React.useState(window.innerWidth);
  const [selectVideos, setSelectVideos] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [message, setMessage] = React.useState({
    reason: false,
    msg: "",
  });
  const [open, setOpen] = React.useState({
    one: false,
    two: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  React.useEffect(() => {
    async function FetchData() {
      const href = location?.search.slice(0, 8);
      const value = location?.search.slice(8);
      //console.log("value", value);
      switch (href) {
        case "?search=":
          return GetHistory(`?search=${value}`)
            .then((response) => {
              setHistory(response);
            })
            .catch((error) => {
              console.log("error", error);
              const response = error?.response?.data;
              if (response?.reason === "bad search") {
                setMessage({ reason: true, msg: response?.message });
              }
            });
        default:
          return GetHistory()
            .then((response) => {
              setHistory(response);
            })
            .catch((error) => console.log(error));
      }
    }
    const CheckResponsive = () => setResponsive(window.innerWidth);
    if (user) {
      FetchData();
    }
    window.addEventListener("resize", CheckResponsive);
    return () => window.removeEventListener("resize", CheckResponsive);
  }, [user, location]);

  const Content =
    History?.data?.data?.length !== 0 ? (
      <div
        style={{
          width: `${responsive <= 1024 ? "100%" : "78%"}`,
        }}
      >
        {History?.data?.data.map((element, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: `${responsive <= 700 ? "column" : "row"}`,
                alignItems: `${responsive <= 700 ? "center" : "flex-start"}`,
                justifyContent: "flex-start",
                border: "1px solid transparent",
                width: "100%",
                height: `${responsive <= 700 ? "auto" : "175px"}`,
                marginBottom: `${responsive <= 700 ? "5%" : "3%"}`,
                boxSizing: "border-box",
              }}
            >
              <Link
                to={`/watch/${element?.idVideo}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: `${responsive <= 700 ? "100%" : "auto"}`,
                  backgroundColor: `${
                    selectVideos.includes(element?.idVideo)
                      ? "#B9D9F5"
                      : "white"
                  }`,
                }}
              >
                <div
                  style={{
                    marginLeft: `${responsive <= 700 ? "0px" : "2%"}`,
                    position: "relative",
                    width: `${
                      responsive <= 700
                        ? `${responsive <= 550 ? "100%" : "70%"}`
                        : "auto"
                    }`,
                  }}
                >
                  <img
                    alt={element?.title}
                    src={element?.miniature}
                    height="175px"
                    width={`${responsive <= 700 ? "100%" : "300px"}`}
                    style={{ borderRadius: "10px" }}
                  ></img>
                  <div
                    className={`${
                      element?.lengthSeconds === "EN DIRECT"
                        ? "IndicatorLive"
                        : "IndicatorView"
                    }`}
                  >
                    <p style={{ margin: "0.3em", fontWeight: "600" }}>
                      {ConvertlengthSeconds(element?.lengthSeconds)}
                    </p>
                  </div>
                </div>
              </Link>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginLeft: `${responsive <= 700 ? "0px" : "2%"}`,
                  marginBottom: `${responsive <= 700 ? "15px" : "0px"}`,
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  height: "100%",
                  width: `${responsive <= 700 ? "100%" : "350px"}`,
                  backgroundColor: `${
                    selectVideos.includes(element?.idVideo)
                      ? "#B9D9F5"
                      : "white"
                  }`,
                }}
              >
                <Link
                  to={`/watch/${element?.idVideo}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
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
                    {element?.title?.length >= 30
                      ? element?.title.substring(0, 30) + "..."
                      : element?.title}
                  </p>
                </Link>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
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
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                      MarginLeft: "5px",
                      marginRight: "5px",
                    }}
                  ></div>
                  <p
                    style={{
                      MarginLeft: "5px",
                      marginRight: "5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {element?.viewCount} vues
                  </p>
                </div>
                <Link
                  to={`/watch/${element?.idVideo}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: `${responsive <= 700 ? "0.80em" : "1em"}`,
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    {element?.description?.length >= 120
                      ? element?.description.substring(0, 120) + "..."
                      : element?.description}
                  </p>
                </Link>
              </div>
              <div
                style={{
                  width: `${responsive <= 400 ? "100%" : "170px"}`,
                  height: "100%",
                  display: "flex",
                  flexDirection: `${responsive <= 700 ? "row" : "column"}`,
                  gap: "10px",
                  alignItems: `${responsive <= 1024 ? "center" : "flex-start"}`,
                  justifyContent: `${
                    responsive <= 1024 ? "space-evenly" : "flex-start"
                  }`,
                  backgroundColor: `${
                    selectVideos.includes(element?.idVideo)
                      ? "#B9D9F5"
                      : "white"
                  }`,
                }}
              >
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                  onClick={() => {
                    DeleteById(element?.idVideo)
                      .then((response) => {
                        setHistory(response);
                        setOpen((prev) => {
                          return { ...prev, one: true };
                        });
                      })
                      .catch((error) => console.log(error));
                  }}
                >
                  <RxCross1 fontSize={35} />
                </button>
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                  onClick={() => {
                    if (selectVideos.includes(element?.idVideo)) {
                      setSelectVideos((prev) => {
                        return prev.filter(
                          (value) => value !== element?.idVideo,
                        );
                      });
                    } else {
                      setSelectVideos((prev) => [...prev, element?.idVideo]);
                    }
                  }}
                >
                  <TbSelect fontSize={35} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div>Cette liste ne contient aucune vidéo.</div>
    );

  return (
    <>
      {responsive <= 1024 ? (
        <ContainerMobile
          styles={{
            position: "relative",
            height: `${!user ? "100vh" : "auto"}`,
            backgroundColor: `${!user ? "#efeff1" : "white"}`,
            top: `7vh`,
            padding: "3px 0px 120px 0px",
            display: "flex",
            alignItems: `${!user ? "center" : "flex-start"}`,
            flexDirection: "column",
            justifyContent: `${!user ? "center" : "flex-start"}`,
            flexWrap: "wrap",
            border: "none",
            color: "black",
            width: "100%",
          }}
        >
          {!user ? (
            <ContentSectionMenu
              Logo={<GoHistory fontSize={120} />}
              title="Effectuez le suivi des vidéos que vous visionnez"
              paragraphe="Impossible d'afficher l'historique des vidéos regardées lorsque vous n'êtes pas connecté."
            />
          ) : (
            <section
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "300px",
                  paddingTop: "10px",
                  width: "100%",
                  marginBottom: "15px",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "97%",
                    height: "40px",
                    border: "none",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    style={{ width: "85%", height: "100%" }}
                    type="text"
                    aria-label="search history"
                    placeholder="Rechercher dans l'historique..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setMessage({ reason: false, msg: "" });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.code === "Enter") {
                        navigate(`/Historique?search=${search}`);
                      }
                    }}
                  />
                  {search !== "" ? (
                    <button
                      onClick={() => {
                        setSearch("");
                        navigate("/Historique");
                      }}
                      style={{
                        width: "15%",
                        border: "none",
                        height: "98%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RxCross1 />
                    </button>
                  ) : null}
                </div>
                {message.reason ? (
                  <p style={{ color: "red" }}>{message.msg}</p>
                ) : null}
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    setSelectVideos(() => {
                      return History?.data?.data.map((items) => items?.idVideo);
                    });
                  }}
                >
                  Tout Selectionner
                </button>
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => setSelectVideos([])}
                >
                  Tout Deselectionner
                </button>
                <p style={{ fontSize: "1em" }}>
                  Nombre de Vidéos selectionner :{" "}
                  <span>{selectVideos?.length}</span>
                </p>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    DeleteAllHistory()
                      .then((response) => {
                        setHistory(response);
                        setOpen((prev) => {
                          return { ...prev, two: true };
                        });
                      })
                      .catch((error) => console.log(error));
                  }}
                >
                  Suprimmer tout L'historique
                </button>
                <button
                  style={{
                    backgroundColor: `${
                      selectVideos?.length === 0 ? "#F6BFB9" : "red"
                    }`,
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    DeleteBySelect(selectVideos)
                      .then((response) => {
                        setHistory(response);
                        setOpen((prev) => {
                          return { ...prev, one: true };
                        });
                        setSelectVideos([]);
                      })
                      .catch((error) => console.log(error));
                  }}
                  disabled={selectVideos?.length === 0 ? true : false}
                >
                  suprimmer
                </button>
                <Snackbar
                  open={open.one}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Vous avez suprimmé la vidéo avec <strong>succès!</strong>
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={open.two}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Vous avez suprimmé toutes les vidéos avec{" "}
                    <strong>succès!</strong>
                  </Alert>
                </Snackbar>
              </div>
              {!History ? <p>chargement...</p> : Content}
            </section>
          )}
        </ContainerMobile>
      ) : (
        <ContainerDesktop
          Styles={{
            position: "relative",
            width: "90%",
            height: `${!user ? "80vh" : "auto"}`,
            display: "flex",
            top: "11vh",
            left: "9.8vw",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid Transparent",
          }}
        >
          {!user ? (
            <ContentSectionMenu
              Logo={<GoHistory fontSize={120} />}
              title="Effectuez le suivi des vidéos que vous visionnez"
              paragraphe="Impossible d'afficher l'historique des vidéos regardées lorsque vous n'êtes pas connecté."
            />
          ) : (
            <section
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
              }}
            >
              {!History ? <p>chargement...</p> : Content}
              <div
                style={{
                  position: "fixed",
                  top: "11vh",
                  paddingTop: "20px",
                  zIndex: "0",
                  height: "400px",
                  right: "0px",
                  width: "20%",
                  display: "flex",
                  gap: "6px",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "97%",
                    height: "40px",
                    border: "none",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                  }}
                >
                  <input
                    style={{ width: "85%", height: "100%" }}
                    type="text"
                    aria-label="search history"
                    placeholder="Rechercher dans l'historique..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setMessage({ reason: false, msg: "" });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.code === "Enter") {
                        navigate(`/Historique?search=${search}`);
                      }
                    }}
                  />
                  {search !== "" ? (
                    <button
                      onClick={() => {
                        setSearch("");
                        navigate("/Historique");
                      }}
                      style={{
                        width: "15%",
                        border: "none",
                        height: "98%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RxCross1 />
                    </button>
                  ) : null}
                </div>
                {message.reason ? (
                  <p style={{ color: "red" }}>{message.msg}</p>
                ) : null}
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    setSelectVideos(() => {
                      return History?.data?.data.map((items) => items?.idVideo);
                    });
                  }}
                >
                  Tout Selectionner
                </button>
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => setSelectVideos([])}
                >
                  Tout Deselectionner
                </button>
                <p style={{ fontSize: "1em" }}>
                  Nombre de Vidéos selectionner :{" "}
                  <span>{selectVideos?.length}</span>
                </p>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    DeleteAllHistory()
                      .then((response) => {
                        setHistory(response);
                        setOpen((prev) => {
                          return { ...prev, two: true };
                        });
                      })
                      .catch((error) => console.log(error));
                  }}
                >
                  Suprimmer tout L'historique
                </button>
                <button
                  style={{
                    backgroundColor: `${
                      selectVideos?.length === 0 ? "#F6BFB9" : "red"
                    }`,
                    color: "white",
                    border: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    padding: "5px",
                    borderRadius: "8px",
                  }}
                  onClick={() => {
                    DeleteBySelect(selectVideos)
                      .then((response) => {
                        setHistory(response);
                        setOpen((prev) => {
                          return { ...prev, one: true };
                        });
                        setSelectVideos([]);
                      })
                      .catch((error) => console.log(error));
                  }}
                  disabled={selectVideos?.length === 0 ? true : false}
                >
                  suprimmer
                </button>
                <Snackbar
                  open={open.one}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Vous avez suprimmé la vidéo avec <strong>succès!</strong>
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={open.two}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Vous avez suprimmé toutes les vidéos avec{" "}
                    <strong>succès!</strong>
                  </Alert>
                </Snackbar>
              </div>
            </section>
          )}
        </ContainerDesktop>
      )}
    </>
  );
}
export { History };

import * as React from "react";
import "../App.css";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BiUserCircle, BiArrowBack } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { ButtonNavPrimaryOne } from "./Elements/Buttons";
import { AiFillFire } from "react-icons/ai";
import { PiMusicNoteBold } from "react-icons/pi";
import { LuGamepad2 } from "react-icons/lu";
import {
  BsNewspaper,
  BsLightbulb,
  BsCollectionPlay,
  BsYoutube,
} from "react-icons/bs";
import { useContext } from "../Context/ContextProvider";
import { GoTrophy } from "react-icons/go";
import { GiClothesline } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Avatar, Alert } from "@mui/material";
import { GetSubs } from "../actions/Actions";
import { UserAccount } from "./Elements/modals/MenuMobile";
import Snackbar from "@mui/material/Snackbar";

export function BarSearch() {
  const [valeur, setValeur] = React.useState(false);
  const [champs, setChamps] = React.useState("");
  const [display, setDisplay] = React.useState({
    ParamLogin: false,
    subs: false,
  });

  const navigate = useNavigate();
  //const href = useHref();
  const { setLoadNextContentSearch, setToken, user, setUser } = useContext();
  const [open, setOpen] = React.useState(false);
  const [subscriber, setSubscriber] = React.useState([]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("jwt-auth");
  };
  const IsTranslate = () => {
    setValeur(!valeur);
  };
  const HandleChange = (e) => setChamps(e.target.value);
  const Envoyer = () => {
    setLoadNextContentSearch([]);
    setToken("");
    if (window.scrollY > 0) {
      window.scroll(0, 0);
      // Remonter la barre de scroll pour une nouvelle recherche
    }
    navigate(`/Recherche/${champs}`);
  };
  const Retour = () => {
    navigate("/");
  };
  const handleKeyPress = (e) => {
    if (e.code === "Enter" || e.key === "Enter") {
      Envoyer();
    }
  };

  React.useEffect(() => {
    if (user) {
      GetSubs()
        .then((response) => {
          setSubscriber(response?.data?.data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);
  // source du problème le useeffect de l'appBar
  // user est udefined avant le localstorage se créer.
  //console.log("userTARZ", user);

  return (
    <>
      <AppBar
        role="menubar"
        data-testid="MenuDesktop"
        sx={{
          width: "100%",
          height: "9vh",
          margin: "0 auto",
          display: "grid",
          boxShadow: "none",
          backgroundColor: "white",
          gridTemplateColumns: "15% 70% 15%",
          boxSizing: "border-box",
          color: "black",
          border: "1px solid transparent",
          zIndex: "1",
        }}
      >
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            Vous êtes <strong>Déconnectez</strong>
          </Alert>
        </Snackbar>
        <div className="DivLogoYoutube">
          <div className="mouseOver" role="menu" onClick={() => IsTranslate()}>
            <AiOutlineMenu fontSize={24} />
          </div>
          <div onClick={Retour} className="mouseOver">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <BsYoutube
                fontSize={30}
                style={{ color: "red", marginRight: "4px" }}
              />
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: "30px",
                  fontFamily: "kenya",
                }}
              >
                YouTube
              </span>
              <p
                style={{
                  fontSize: "10px",
                  height: "35px",
                  alignSelf: "flex-end",
                  marginLeft: "0.4em",
                }}
              >
                FR
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1000px",
            }}
          >
            <input
              data-testid="Recherche"
              onKeyDown={handleKeyPress}
              type="text"
              className="Recherche"
              placeholder="Rechercher"
              value={champs}
              onChange={HandleChange}
            ></input>
            <Link
              to={`/Recherche/${champs}`}
              style={{
                width: "8%",
                textDecoration: "none",
                color: "black",
              }}
            >
              <button
                className="mouseOver"
                style={{
                  height: "52px",
                  border: "none",
                  width: "100%",
                  backgroundColor: "#efeff1",
                  display: "flex",
                  borderRadius: "0px 40px 40px 0px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AiOutlineSearch fontSize={28} />
              </button>
            </Link>
          </div>
        </div>

        {user ? (
          <div
            onClick={() =>
              setDisplay((prev) => {
                return { ...prev, ParamLogin: !prev.ParamLogin };
              })
            }
            style={{
              width: "170px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Avatar
              alt={user?.username}
              src={user?.image}
              sx={{ width: 45, height: 45, bgcolor: user?.color }}
            >
              {user?.username.charAt(0)}
            </Avatar>
            {display.ParamLogin ? (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  zIndex: "5",
                  top: "65px",
                  right: "45px",
                  width: "250px",
                  height: "150px",
                  border: "2px solid black",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p>
                  <span>logo</span>
                  Paramètres
                </p>
                <div>
                  <p></p>
                  <span>logo</span>
                  <p>nom d'utilisateur: {user?.username}</p>
                  <p>email: {user?.email}</p>
                  <p
                    onClick={() => {
                      Logout();
                      setOpen(true);
                    }}
                  >
                    Se deconnecter
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div
            style={{
              width: "170px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to={"/login"}
            >
              <div className="StyleMenuBtnConnecter">
                <div
                  style={{
                    width: "20%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BiUserCircle fontSize={35} color="#065fd4" />
                </div>

                <p
                  style={{
                    color: "#065fd4",
                    fontSize: "16px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-around",
                    whiteSpace: "nowrap",
                    alignItems: "center",
                    width: "60%",
                    height: "100%",
                  }}
                >
                  Se connecter
                </p>
              </div>
            </Link>
          </div>
        )}
      </AppBar>

      <div
        data-testid="LateralMenu"
        className="Naviguer"
        style={{
          transform: valeur ? "translateX(0%)" : "translateX(-100%)",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0vh 2vh 5vh 2vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "250px",
              border: "1px solid transparent",
            }}
          >
            <div
              data-testid="imgForTranslateMenu"
              onClick={() => IsTranslate()}
            >
              <AiOutlineMenu fontSize={24} />
            </div>
            <div
              onClick={Retour}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <BsYoutube
                fontSize={32}
                style={{ color: "red", marginRight: "4px" }}
              />
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: "32px",
                  fontFamily: "kenya",
                }}
              >
                YouTube
              </span>
              <p
                style={{
                  display: "flex",
                  fontSize: "10px",
                  height: "35px",
                  alignSelf: "flex-start",
                  marginLeft: "0.4em",
                }}
              >
                FR
              </p>
            </div>
          </div>
        </div>
        <ButtonNavPrimaryOne
          route="/"
          logo={<GoHome fontSize={35} />}
          texte="Acceuil"
        />
        <ButtonNavPrimaryOne
          route="/abonnements"
          logo={<BsCollectionPlay fontSize={35} />}
          texte="Abonnements"
        />
        <ButtonNavPrimaryOne
          route="/Bibliothéque"
          logo={<MdOutlineVideoLibrary fontSize={35} />}
          texte="Bibliothèque"
        />
        <ButtonNavPrimaryOne
          route="/Historique"
          logo={<GoHistory fontSize={35} />}
          texte="Historique"
        />

        {user ? (
          <div
            style={{
              width: "85%",
              display: "flex",
              flexDirection: "column",
              borderStyle: "solid none solid none",
              borderWidth: "1px 0px 1px 0px",
              padding: "10px 0px",
              alignItems: "center",
              gap: "3px",
              margin: "5px 0px",
              fontSize: "1em",
            }}
          >
            <p>Bienvenue</p>
            <h4 style={{ marginBottom: "7px" }}>{user?.username}</h4>

            <span
              style={{
                fontWeight: "500",
                marginBottom: "8px",
                alignSelf: "flex-start",
              }}
            >
              Abonnements
            </span>
            <div
              style={{
                width: "100%",
                gap: "3px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {!subscriber.length
                ? "Aucun Abonnements"
                : subscriber.map((element, index) => {
                    const show = display.subs ? subscriber.length : 15;
                    if (index < show) {
                      return (
                        <Link
                          to={`/Channel/${element?.channelId}`}
                          className="HoverColorGray"
                          key={index}
                          style={{
                            textDecoration: "none",
                            color: "black",
                            display: "flex",
                            height: "50px",
                            width: "100%",
                            borderRadius: "10px",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            alignItems: "flex-start",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div
                            style={{
                              width: "25%",
                              display: "flex",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              alt={element?.channelTitle}
                              width="40px"
                              height="40px"
                              style={{ borderRadius: "50%" }}
                              src={element?.channelThumbnail}
                            ></img>
                          </div>
                          <div
                            style={{
                              width: "75%",
                              display: "flex",
                              height: "100%",
                              alignItems: "center",
                              paddingLeft: "5px",
                              justifyContent: "flex-start",
                            }}
                          >
                            <p>{element?.channelTitle}</p>
                          </div>
                        </Link>
                      );
                    } else return null;
                  })}
            </div>
            <button
              onClick={() =>
                setDisplay((prev) => {
                  return { ...prev, subs: !prev.subs };
                })
              }
              style={{
                width: "100%",
                border: "none",
                margin: "10px 0px",
                borderRadius: "40px",
                height: "35px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {display.subs ? "Voir Moins" : "Voir Plus"}
            </button>
          </div>
        ) : (
          <div className="StyleMenuBtn">
            <p style={{ marginBottom: "15px" }}>
              Connectez-vous à YouTube pour cliquer sur "J'aime", ajouter un
              commentaire et vous abonner.
            </p>
            <div className="StyleMenuBtnConnecter">
              <div
                style={{
                  width: "20%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BiUserCircle fontSize={35} color="#065fd4" />
              </div>
              <Link
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                to={"/login"}
              >
                <p
                  style={{
                    color: "#065fd4",
                    fontSize: "16px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-around",
                    whiteSpace: "nowrap",
                    alignItems: "center",
                    width: "60%",
                    height: "100%",
                  }}
                >
                  Se connecter
                </p>
              </Link>
            </div>
          </div>
        )}

        <div style={{ width: "80%", marginBottom: "2vh" }}>
          <h4 style={{ fontSize: "18px" }}>Explorer</h4>
        </div>
        <ButtonNavPrimaryOne
          route="/tendances"
          logo={<AiFillFire fontSize={35} />}
          texte="Tendances"
        />
        <ButtonNavPrimaryOne
          route="/musique"
          logo={<PiMusicNoteBold fontSize={35} />}
          texte="Musique"
        />
        <ButtonNavPrimaryOne
          route="/Videosgames"
          logo={<LuGamepad2 fontSize={35} />}
          texte="Jeux vidéos"
        />
        <ButtonNavPrimaryOne
          route="/Actus"
          logo={<BsNewspaper fontSize={35} />}
          texte="Actualités"
        />
        <ButtonNavPrimaryOne
          route="/Sport"
          logo={<GoTrophy fontSize={35} />}
          texte="Sport"
        />
        <ButtonNavPrimaryOne
          route="/Culture"
          logo={<BsLightbulb fontSize={35} />}
          texte="Savoir et culture"
        />
        <ButtonNavPrimaryOne
          route="/Mode"
          logo={<GiClothesline fontSize={35} />}
          texte="Mode et Beauté"
        />
      </div>
      {valeur ? (
        <div
          className="OmberDiv"
          data-testid="Shadow"
          onClick={() => IsTranslate()}
        ></div>
      ) : null}
    </>
  );
}

export const MobileBarSearch = ({ name = "" }) => {
  //const [valeur, setValeur] = React.useState(false);
  const [champs, setChamps] = React.useState("");
  const { setLoadNextContentSearch, setToken, user, setUser } = useContext();
  const [DisplaySearch, setDisplaySearch] = React.useState(false);
  const [displayMenu, setDisplayMenu] = React.useState(false);
  const navigate = useNavigate();

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("jwt-auth");
    setDisplayMenu(false);
  };

  const HandleChange = (e) => setChamps(e.target.value);
  const Envoyer = () => {
    setLoadNextContentSearch([]);
    setToken("");
    if (window.scrollY > 0) {
      window.scroll(0, 0);
      // Remonter la barre de scroll pour une nouvelle recherche
    }
    navigate(`/Recherche/${champs}`);
    setDisplaySearch(!DisplaySearch);
  };
  const Retour = () => {
    navigate("/");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.code === "Enter") {
      Envoyer();
    }
  };
  return (
    <>
      {displayMenu ? (
        <UserAccount
          Logout={Logout}
          user={user}
          setDisplayMenu={setDisplayMenu}
        />
      ) : null}
      <AppBar
        role="menubar"
        data-testid="MenuMobile"
        sx={{
          width: "100%",
          height: "7vh",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "flex-start",
          justifyContent: "space-between",
          boxSizing: "border-box",
          color: "black",
          border: "1px solid transparent",
          zIndex: "1",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "1%",
            justifyContent: "flex-start",
            flexWrap: "nowrap",
            overflow: `${name === "" ? "auto" : "hidden"}`,
            height: "100%",
            width: `${name === "" ? "35%" : "80%"}`,
          }}
        >
          <BsYoutube
            onClick={Retour}
            fontSize={30}
            style={{ color: "red", marginRight: "4px", cursor: "pointer" }}
          />
          <span
            onClick={() => {
              if (name === "") {
                Retour();
              }
              return null;
            }}
            style={{
              fontWeight: `${name === "" ? "normal" : "550"}`,
              whiteSpace: "nowrap",
              fontSize: `${name === "" ? "30px" : "1.2em"}`,
              marginLeft: `${name === "" ? "0px" : "15px"}`,
              cursor: `${name === "" ? "pointer" : "default"}`,
              fontFamily: `${name === "" ? "Kenya" : "Arial, sans-serif"}`,
            }}
          >
            {name === ""
              ? "YouTube"
              : `${name.length > 30 ? name.substring(0, 30) + "..." : name}`}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            width: `${name === "" ? "auto" : "20%"}`,
          }}
        >
          <AiOutlineSearch
            onClick={() => setDisplaySearch(!DisplaySearch)}
            fontSize={48}
            style={{ marginLeft: "3%", cursor: "pointer" }}
          />
          {name !== "" ? null : user ? (
            <Avatar
              onClick={() => setDisplayMenu(true)}
              alt={user?.username}
              src={user?.image}
              sx={{ width: 40, height: 40, bgcolor: user?.color }}
            >
              {user?.username.charAt(0)}
            </Avatar>
          ) : (
            <BiUserCircle fontSize={48} onClick={() => navigate("/login")} />
          )}
        </div>
      </AppBar>
      {DisplaySearch ? (
        <>
          <div
            style={{
              width: "100%",
              height: "7vh",
              position: "fixed",
              top: "0px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#efeff1",
              alignItems: "center",
              justifyContent: "space-around",
              boxSizing: "border-box",
              color: "black",
              border: "1px solid transparent",
              zIndex: "10",
            }}
          >
            <p
              style={{ width: "10%" }}
              onClick={() => setDisplaySearch(!DisplaySearch)}
            >
              <BiArrowBack fontSize={28} />
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "row",
                height: "80%",
                justifyContent: "center",
                width: "90%",
              }}
            >
              <input
                style={{
                  height: "100%",
                  width: "70%",
                  paddingLeft: "5%",
                  backgroundColor: "#DFDFDF",
                  border: "none",
                  borderRadius: "40px 0 0 40px",
                  outline: "none",
                }}
                data-testid="Recherche"
                onKeyDown={handleKeyPress}
                type="text"
                className="Recherche"
                placeholder="Rechercher sur Youtube"
                value={champs}
                onChange={HandleChange}
              ></input>
              {champs === "" ? null : (
                <button
                  style={{
                    height: "100%",
                    border: "none",
                    width: "15%",
                    backgroundColor: "#DFDFDF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setChamps("")}
                >
                  <RxCross1 fontSize={28} />
                </button>
              )}
              <button
                style={{
                  height: "100%",
                  border: "none",
                  width: "15%",
                  backgroundColor: "#DFDFDF",
                  display: "flex",
                  borderRadius: "0px 40px 40px 0px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={Envoyer}
              >
                <AiOutlineSearch fontSize={28} />
              </button>
            </div>
          </div>
          <div className="OmberDiv"></div>
        </>
      ) : null}
    </>
  );
};

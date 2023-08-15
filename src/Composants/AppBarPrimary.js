import * as React from "react";
import "../App.css";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BiUserCircle, BiArrowBack } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { ButtonNavPrimaryOne } from "../utils/utils";
import { AiFillFire } from "react-icons/ai";
import { PiMusicNoteBold } from "react-icons/pi";
import { LuGamepad2 } from "react-icons/lu";
import { BsNewspaper, BsLightbulb, BsCollectionPlay, BsYoutube } from "react-icons/bs";
import { useContext } from "../Context/ContextProvider";
import { GoTrophy } from "react-icons/go";
import { GiClothesline } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

export function BarSearch() {
  const [valeur, setValeur] = React.useState(false);
  const [champs, setChamps] = React.useState("");
  const navigate = useNavigate();
  const { setLoadNextContentSearch, setToken } = useContext();

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
    if (e.code === "Enter") {
      Envoyer();
    }
  };
  return (
    <>
      <AppBar
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
        <div className="DivLogoYoutube">
          <div className="mouseOver" onClick={() => IsTranslate()}>
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
      </AppBar>

      <div
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
            <div onClick={() => IsTranslate()}>
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
          logo={<GoHome fontSize={28} />}
          texte="Accueil"
          width={"100%"}
          height="6vh"
        />
        <ButtonNavPrimaryOne
          route="/abonnements"
          logo={<BsCollectionPlay fontSize={28} />}
          texte="Abonnements"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/Bibliothéque"
          logo={<MdOutlineVideoLibrary fontSize={28} />}
          texte="Bibliothéque"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/Historique"
          logo={<GoHistory fontSize={28} />}
          texte="Historique"
          height="6vh"
          width={"100%"}
        />
        <hr style={{ height: "3px", color: "black" }} />

        <div className="StyleMenuBtn">
          <p style={{ marginBottom: "3%" }}>
            Connectez-vous à YouTube pour cliquer sur "J'aime", ajouter un
            commentaire et vous abonner.
          </p>
          <Link
            to={"/sign-in/*"}
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              marginTop: "2%",
              justifyContent: "center",
              alignItems: "center",
            }}
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
        <div style={{ width: "80%", marginBottom: "2vh" }}>
          <h4 style={{ fontSize: "18px" }}>Explorer</h4>
        </div>
        <ButtonNavPrimaryOne
          route="/tendances"
          logo={<AiFillFire fontSize={28} />}
          texte="Tendances"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/musique"
          logo={<PiMusicNoteBold fontSize={28} />}
          texte="Musique"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/Videosgames"
          logo={<LuGamepad2 fontSize={28} />}
          texte="Jeux vidéos"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/Actus"
          logo={<BsNewspaper fontSize={28} />}
          texte="Actualités"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/Sport"
          logo={<GoTrophy fontSize={28} />}
          texte="Sport"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/Culture"
          logo={<BsLightbulb fontSize={28} />}
          texte="Savoir et culture"
          height="6vh"
          width={"100%"}
        />
        <ButtonNavPrimaryOne
          route="/Mode"
          logo={<GiClothesline fontSize={28} />}
          texte="Mode et Beauté"
          height="6vh"
          width={"100%"}
        />
      </div>
      {valeur ? (
        <div className="OmberDiv" onClick={() => IsTranslate()}></div>
      ) : null}
    </>
  );
}

export const MobileBarSearch = ({name = ""}) => {
  //const [valeur, setValeur] = React.useState(false);
  const [champs, setChamps] = React.useState("");
  const { setLoadNextContentSearch } = useContext();
  const [DisplaySearch, setDisplaySearch] = React.useState(false);
  const navigate = useNavigate();

  const HandleChange = (e) => setChamps(e.target.value);
  const Envoyer = () => {
    setLoadNextContentSearch([]);
    navigate(`/Recherche/${champs}`);
  };
  const Retour = () => {
    navigate("/");
  };
  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      Envoyer();
    }
  };
  return (
    <>
      <AppBar
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
            justifyContent: "center",
            height: "100%",
          }}
        >
          <BsYoutube
            onClick={Retour}
            fontSize={30}
            style={{ color: "red", marginRight: "4px", cursor: "pointer"}}
          />
          <span
            onClick={() => {
                if(name === ""){
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
            {name  === "" ? "YouTube" : `${name}`}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "13%",
            height: "80%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AiOutlineSearch
            onClick={() => setDisplaySearch(!DisplaySearch)}
            fontSize={50}
            style={{ marginLeft: "3%", cursor: "pointer" }}
          />
          {name !== "" ? null :
          <BiUserCircle fontSize={50} />}
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

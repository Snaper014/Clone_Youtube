import * as React from "react";
import { ContentSectionMenu } from "../utils/utils";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { MobileBarSearch } from "./AppBarPrimary";
import { MobileSecondaryBar } from "./AppBarSecondary";

function Biblio() {
  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  React.useEffect(() => {
    const CheckResponsive = () => {
      if (window.innerWidth <= 1024) {
        setResponsive(true);
      } else {
        setResponsive(false);
      }
    };
    window.addEventListener("resize", CheckResponsive);
    return () => window.removeEventListener("resize", CheckResponsive);
  }, []);
  return (
    <>
      {responsive ? (
        <>
          <MobileBarSearch />
          <MobileSecondaryBar />
          <div
            style={{
              position: "relative",
              height: "100vh",
              backgroundColor: "#efeff1",
              top: `${responsive ? "7vh" : "11vh"}`,
              left: `${responsive ? "0px" : "9.8vw"}`,
              padding: "3px 0px 0px 0px",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "flex-start",
              flexWrap: "wrap",
              border: "2px solid rgb(0, 255, 149)",
              color: "black",
              width: "100%",
            }}
          >
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
          </div>
        </>
      ) : (
        <ContentSectionMenu
          Logo={<MdOutlineVideoLibrary fontSize={120} />}
          title="Regardez vos vidéos préférées"
          paragraphe={`Connectez-vous pour accéder aux vidéos pour lesquelles vous avez cliqué sur "J'aime" ou que vous avez enregistrées.`}
        />
      )}
    </>
  );
}

export { Biblio };

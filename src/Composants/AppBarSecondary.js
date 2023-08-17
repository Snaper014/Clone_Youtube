import * as React from "react";
import "../App.css";
import { GoHome } from "react-icons/go";
import { BsCollectionPlay, BsFileEarmarkPlay } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { ButtonNaviguation } from "../utils/utils";

function AppBarSecondary() {
  return (
    <div className="NaviguationGauche">
      <ButtonNaviguation
        route="/"
        logo={<GoHome fontSize={28} />}
        texte="Acceuil"
      />
      <ButtonNaviguation
        route="/Shorts"
        logo={<BsFileEarmarkPlay fontSize={28} />}
        texte="Shorts"
      />
      <ButtonNaviguation
        route="/abonnements"
        logo={<BsCollectionPlay fontSize={28} />}
        texte="Abonnements"
      />
      <ButtonNaviguation
        route="/Bibliothéque"
        logo={<MdOutlineVideoLibrary fontSize={28} />}
        texte="Bibliothèque"
      />
      <ButtonNaviguation
        route="/Historique"
        logo={<GoHistory fontSize={28} />}
        texte="Historique"
      />
    </div>
  );
}

function MobileSecondaryBar() {
  return (
    <div
      style={{
        width: "100%",
        height: "7vh",
        position: "fixed",
        bottom: "0px",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-around",
        boxSizing: "border-box",
        color: "black",
        border: "1px solid transparent",
        zIndex: "2",
      }}
    >
      <ButtonNaviguation
        route="/"
        logo={<GoHome fontSize={20} />}
        width="25%"
        height="85%"
        texte="Acceuil"
      />
      <ButtonNaviguation
        route="/Shorts"
        logo={<BsFileEarmarkPlay fontSize={20} />}
        texte="Shorts"
        height="85"
        width="25%"
      />
      <ButtonNaviguation
        route="/Bibliothéque"
        logo={<MdOutlineVideoLibrary fontSize={20} />}
        texte="Bibliothèque"
        height="85%"
        width="25%"
      />
    </div>
  );
}

export { AppBarSecondary, MobileSecondaryBar };

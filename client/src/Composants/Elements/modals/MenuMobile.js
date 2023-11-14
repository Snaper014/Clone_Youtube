import * as React from "react";
import { RxCross1, RxExit } from "react-icons/rx";
import { Avatar } from "@mui/material";
import { ButtonNavPrimaryOne } from "../Buttons";
import { BsCollectionPlay } from "react-icons/bs";
import { GoHome, GoHistory } from "react-icons/go";
import { MdOutlineVideoLibrary } from "react-icons/md";

const UserAccount = ({ user, Logout, setDisplayMenu }) => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "20",
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        gap: "10px",
        display: "flex",
        overflowY: "scroll",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "10px",
          fontSize: "1.2em",
          marginBottom: "10px",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      >
        <RxCross1
          fontSize={30}
          onClick={() => setDisplayMenu((prev) => !prev)}
        />
        <h4>Compte</h4>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt={user?.username}
          src={user?.image}
          sx={{ width: 45, height: 45, bgcolor: user?.color }}
        >
          {user?.username.charAt(0)}
        </Avatar>
        <h4>{user?.username}</h4>
      </div>
      <ButtonNavPrimaryOne
        route="/"
        logo={<GoHome fontSize={30} />}
        texte="Acceuil"
      />
      <ButtonNavPrimaryOne
        route="/abonnements"
        logo={<BsCollectionPlay fontSize={30} />}
        texte="Abonnements"
      />
      <ButtonNavPrimaryOne
        route="/Bibliothéque"
        logo={<MdOutlineVideoLibrary fontSize={30} />}
        texte="Bibliothèque"
      />
      <ButtonNavPrimaryOne
        route="/Historique"
        logo={<GoHistory fontSize={30} />}
        texte="Historique"
      />
      <button
        onClick={() => Logout()}
        style={{
          width: "100%",
          backgroundColor: "white",
          border: "none",
          display: "flex",
          cursor: "pointer",
          flexDirection: "row",
          gap: "10px",
          marginTop: "15px",
          fontSize: "1.2em",
          alignItems: "flex-start",
        }}
      >
        <RxExit fontSize={30} />
        <h4>Se deconnecter</h4>
      </button>
    </div>
  );
};

export { UserAccount };

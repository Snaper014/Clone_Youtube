import * as React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

export const ButtonNaviguation = ({
    route,
    texte,
    logo,
    width = "80%",
    height = "13vh",
  }) => {
    return (
      <Link
        to={`${route}`}
        role="link"
        aria-describedby={`ButtonNaviguation-${texte}`}
        className="HoverColorGray"
        style={{
          textDecoration: "none",
          color: "black",
          height: `${height}`,
          display: "flex",
          borderRadius: "10px",
          width: `${width}`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logo}
          <p id={`ButtonNaviguation-${texte}`}>{texte}</p>
        </div>
      </Link>
    );
  };
  export const ButtonNavPrimaryOne = ({
    route,
    logo,
    texte,
    width = "100%",
    height = "auto",
  }) => {
    return (
      <Link
        to={`${route}`}
        style={{
          textDecoration: "none",
          color: "black",
          width: "75%",
          cursor: "pointer",
          margin: `${
            texte === "Historique" ? "0vh 2vw 3vh 2vw" : "0vh 2vw 0vh 2vw"
          }`,
        }}
      >
        <div
          className="HoverColorGray"
          style={{
            display: "flex",
            flexDirection: "row",
            borderRadius: "10px",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: `${width}`,
            fontSize: "18px",
            height: `${height}`,
            border: "none",
          }}
        >
          {logo}
          <button
            data-testid={`BTN-${texte}`}
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "18px",
            }}
          >
            {texte}
          </button>
        </div>
      </Link>
    );
  };
  
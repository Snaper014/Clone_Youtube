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
export const ButtonNavPrimaryOne = ({ route, logo, texte }) => {
  return (
    <Link
      to={`${route}`}
      className="HoverColorGray"
      style={{
        textDecoration: "none",
        color: "black",
        borderRadius: "10px",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        border: "none",
        flexDirection: "row",
        fontSize: "18px",
        width: "90%",
        height: "50px",
        margin: `${texte === "Historique" ? "10px 0px" : "5px 0px"}`,
      }}
    >
      <div
        style={{
          width: "30%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {logo}
      </div>
      <div
        style={{
          width: "70%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
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

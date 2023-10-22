import * as React from "react";
import "../../App.css";
import { BiUserCircle } from "react-icons/bi";
import { AppBarSecondary } from "../AppBarSecondary";
import { BarSearch } from "../AppBarPrimary";

export const ContentSectionMenu = ({ Logo, title, paragraphe }) => {
  return (
    <>
      <BarSearch />
      <AppBarSecondary />
      <div
        style={{
          position: "relative",
          width: "90%",
          display: "flex",
          top: "11vh",
          left: "9.8vw",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          border: "2px solid Transparent",
        }}
      >
        {Logo}
        <h2 style={{ margin: "1%" }}>{title}</h2>
        <p style={{ margin: "1%" }}>{paragraphe}</p>
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
          <button
            style={{
              color: "#065fd4",
              border: "none",
              backgroundColor: "transparent",
              fontSize: "16px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
              alignItems: "center",
              width: "60%",
              height: "100%",
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    </>
  );
};

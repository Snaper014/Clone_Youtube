import * as React from "react";
import "../../App.css";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const ContentSectionMenu = ({ Logo, title, paragraphe }) => {
  const navigate = useNavigate();
  return (
    <>
      {Logo}
      <h2 style={{ margin: "1%", textAlign: "center" }}>{title}</h2>
      <p style={{ marginBottom: "3%", textAlign: "center" }}>{paragraphe}</p>
      <div onClick={() => navigate("/login")} className="StyleMenuBtnConnecter">
        <div
          style={{
            width: "20%",
            height: "100%",
            display: "flex",
            cursor: "pointer",
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
    </>
  );
};

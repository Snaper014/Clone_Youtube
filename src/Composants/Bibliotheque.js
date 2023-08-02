import * as React from "react";
import { AppBarSecondary } from "./AppBarSecondary";
import { ErrorBoundary } from "react-error-boundary";
import "../App.css";
import Avatar from "@mui/material/Avatar";
import { ErrorFallback } from "../Composants/FallbackError";
import BarSearch from "./AppBarPrimary";

function Biblio() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />

        <div className="GridP">
          <div>
            <AppBarSecondary />
          </div>
          <div
            className="Principale"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "3vh 0vh 3vh 0vh",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              className="style-scope yt-icon"
              style={{
                pointerEvents: "none",
                display: "block",
                width: "120px",
                height: "120px",
              }}
            >
              <g class="style-scope yt-icon">
                <path
                  d="M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z"
                  className="style-scope yt-icon"
                ></path>
              </g>
            </svg>
            <h2>Regardez vos vidéos préférées</h2>
            <p>
              Connectez-vous pour accéder aux vidéos pour lesquelles vous avez
              cliqué sur "J'aime" ou que vous avez enregistrées.
            </p>
            <div
              style={{
                display: "grid",
                width: "25vh",
                height: "6vh",
                gridTemplateColumns: "30% 70%",
                border: "1px solid gray",
                borderRadius: "40px",
              }}
            >
              <Avatar
                src="/broken-image.jpg"
                sx={{ width: "4vh", height: "4vh", margin: "1vh auto" }}
              />
              <p
                style={{
                  color: "#065fd4",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                Se connecter
              </p>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export { Biblio };

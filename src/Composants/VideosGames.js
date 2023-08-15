import * as React from "react";
import "../App.css";
import { AppBarSecondary } from "./AppBarSecondary";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../Composants/FallbackError";
import { BarSearch } from "./AppBarPrimary";
import { ContentTrend } from "../utils/utils";

export function Games() {
  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
        <div className="GridP">
          <div>
            <AppBarSecondary />
          </div>
          <div className="ConteneurTendances">
            <div
              style={{
                width: "100%",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "40px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    width: "10%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                    alt="logo Musique"
                    src="https://yt3.googleusercontent.com/pzvUHajbQDLDt63gKFYUX445k3VprUs8CeJFpNTxGQZlk0grOSkAqU8Th1_C97dyYM3nENgjbw=s176-c-k-c0x00ffffff-no-rj-mo"
                  ></img>
                </div>
                <div
                  style={{
                    width: "90%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h1 style={{ fontWeight: "400" }}>Jeux Vidéos</h1>
                </div>
              </div>
            </div>
            <div>
              <ContentTrend choix="games" />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

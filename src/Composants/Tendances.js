import * as React from "react";
import "../App.css";
import DisplayContentTrend from "./CComTendances";
import { AppBarSecondary } from "./AppBarSecondary";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./FallbackError";
import { BarSearch } from "./AppBarPrimary";

function Trend() {
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
                    alt="logo trend"
                    src="https://www.youtube.com/img/trending/avatar/trending.png"
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
                  <h1 style={{ fontWeight: "400" }}>Tendances</h1>
                </div>
              </div>
            </div>
            <DisplayContentTrend />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export { Trend };

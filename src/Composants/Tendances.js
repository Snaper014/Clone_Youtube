import * as React from "react";
import "../App.css";
import { DisplayContentTrend } from "./CComTendances";
import { AppBarSecondary } from "./AppBarSecondary";
import { BarSearch } from "./AppBarPrimary";

function Trend() {
  return (
    <>
        <BarSearch />
        <AppBarSecondary />
          <div style={{
              position: "relative",
              width: "90%",
              display: "flex",
              top:  "11vh",
              left: "9.8vw",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid transparent",
            }}>
            <div
              style={{
                width: "100%",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "1%",
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
    </>
  );
}

export { Trend };

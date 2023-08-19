import * as React from "react";
import "../App.css";
import { ContentTrend } from "../utils/utils";

const TabTrend = [
  { button: "nouveautés", container: <ContentTrend choix="now" /> },
  { button: "musique", container: <ContentTrend choix="music" /> },
  { button: "jeux vidéo", container: <ContentTrend choix="games" /> },
];

function DisplayContentTrend() {
  const [select, setSelect] = React.useState("NOUVEAUTÉS");
  return (
    <>
      <div className="SelecBTN">
        {TabTrend.map((element, index) => (
          <button
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => setSelect(element?.button)}
            className={select === element?.button ? "activer" : "normal"}
          >
            {element?.button.toLocaleUpperCase()}
          </button>
        ))}
      </div>
      {TabTrend.map((element, index) => (
        <React.Fragment key={index}>
          {select === element?.button ? element?.container : null}
        </React.Fragment>
      ))}
    </>
  );
}

export { DisplayContentTrend };

import * as React from "react";
import "../App.css";
import { ContentTrend } from "../utils/utils";

const Context = React.createContext();

function Composantcompose({ children, ...props }) {
  const [selectid, setSelectid] = React.useState(0);
  const Changer = (selectid) => setSelectid(selectid);

  return (
    <Context.Provider value={{ selectid, Changer }} {...props}>
      <div className="DIVtrend">{children}</div>
    </Context.Provider>
  );
}

function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "Vous venez d'utiliser ou de modifer le composant hors contexte",
    );
  }
  return context;
}
function Tabs({ children, ...props }) {
  const clone = React.Children.map(children, (element, index) =>
    React.cloneElement(element, { index, ...props }),
  );
  return <div className="SelecBTN">{clone}</div>;
}
function Menu({ index, children }) {
  const { selectid, Changer } = useContext();
  return (
    <button
      className={selectid === index ? "activer" : "normal"}
      key={index}
      onClick={() => Changer(index)}
    >
      {children}
    </button>
  );
}

function Choice({ index, children }) {
  const { selectid } = useContext();
  return selectid === index ? <>{children}</> : null;
}

function Content({ children, ...props }) {
  const { selectid } = useContext();
  return React.Children.map(children, (element, index) =>
    React.cloneElement(element, { selectid, index, ...props }),
  );
}
function DisplayContentTrend() {
  const nouveautes = "nouveautés";
  const Jv = "jeux vidéo";

  return (
    <>
      <Composantcompose>
        <Tabs>
          <Menu>{nouveautes.toLocaleUpperCase()}</Menu>
          <Menu>MUSIQUE</Menu>
          <Menu>{Jv.toLocaleUpperCase()}</Menu>
        </Tabs>
        <Content>
          <Choice>
            <ContentTrend choix="now" />
          </Choice>
          <Choice>
            <ContentTrend choix="music" />
          </Choice>
          <Choice>
            <ContentTrend choix="games" />
          </Choice>
        </Content>
      </Composantcompose>
    </>
  );
}

export default DisplayContentTrend;

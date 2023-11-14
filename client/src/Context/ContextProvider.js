import * as React from "react";

const Context = React.createContext();
const DataProvider = ({ children, ...props }) => {
  const [LoadNextContentSearch, setLoadNextContentSearch] = React.useState([]);
  const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("jwt-auth")),
  );

  return (
    <Context.Provider
      value={{
        LoadNextContentSearch,
        setLoadNextContentSearch,
        token,
        setToken,
        user,
        setUser,
      }}
      {...props}
    >
      {children}
    </Context.Provider>
  );
};

function useContext() {
  const contexte = React.useContext(Context);
  if (!contexte) {
    throw new Error(
      "Le hook  personnalisé vient d'etre utiliser hors de son contexte",
    );
  }
  return contexte;
}

export { useContext, DataProvider };

import * as React from "react";

const Context = React.createContext();
const DataProvider = ({ children, ...props }) => {
  const IsinMemory = sessionStorage.getItem("shorts");
  const IsChecked = sessionStorage.getItem("checked");
  const [DataContext, setDataContext] = React.useState(
    IsinMemory ? JSON.parse(IsinMemory) : null,
  );
  const [option, setOption] = React.useState(
    IsChecked ? JSON.parse(IsChecked) : false,
  );
  const [LoadNextContentSearch, setLoadNextContentSearch] = React.useState([]);
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    sessionStorage.setItem("shorts", JSON.stringify(DataContext));
    sessionStorage.setItem("checked", JSON.stringify(option));
  }, [DataContext, option]);

  return (
    <Context.Provider
      value={{
        DataContext,
        setDataContext,
        option,
        setOption,
        LoadNextContentSearch,
        setLoadNextContentSearch,
        token,
        setToken,
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

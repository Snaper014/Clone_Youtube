import * as React from "react";
import ReactDOM from "react-dom/client";
import "../App.css";
import { AppBarSecondary } from "./AppBarSecondary";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { Recherche } from "../utils/Appel";
import { CircularProgress } from "@mui/material";
import { useFetchData } from "../utils/Fetch";
import { ErrorFallback } from "../Composants/FallbackError";
import BarSearch from "./AppBarPrimary";
import { NewSearchs } from "../utils/utils";
import { useData } from "../utils/ContextProvider";
import { CheckWidth } from "../utils/utils";

function Search() {
  let { userSearch } = useParams();
  const { setDataContext, setOption } = useData();
  const { execute, data: dataYTB, error, status } = useFetchData();
  console.log(dataYTB);

  sessionStorage.setItem("Token", JSON.stringify(dataYTB?.data?.continuation));
  const [WidthShorts, setWidthShorts] = React.useState();
  const [MarginRight, setMarginRight] = React.useState();
  const [marginLeft, setMarginLeft] = React.useState();
  const [value, setValue] = React.useState(0);
  const [ValueDefault, setValueDefault] = React.useState(0);

  const refWidth = React.useRef(null);

  console.log("marge", MarginRight);
  console.log(ValueDefault);

  React.useLayoutEffect(() => {
    let chargement = setTimeout(() => {
      CheckWidth(
        refWidth,
        setValueDefault,
        setWidthShorts,
        setMarginLeft,
        setMarginRight,
        false,
        setValue,
      );
    }, 1200);

    return () => clearTimeout(chargement);
  }, [refWidth]);

  React.useEffect(() => {
    const HandleResize = () =>
      CheckWidth(
        refWidth,
        setValueDefault,
        setWidthShorts,
        setMarginLeft,
        setMarginRight,
        false,
        setValue,
      );
    if (userSearch) {
      execute(Recherche(userSearch));
    }
    let loading = false;
    const isScrollAtBottom = () => {
      const Container = document.getElementById("ContainerHome");
      const DernierEnfant = Container?.lastElementChild?.lastElementChild;
      if (DernierEnfant) {
        const lastElementVisible = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !loading) {
              loading = true;
              lastElementVisible.unobserve(entries[0].target);
              const test = sessionStorage.getItem("Token");
              console.log("token ffff", test);
              Recherche(userSearch, JSON.parse(test))
                .then((response) => {
                  console.log("response data charger", response);
                  const div = document.createElement("div");
                  div.style.width = "100%";
                  ReactDOM.createRoot(div).render(
                    <NewSearchs
                      data={response}
                      setDataContext={setDataContext}
                      setOption={setOption}
                      value={value}
                      WidthShorts={WidthShorts}
                      marginLeft={marginLeft}
                      MarginRight={MarginRight}
                    />,
                  );
                  Container.appendChild(div);
                  sessionStorage.setItem(
                    "Token",
                    JSON.stringify(response?.data?.continuation),
                  );
                  loading = false;
                })
                .catch((error) => {
                  console.log(error);
                  loading = false;
                });
            }
            lastElementVisible.unobserve(entries[0].target);
          },
          {
            threshold: 0.8,
          },
        );
        lastElementVisible.observe(DernierEnfant);
      }
    };

    window.addEventListener("scroll", isScrollAtBottom);
    window.addEventListener("resize", HandleResize);
    return () => {
      window.removeEventListener("scroll", isScrollAtBottom);
      window.removeEventListener("resize", HandleResize);
    };
  }, [
    execute,
    userSearch,
    WidthShorts,
    marginLeft,
    MarginRight,
    value,
    setOption,
    setDataContext,
  ]);

  if (status === "fetching") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress style={{ fontSize: "40px" }} />
      </div>
    );
  }
  if (status === "fail") {
    return (
      <div style={{ width: "100%" }}>
        <p style={{ fontSize: "32px" }}>
          Une Erreur est survenu {error.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
        <div className="GridP">
          <div>
            <AppBarSecondary />
          </div>
          <div id="ContainerHome" className="Principale" ref={refWidth}>
            <NewSearchs
              data={dataYTB}
              setDataContext={setDataContext}
              setOption={setOption}
              value={value}
              WidthShorts={WidthShorts}
              marginLeft={marginLeft}
              MarginRight={MarginRight}
            />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export { Search };

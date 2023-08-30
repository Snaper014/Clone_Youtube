import * as React from "react";
import "../App.css";
import { AppBarSecondary } from "./AppBarSecondary";
import { useParams } from "react-router-dom";
import { Recherche } from "../utils/Appel";
import { CircularProgress } from "@mui/material";
import { BarSearch } from "./AppBarPrimary";
import { useContext } from "../Context/ContextProvider";
import { CheckWidth } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";
import { MobileBarSearch } from "./AppBarPrimary";
import { MobileSecondaryBar } from "./AppBarSecondary";
import { MobileResponsive } from "../utils/utils";
import { NewSearchs } from "./Elements/SearchsContent";

function Search() {
  let { search } = useParams();
  const {
    data: dataYTB,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`Fetch search AppBar`, search],
    queryFn: () => Recherche(search),
    enabled: !!search,
    staleTime: 1000,
  });
  const {
    setDataContext,
    setOption,
    token,
    setToken,
    setLoadNextContentSearch,
    LoadNextContentSearch,
  } = useContext();

  const [WidthShorts, setWidthShorts] = React.useState();
  const [MarginRight, setMarginRight] = React.useState();
  const [marginLeft, setMarginLeft] = React.useState();
  const [value, setValue] = React.useState(0);
  const [ValueDefault, setValueDefault] = React.useState(0);
  const [WidthScreen, setWidthScreen] = React.useState(window.innerWidth);

  const [responsive, setResponsive] = React.useState(
    window.innerWidth <= 1024 ? true : false,
  );
  const refWidth = React.useRef(null);

  //console.log("marge", MarginRight);
  // console.log(dataYTB);
  // //console.log("FirstValidateToken", FirstValidateToken);
  // console.log("token", token);
   console.log(ValueDefault);
  // console.log("LoadNextContent", LoadNextContentSearch);
  const continuation = dataYTB?.data?.continuation;

  React.useLayoutEffect(() => {
    let chargement = setTimeout(() => {
      // console.log("refLargeur React.Layoutuseeffect", refWidth);
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
    setToken(continuation);
    setWidthScreen(window.innerWidth);

    return () => clearTimeout(chargement);
  }, [refWidth, setToken, continuation]);

  React.useEffect(() => {
    const HandleResize = () => {
      //console.log("refLargeur React.useeffect", refWidth);
      MobileResponsive(setResponsive);
      CheckWidth(
        refWidth,
        setValueDefault,
        setWidthShorts,
        setMarginLeft,
        setMarginRight,
        false,
        setValue,
      );
      setWidthScreen(window.innerWidth);
    };

    let loading = false;
    const isScrollAtBottom = () => {
      //const Container = document.getElementById("ContainerHome");
      // Possible closure qui garde l'état du token en mémoire;
      const DernierEnfant =
        refWidth?.current?.lastElementChild?.lastElementChild;
      if (DernierEnfant) {
        const lastElementVisible = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !loading) {
              loading = true;
              lastElementVisible.unobserve(entries[0].target);
              Recherche(search, token)
                .then((response) => {
                  console.log(
                    "token LoadDataNext In the NewSearch",
                    response?.data?.continuation,
                  );
                  console.log("response data charger OK", response);
                  setLoadNextContentSearch((prevValues) => [
                    ...prevValues,
                    <NewSearchs
                      data={response}
                      setDataContext={setDataContext}
                      setOption={setOption}
                      value={value}
                      WidthShorts={WidthShorts}
                      marginLeft={marginLeft}
                      MarginRight={MarginRight}
                      WidthScreen={WidthScreen}
                    />,
                  ]);
                  setToken(response?.data?.continuation);
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
      return;
    };

    window.addEventListener("scroll", isScrollAtBottom);
    window.addEventListener("resize", HandleResize);
    return () => {
      window.removeEventListener("scroll", isScrollAtBottom);
      window.removeEventListener("resize", HandleResize);
    };
  }, [
    search,
    WidthShorts,
    marginLeft,
    MarginRight,
    value,
    setOption,
    LoadNextContentSearch,
    setLoadNextContentSearch,
    setDataContext,
    token,
    setToken,
    WidthScreen,
  ]);

  if (isLoading) {
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
  if (isError) {
    return (
      <div style={{ margin: "0 auto", width: "15%" }}>
        <p>Une Erreur est survenu {error.message}</p>
      </div>
    );
  }

  return (
    <>
      {responsive ? (
        <>
          <MobileBarSearch />
          <MobileSecondaryBar />
        </>
      ) : (
        <>
          <BarSearch />
          <AppBarSecondary />
        </>
      )}
      <div
        ref={refWidth}
        id="ContainerHome"
        style={{
          position: "relative",
          top: `${responsive ? "8vh" : "11vh"}`,
          left: `${responsive ? "0px" : "9.8vw"}`,
          padding: "3vh 0px 3vh 0px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
          border: "2px solid transparent",
          color: "black",
          width: `${responsive ? "100%" : "90%"}`,
        }}
      >
        <NewSearchs
          data={dataYTB}
          setDataContext={setDataContext}
          setOption={setOption}
          value={value}
          WidthShorts={WidthShorts}
          marginLeft={marginLeft}
          MarginRight={MarginRight}
          WidthScreen={WidthScreen}
        />
        {LoadNextContentSearch.map((element, index) => (
          <div style={{ width: "100%" }} key={index}>
            {React.cloneElement(element, {
              value: value,
              WidthShorts: WidthShorts,
              marginLeft: marginLeft,
              MarginRight: MarginRight,
              WidthScreen: WidthScreen,
            })}
          </div>
        ))}
      </div>
    </>
  );
}

export { Search };

import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, act , renderHook, screen} from "@testing-library/react";
import { MobileResponsive, CheckWidth, CheckRelatedVideos, MoreContent } from "../utils";


test("test composant MobileResponsive", () => {
    const {result} = renderHook(() => {
        const [responsive, setResponsive] = React.useState(
            window.innerWidth <= 1024 ? true : false);
        React.useEffect(() => {
            const HandleResize = () => {
                MobileResponsive(setResponsive);
              };
              window.addEventListener("resize", HandleResize);
              return () => window.removeEventListener("resize", HandleResize);
        }, [])
       return responsive; 
    })
   expect(result.current).toBe(true);
   act(() => {
    global.innerWidth = 1600;
    global.innerHeight = 768;
    global.dispatchEvent(new Event("resize"));
  });
  expect(result.current).toBe(false);
  act(() => {
    global.innerWidth = 500;
    global.innerHeight = 768;
    global.dispatchEvent(new Event("resize"));
  });
  expect(result.current).toBe(true);
  screen.debug()
})

test("Test CheckWidth function Largeur <= 767", () => {
  const setWidthVideos = jest.fn();
  const setWidthShorts = jest.fn();
  const setMarginLeft = jest.fn();
  const setMarginRight = jest.fn();
  const setValue = jest.fn();
  act(() => {
    window.innerWidth = 500;
    window.innerHeight = 850;
    global.dispatchEvent(new Event("resize"));
  });

  // Appelez la fonction CheckWidth avec des valeurs simulées
  CheckWidth(
    { current: { getBoundingClientRect: () => ({ width: 500 }) } }, // Exemple de référence
    setWidthVideos,
    setWidthShorts,
    setMarginLeft,
    setMarginRight,
    false, 
    setValue,
  );

  // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
  expect(setWidthVideos).toHaveBeenCalledWith("496.5px");
  expect(setWidthShorts).toHaveBeenCalledWith('225px');
  expect(setMarginLeft).toHaveBeenCalledWith('25px');
  expect(setMarginRight).toHaveBeenCalledWith('7.5px');
  expect(setValue).toHaveBeenCalledWith(2);
});

test("Test CheckWidth function Largeur >= 768 && Largeur <= 1115", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 850;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 850 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      false, 
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("391px");
    expect(setWidthShorts).toHaveBeenCalledWith('255px');
    expect(setMarginLeft).toHaveBeenCalledWith('11.9px');
    expect(setMarginRight).toHaveBeenCalledWith('19.55px');
    expect(setValue).toHaveBeenCalledWith(3);
  });
  test("Test CheckWidth function Largeur >= 1116 && Largeur <= 1603", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 1500;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
  
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 1500 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      false, 
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("472.5px");
    expect(setWidthShorts).toHaveBeenCalledWith('274.5px');
    expect(setMarginLeft).toHaveBeenCalledWith('7.5px');
    expect(setMarginRight).toHaveBeenCalledWith('18px');
    expect(setValue).toHaveBeenCalledWith(5);
  });
  test("Test CheckWidth function Largeur >= 1604 && Largeur <= 1945", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 1850;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 1850 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      false, 
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("425.5px");
    expect(setWidthShorts).toHaveBeenCalledWith('273.8px');
    expect(setMarginLeft).toHaveBeenCalledWith('9.25px');
    expect(setMarginRight).toHaveBeenCalledWith('25.900000000000002px');
    expect(setValue).toHaveBeenCalledWith(6);
  });
  test("Test CheckWidth function Largeur >= 1946 && Largeur <= 2295", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 2002;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 2002 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      false, 
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("366.366px");
    expect(setWidthShorts).toHaveBeenCalledWith('216.216px');
    expect(setMarginLeft).toHaveBeenCalledWith('20.02px');
    expect(setMarginRight).toHaveBeenCalledWith('12.012px');
    expect(setValue).toHaveBeenCalledWith(8);
  });

  test("Test CheckWidth function Largeur >= 2296", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 2310;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 2310 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      false, 
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("347px");
    expect(setWidthShorts).toHaveBeenCalledWith('219.45px');
    expect(setMarginLeft).toHaveBeenCalledWith('23.1px');
    expect(setMarginRight).toHaveBeenCalledWith('13.86px');
    expect(setValue).toHaveBeenCalledWith(9);
  });
  
  test("Test CheckWidth function (HasCaroussel) Largeur <= 1175", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 1024;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 1024 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      true, // composant diposant d'un caroussel
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("211.96800000000002px");
    expect(setWidthShorts).toHaveBeenCalledWith('211.96800000000002px');
    expect(setMarginLeft).toHaveBeenCalledWith('4.61px');
    expect(setMarginRight).toHaveBeenCalledWith('12.908px');
    expect(setValue).toHaveBeenCalledWith(4);
  });
 
  test("Test CheckWidth function (HasCaroussel) Largeur >= 1176 && Largeur <= 1604", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 1400;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
  
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 1400 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      true, // composant diposant d'un caroussel 
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("233.1px");
    expect(setWidthShorts).toHaveBeenCalledWith('233.1px');
    expect(setMarginLeft).toHaveBeenCalledWith('11.34px');
    expect(setMarginRight).toHaveBeenCalledWith('7.5600000000000005px');
    expect(setValue).toHaveBeenCalledWith(5);
  });

  test("Test CheckWidth function (HasCaroussel) Largeur >= 1605", () => {
    const setWidthVideos = jest.fn();
    const setWidthShorts = jest.fn();
    const setMarginLeft = jest.fn();
    const setMarginRight = jest.fn();
    const setValue = jest.fn();
    act(() => {
        window.innerWidth = 1850;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckWidth(
      { current: { getBoundingClientRect: () => ({ width: 1850 }) } }, // Exemple de référence
      setWidthVideos,
      setWidthShorts,
      setMarginLeft,
      setMarginRight,
      true, // composant diposant d'un caroussel
      setValue,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith("250px");
    expect(setWidthShorts).toHaveBeenCalledWith('250px');
    expect(setMarginLeft).toHaveBeenCalledWith('16.65px');
    expect(setMarginRight).toHaveBeenCalledWith('9.99px');
    expect(setValue).toHaveBeenCalledWith(6);
  });

  test("Test CheckRelatedVideos function Largeur <= 580", () => {
    const setWidthVideos = jest.fn();
    const setHeightVideos = jest.fn();
    act(() => {
        window.innerWidth = 500;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckRelatedVideos(
      setWidthVideos,
      { current: { getBoundingClientRect: () => ({ width: 500 }) } }, // Exemple de référence
      setHeightVideos,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith(498);
    expect(setHeightVideos).toHaveBeenCalledWith(280);
  });

  test("Test CheckRelatedVideos function Largeur > 581 && Largeur <= 780", () => {
    const setWidthVideos = jest.fn();
    const setHeightVideos = jest.fn();

    act(() => {
        window.innerWidth = 620;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckRelatedVideos(
      setWidthVideos,
      { current: { getBoundingClientRect: () => ({ width: 620 }) } }, // Exemple de référence
      setHeightVideos,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith(291);
    expect(setHeightVideos).toHaveBeenCalledWith(347.20000000000005);
  });
  test("Test CheckRelatedVideos function  Largeur > 781", () => {
    const setWidthVideos = jest.fn();
    const setHeightVideos = jest.fn();
    act(() => {
        window.innerWidth = 930;
        window.innerHeight = 850;
        global.dispatchEvent(new Event("resize"));
      });
    // Appelez la fonction CheckWidth avec des valeurs simulées
    CheckRelatedVideos(
      setWidthVideos,
      { current: { getBoundingClientRect: () => ({ width: 930 }) } }, // Exemple de référence
      setHeightVideos,
    );
  
    // Vérifiez que les fonctions de réglage ont été appelées avec les valeurs attendues
    expect(setWidthVideos).toHaveBeenCalledWith(279);
    expect(setHeightVideos).toHaveBeenCalledWith(520.8000000000001);
  });

const ComposantTest = ({shorts = false}) => {
    return(
            <div id="Container-level-3">
                <div className={`${shorts ? "shorts" : "MoreVideos"}`}
                     data-testid="TestContent"
                     style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "nowrap",
                    }}   
                >
                    <h2>Titre</h2>
                    <p>Paragraphe</p>
                </div>
             <button onClick={() => MoreContent(3, shorts)}
                id="Button-section-3">Bouton</button>    
            </div>

    )
}

test("Afficher plus de contenu avec MoreContent() sans shorts", async () => {
    const user = userEvent.setup();
    render(<ComposantTest  />);
    expect(screen.getByRole("button", {name: /Bouton/i})).toBeInTheDocument();
    expect(screen.getByTestId("TestContent")).toHaveClass("MoreVideos");
    expect(screen.getByTestId("TestContent")).toHaveStyle("flex-wrap: nowrap;");
    expect(screen.queryByTestId("TestContent")).not.toHaveClass("shorts");
    await user.click(screen.getByRole("button", {name: /Bouton/i}))
    expect(screen.getByTestId("TestContent")).toHaveStyle("flex-wrap: wrap;");
    expect(screen.queryByTestId("TestContent")).not.toHaveStyle("flex-wrap: nowrap;");
    expect(screen.queryByRole("button", {name: /Bouton/i})).not.toBeInTheDocument();
})

test("Afficher plus de contenu avec MoreContent() avec shorts", async () => {
  const user = userEvent.setup();
  render(<ComposantTest  shorts={true}/>);
  expect(screen.getByRole("button", {name: /Bouton/i})).toBeInTheDocument();
  expect(screen.getByTestId("TestContent")).toHaveClass("shorts");
  expect(screen.getByTestId("TestContent")).toHaveStyle("flex-wrap: nowrap;");
  expect(screen.queryByTestId("TestContent")).not.toHaveClass("Morevideos");
  await user.click(screen.getByRole("button", {name: /Bouton/i}));
  expect(screen.getByTestId("TestContent")).toHaveStyle("flex-wrap: wrap;");
  expect(screen.queryByTestId("TestContent")).not.toHaveStyle("flex-wrap: nowrap;");
  expect(screen.queryByRole("button", {name: /Bouton/i})).not.toBeInTheDocument();
})



import "../App.css";

export const MobileResponsive = (setResponsive) => {
  if (window.innerWidth <= 1024) {
    setResponsive(true);
  } else {
    setResponsive(false);
  }
};

export const CheckWidth = (
  ref,
  setWidthVideos,
  setWidthShorts,
  setMarginLeft,
  setMarginRight,
  HasCaroussel = false,
  setValue = 0,
) => {
  let Largeur = window.innerWidth;
  const width = ref?.current?.getBoundingClientRect().width;
  let WidthContainer = width;
  //Width Container with Caroussel
  let WCWC = width * 0.9;
  // console.log("test" , width);
  // console.log("Largeur Fenetre", Largeur);
  // console.log("largeur conteneur", WidthContainer);
  if (HasCaroussel) {
    if (WCWC) {
      if (Largeur <= 1175) {
        let width = WCWC * 0.23;
        setWidthVideos(width);
        setWidthShorts(width);
        setMarginLeft(Math.round(WCWC) * 0.005);
        setMarginRight(Math.round(WCWC) * 0.014);
        setValue(4);
      }
      if (Largeur >= 1176 && Largeur <= 1604) {
        let width = WCWC * 0.185;
        setWidthVideos(width);
        setWidthShorts(width);
        setMarginLeft(Math.round(WCWC) * 0.009);
        setMarginRight(Math.round(WCWC) * 0.006);
        setValue(5);
      }
      if (Largeur >= 1605) {
        let width = Math.round(WCWC * 0.15);
        setWidthVideos(width);
        setWidthShorts(width);
        setMarginLeft(Math.round(WCWC) * 0.01);
        setMarginRight(Math.round(WCWC) * 0.006);
        setValue(6);
      }
    }
  } else {
    if (WidthContainer) {
      if (Largeur <= 767) {
        // console.log("Sous les 767 pixels", WidthContainer);
        let WidthShorts = WidthContainer * 0.45;
        setWidthVideos(WidthContainer * 0.993);
        setWidthShorts(WidthShorts);
        setMarginLeft(WidthContainer * 0.05);
        setMarginRight(WidthContainer * 0.015);
        setValue(2);
      }
      if (Largeur >= 768 && Largeur <= 1115) {
        let width = WidthContainer * 0.46;
        let WidthShorts = WidthContainer * 0.3;
        setWidthVideos(width);
        setWidthShorts(WidthShorts);
        setMarginLeft(Math.round(WidthContainer) * 0.014);
        setMarginRight(Math.round(WidthContainer) * 0.023);
        setValue(3);
      }
      if (Largeur >= 1116 && Largeur <= 1603) {
        let width = WidthContainer * 0.315;
        let WidthShorts = WidthContainer * 0.183;
        setWidthVideos(width);
        setWidthShorts(WidthShorts);
        setMarginLeft(Math.round(WidthContainer) * 0.005);
        setMarginRight(Math.round(WidthContainer) * 0.012);
        setValue(5);
      }
      if (Largeur >= 1604 && Largeur <= 1945) {
        let width = WidthContainer * 0.23;
        let WidthShorts = WidthContainer * 0.148;
        setWidthVideos(width);
        setWidthShorts(WidthShorts);
        setMarginLeft(Math.round(WidthContainer) * 0.005);
        setMarginRight(Math.round(WidthContainer) * 0.014);
        setValue(6);
      }
      if (Largeur >= 1946 && Largeur <= 2295) {
        let width = WidthContainer * 0.183;
        let WidthShorts = WidthContainer * 0.108;
        setWidthVideos(width);
        setWidthShorts(WidthShorts);
        setMarginLeft(Math.round(WidthContainer) * 0.01);
        setMarginRight(Math.round(WidthContainer) * 0.006);
        setValue(8);
      }
      if (Largeur >= 2296) {
        let width = Math.round(WidthContainer * 0.15);
        let WidthShorts = WidthContainer * 0.095;
        setWidthVideos(width);
        setWidthShorts(WidthShorts);
        setMarginLeft(Math.round(WidthContainer) * 0.01);
        setMarginRight(Math.round(WidthContainer) * 0.006);
        setValue(9);
      }
    }
  }
};

export const CheckRelatedVideos = (setWidthVideos, ref, setHeightVideos) => {
  let Largeur = window.innerWidth;
  const width = ref?.current?.getBoundingClientRect().width;
  let WidthContainer = width;
  if (Largeur <= 580) {
    setWidthVideos(Math.round(WidthContainer * 0.995));
    setHeightVideos(Largeur * 0.56);
  }
  if (Largeur > 581 && Largeur <= 780) {
    setWidthVideos(Math.round(WidthContainer * 0.47));
    setHeightVideos(Largeur * 0.56);
  }
  if (Largeur > 781) {
    setWidthVideos(Math.round(WidthContainer * 0.3));
    setHeightVideos(Largeur * 0.56);
  }
};

export const MoreContent = (numero, choice = false) => {
  let Container = document.getElementById(`Container-level-${numero}`);
  let button = document.getElementById(`Button-section-${numero}`);
  let element = Container.querySelector(
    `${choice ? ".shorts" : ".MoreVideos"}`,
  );
  //console.log(element);
  element.style.flexWrap = "wrap";
  button.remove();
};

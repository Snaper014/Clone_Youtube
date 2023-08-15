import * as React from "react";
import {
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
} from "react-icons/ri";

const Carsoussel = ({
  children: slides,
  InitialValue = 0,
  height = "89vh",
  mobile = false,
  WidthScreen,
}) => {
  const [curr, setCurr] = React.useState(InitialValue);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  const startXRef = React.useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(true);

  const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientY;
    console.log("touchStartX.current", startXRef.current);
  };
  const handleTouchEnd = (e) => {
    if (startXRef.current === null) {
      return; // Pas de touchstart enregistré, ne rien faire
    }

    const deltaY = e.changedTouches[0].clientY - startXRef.current;
    console.log("touchend", e.changedTouches[0].clientY);
    console.log("deltaY", deltaY);

    // Exécutez la translation seulement si deltaX dépasse une certaine valeur (par exemple, 50)
    if (deltaY > 0) {
      prev();
    } else if (deltaY < 0) {
      next();
    }
  };
  console.log("VideoPlaying", isVideoPlaying);

  return (
    <div
      ref={startXRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100%",
        height: `${height}`,
        display: "flex",
        position: "relative",
        top: `${mobile ? "4vh" : "0px"}`,
        flexDirection: "row",
        flexWrap: "nowrap",
      }}
    >
      <div
        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
        style={{
          overflow: "hidden",
          height: "100%",
          width: `${mobile ? "100%" : "95%"}`,
        }}
      >
        <div
          style={{
            height: "100%",
            transform: `translateY(-${curr * 100}%)`,
            transitionDuration: `150ms`,
            transitionTimingFunction: "ease-in-out",
          }}
        >
          {WidthScreen <= 1024
            ? slides.map((element, index) =>
                React.cloneElement(element, {
                  playing: curr === index && isVideoPlaying,
                  loop: curr === index,
                }),
              )
            : slides.map((element, index) =>
                React.cloneElement(element, {
                  playing: curr === index,
                  loop: curr === index,
                }),
              )}
        </div>
      </div>
      {mobile ? null : (
        <div
          style={{
            width: "5%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          {curr === 0 ? (
            <div></div>
          ) : (
            <button
              style={{
                backgroundColor: "#efeff1",
                height: "60px",
                border: "none",
                width: "60px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={prev}
            >
              <RiArrowUpSLine fontSize={28} />
            </button>
          )}
          <button
            style={{
              backgroundColor: "#efeff1",
              height: "60px",
              border: "none",
              width: "60px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={next}
          >
            <RiArrowDownSLine fontSize={28} />
          </button>
        </div>
      )}
    </div>
  );
};

const CardCaroussel = ({ children, value, shorts = false, mobile = false }) => {
  const [curr, setCurr] = React.useState(0);
  const prev = () => setCurr((curr) => (curr === 0 ? 0 : curr - 1));
  const next = () =>
    setCurr((curr) =>
      curr * 100 >= (children.length / value) * 100 ? curr : curr + 1,
    );

  //const startXRef = React.useRef(null);

  /*const handleTouchStart = (e) => {
    startXRef.current = e.touches[0].clientX;
    console.log("touchStartX.current", startXRef.current);
  };
  const handleTouchEnd = (e) => {
    if (startXRef.current === null) {
      return; // Pas de touchstart enregistré, ne rien faire
    }

    const deltaX = e.changedTouches[0].clientX - startXRef.current;
    console.log("touchend", e.changedTouches[0].clientX);
    console.log("deltaX", deltaX);

    // Exécutez la translation seulement si deltaX dépasse une certaine valeur (par exemple, 50)
    if (deltaX > 0) {
      prev();
    } else if (deltaX < 0) {
      next();
    }
  };*/
  return (
    <div
      className="HiddenScroll"
      style={{
        overflow: `${mobile ? "scroll hidden" : "hidden"}`,
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          transform: `translateX(-${curr * 100}%)`,
          transitionDuration: `${
            window.innerWidth <= 1024 ? "100ms" : "300ms"
          }`,
          transitionTimingFunction: "ease-in-out",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {children}
      </div>
      {mobile ? null : (
        <>
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              height: `${shorts ? "80%" : "60%"}`,
              width: "53px",
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {curr === 0 ? null : (
              <button
                onClick={prev}
                style={{
                  width: `53px`,
                  height: `53px`,
                  cursor: "pointer",
                  backgroundColor: "#efeff1",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  justifyContent: "center",
                  borderRadius: "50%",
                }}
              >
                <RiArrowLeftSLine fontSize={20} />
              </button>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              height: `${shorts ? "80%" : "60%"}`,
              width: "53px",
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {curr * 100 >= (children.length / value) * 100 ? null : (
              <button
                className="NextButtons"
                onClick={next}
                style={{
                  width: `53px`,
                  height: `53px`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                  justifyContent: "center",
                  backgroundColor: "#efeff1",
                  borderRadius: "50%",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                <RiArrowRightSLine fontSize={20} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export { Carsoussel, CardCaroussel };

import * as React from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

const Carsoussel = ({ children: slides, InitialValue }) => {
  const [curr, setCurr] = React.useState(InitialValue);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  return (
    <div
      style={{
        width: "100%",
        height: "89vh",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          height: "100%",
          width: "95%",
        }}
      >
        <div
          style={{
            height: "100%",
            transform: `translateY(-${curr * 100}%)`,
            transitionDuration: "300ms",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          {slides}
        </div>
      </div>
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
          <button className="DIRBtn" onClick={prev}>
            BACK
          </button>
        )}
        <button className="DIRBtn" onClick={next}>
          NEXT
        </button>
      </div>
    </div>
  );
};

const CardCaroussel = ({ children, value, shorts = false }) => {
  const [curr, setCurr] = React.useState(0);
  const prev = () => setCurr((curr) => (curr === 0 ? 0 : curr - 1));
  const next = () =>
    setCurr((curr) =>
      curr * 100 >= (children.length / value) * 100 ? curr : curr + 1,
    );
  return (
    <div
      style={{
        overflow: "hidden",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        className="posters"
        style={{
          height: "100%",
          transform: `translateX(-${curr * 100}%)`,
          transitionDuration: "300ms",
          transitionTimingFunction: "ease-in-out",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {children}
      </div>
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
        {curr === 0 ? (
          <div></div>
        ) : (
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
        {curr * 100 >= (children.length / value) * 100 ? (
          <div></div>
        ) : (
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
    </div>
  );
};

export { Carsoussel, CardCaroussel };

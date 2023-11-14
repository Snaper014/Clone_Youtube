import * as React from "react";
import { BarSearch } from "../AppBarPrimary";
import { AppBarSecondary } from "../AppBarSecondary";

export const ContainerDesktop = ({ Styles, children }) => {
  return (
    <>
      <BarSearch />
      <AppBarSecondary />
      <div style={Styles}>{children}</div>
    </>
  );
};

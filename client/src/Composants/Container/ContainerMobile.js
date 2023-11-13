import * as React from "react";
import { MobileBarSearch } from "../AppBarPrimary";
import { MobileSecondaryBar } from "../AppBarSecondary";

export const ContainerMobile = ({ styles, children, name = "" }) => {
  return (
    <>
      <MobileBarSearch name={name} />
      <MobileSecondaryBar />
      <div style={styles}>{children}</div>
    </>
  );
};

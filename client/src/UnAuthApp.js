import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { ClerkProviderWithRoutes } from "./RouteClerk";

function UnAuthApp() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export { UnAuthApp };

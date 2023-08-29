import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../Composants/FallbackError";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "../Context/ContextProvider";
import { render as renderReactTestingLib } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const WrapperReactQuery = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const ContextProvider = ({children}) => {
    return <DataProvider>{children}</DataProvider>
}

const AllTheProviders = ({ children }) => {
  return (
    <>
      <WrapperReactQuery>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <DataProvider>{children}</DataProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </WrapperReactQuery>
    </>
  );
};
const customRender = (ui, { ...options } = {}) => {
  return renderReactTestingLib(ui, { wrapper: AllTheProviders, ...options });
};

// override render method
export { customRender, WrapperReactQuery, ContextProvider};

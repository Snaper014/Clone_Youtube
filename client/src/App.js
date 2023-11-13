import React from "react";
import { UnAuthApp } from "./UnAuthApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_ID } from "./config";

const queryClient = new QueryClient();
function App() {
  return (
    <GoogleOAuthProvider clientId={`${GOOGLE_ID}`}>
      <QueryClientProvider client={queryClient}>
        <UnAuthApp />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export { App };

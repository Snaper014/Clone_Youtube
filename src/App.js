import React from "react";
import { UnAuthApp } from "./UnAuthApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UnAuthApp />
    </QueryClientProvider>
  );
}

export default App;

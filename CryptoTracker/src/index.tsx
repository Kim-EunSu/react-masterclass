import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import App from "./App";

const queryClient = new QueryClient();

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);

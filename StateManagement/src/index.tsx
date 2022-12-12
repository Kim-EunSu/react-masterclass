import { ThemeProvider } from "styled-components";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { darkTheme } from "./theme";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
  // </React.StrictMode>
);

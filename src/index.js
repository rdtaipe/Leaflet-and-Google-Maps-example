import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Map } from "./Map";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Map />
  </StrictMode>
);

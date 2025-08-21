import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorSchemeScript />
    <MantineProvider defaultColorScheme="light">
      <Notifications position="top-right" />
      <App />
    </MantineProvider>
  </React.StrictMode>
);

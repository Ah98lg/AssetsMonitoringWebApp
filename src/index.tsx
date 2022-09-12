import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import "antd/dist/antd.min.css";
import ptBr from "antd/lib/locale/pt_BR";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBr}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { BrowserRouter } from 'react-router-dom';

const region = "eu-north-1"

Amplify.configure(outputs);

Amplify.configure({
  ...Amplify.getConfig(),
  Predictions: {
    convert: {
      transcription: {
        defaults: {
          language: "en-US",
        },
        proxy: false,
        region: region,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

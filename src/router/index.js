import React from "react";
import { Navigate } from "react-router-dom";

// Pages
import App from "../App";
import Home from "../pages/home";
import Account from "../pages/account";

export default [
  {
    path: "/*",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "account",
        element: <Account />
      }
    ]
  }
];

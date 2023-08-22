import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";

import routes from "./router";

import createStore from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const Router = () => useRoutes(routes);

root.render(
  <Suspense>
    <Provider store={createStore()}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </Suspense>
);

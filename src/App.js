/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { Outlet } from "react-router-dom";

// Components
import Nav from "./components/common/nav";

import "./public/stylesheets/style.scss";

export default () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Nav />
    </>
  );
};

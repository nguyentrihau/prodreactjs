import React from "react";
import { Outlet } from "react-router-dom";
// import Btt from "../component/Btt/Btt";
import Footer from "../component/Footer/Footer";
import HeaderPage from "../component/HeaderPage/HeaderPage";

const HomeTemplate = () => {
  return (
    <div id="btt">
      {/* <Btt /> */}
      <header>
        <HeaderPage />
      </header>
      <div>
        <Outlet />
      </div>
      <footer className="mt-5">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeTemplate;

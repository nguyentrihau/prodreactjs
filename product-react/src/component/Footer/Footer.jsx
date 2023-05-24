import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-center text-white py-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <img
              src="../img/logo_footer.png"
              className="img img-fluid"
              alt=""
            />
          </div>
          <div className="col-lg-4">
            <p className="text-white fw-bold">
              515/86, Đường 30/4, Phường Hưng Lợi, Quận Ninh Kiều, Thành phố Cần
              Thơ
            </p>
          </div>
          <div className="col-lg-4">
            <p className="text-white fw-bold">
              <NavLink to={""} className="d-block">
                facebook
              </NavLink>
              <NavLink to={""} className="d-block">
                linkedin
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { getToken, huyStore, USER_LOGIN } from "../../util/config";

const HeaderPage = () => {
  const token = getToken();
  const { profile } = useSelector((state) => state.UserReducer);
  console.log(profile);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
        <div className="container">
          <NavLink to={"/"} className="navbar-brand text-light">
            <img
              src="../img/logo_footer.png"
              className="img img-fluid"
              alt=""
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <NavLink
                  to={"/"}
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link">
                  About
                </NavLink>
              </li>
              {profile && (
                <li className="nav-item login mx-1">
                  <NavLink to={"/"} className="nav-link">
                    {profile.name}
                  </NavLink>
                </li>
              )}

              {token ? (
                <li
                  className="nav-item login"
                  onClick={() => {
                    huyStore(USER_LOGIN);
                    window.location.reload();
                  }}
                >
                  <NavLink to={"/"} className="nav-link">
                    logout <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item login">
                  <NavLink
                    to={"login"}
                    className="nav-link"
                    onClick={() => {
                      history.push("/login");
                    }}
                  >
                    Login <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderPage;

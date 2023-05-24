import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import Products from "../../component/Products/Products";
import ProductsList from "../../component/Products/ProductsList";
import { getArrProductsApi } from "../../redux/reducers/ProductsReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { arrProducts } = useSelector((state) => state.ProductsReducer);
  useEffect(() => {
    dispatch(getArrProductsApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [viewType, setViewType] = useState("list");

  // render components for list view
  const renderList = () => {
    return (
      <div className="container">
        <div className="row">
          {arrProducts?.map((item) => {
            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item?.id}>
                <Products item={item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // render components for grid view
  const renderGrid = () => {
    return (
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-around align-items-center">
          <p>id</p>
          <p>image</p>
          <p>name</p>
          <p>description</p>
          <p>production</p>
          <p className="">action</p>
        </li>
        {arrProducts?.map((item) => {
          return <ProductsList item={item} key={item?.id} />;
        })}
      </ul>
    );
  };

  // switch between grid and list view
  const onViewTypeChange = () => {
    if (viewType === "list") {
      setViewType("grid");
    } else {
      setViewType("list");
    }
  };

  return (
    <div className="my__home ">
      <div className="d-flex justify-content-center">
        <button
          onClick={() => onViewTypeChange()}
          className="change__button d-block"
        >
          <p className="icon__item">
            <i
              className={viewType === "grid" ? "fa fa-trello" : "fa fa-list"}
              aria-hidden="true"
            ></i>
            <span>
              {viewType === "grid" ? "Change to grid" : "change to list"}
            </span>
          </p>
        </button>
        <button
          className="change__button add_button d-block"
          onClick={() => {
            history.push("/add");
          }}
        >
          <NavLink to={"add"} className="add">
            <i className="fa fa-newspaper-o" aria-hidden="true"></i> Add Product
          </NavLink>
        </button>
      </div>
      {viewType === "list" ? renderList() : renderGrid()}
    </div>
  );
};

export default Home;

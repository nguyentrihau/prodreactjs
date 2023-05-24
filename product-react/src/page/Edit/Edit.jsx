import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { putProductApi } from "../../redux/reducers/ProductsReducer";

const Edit = () => {
  const dispatch = useDispatch();
  const { productID } = useSelector((state) => state.ProductsReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: productID?.name,
      price: productID?.price,
      description: productID?.description,
      produce: productID?.produce,
      img: productID?.img,
    },
  });
  const onSubmit = (data) => {
    if (data) {
      console.log(data);
      dispatch(putProductApi(data, productID?.id));
      history.push("/");
    }
  };
  return (
    <div className="procduct-info">
      <div className="pricing-header px-3 py-4 pt-md-5 pb-md-4 mx-auto text-center">
        <h3 className="display-5">Product Infomation</h3>
        <NavLink to="/">Back</NavLink>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row py-1">
            <label htmlFor="name" className="col-sm-3 col-form-lable">
              Product name
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                {...register("name", {
                  required: {
                    value: "/^$|s+/",
                    message: "name cannot be empty",
                  },
                })}
              />
              {errors.name && errors.name?.message && (
                <span className="text-danger">{errors.name.message} </span>
              )}
            </div>
          </div>
          <div className="form-group row py-1">
            <label htmlFor="price" className="col-sm-3 col-form-lable">
              Product price
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="price"
                name="price"
                className="form-control"
                {...register("price", {
                  required: {
                    value: "/^$|s+/",
                    message: "price cannot be empty",
                  },
                })}
              />
              {errors.price && errors.price?.message && (
                <span className="text-danger">{errors.price.message} </span>
              )}
            </div>
          </div>
          <div className="form-group row py-1">
            <label htmlFor="description" className="col-sm-3 col-form-lable">
              Product description
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                {...register("description", {
                  required: {
                    value: "/^$|s+/",
                    message: "description cannot be empty",
                  },
                })}
              />
              {errors.description && errors.description?.message && (
                <span className="text-danger">
                  {errors.description.message}{" "}
                </span>
              )}
            </div>
          </div>
          <div className="form-group row py-1">
            <label htmlFor="produce" className="col-sm-3 col-form-lable">
              Product produce
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                id="produce"
                name="produce"
                className="form-control"
                {...register("produce", {
                  required: {
                    value: "/^$|s+/",
                    message: "produce cannot be empty",
                  },
                })}
              />
              {errors.produce && errors.produce?.message && (
                <span className="text-danger">{errors.produce.message} </span>
              )}
            </div>
          </div>

          <div className="form-group row py-1">
            <label htmlFor="img" className="col-sm-3 col-form-lable">
              Product img
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                name="img"
                id="img"
                className="form-control"
                {...register("img", {
                  required: {
                    value: "/^$|s+/",
                    message: "img cannot be empty",
                  },
                })}
              />
              {errors.img && errors.img?.message && (
                <span className="text-danger">{errors.img.message} </span>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="inputPassword"
              className="col-sm-3 col-form-lable"
            />
            <div className="col-sm-9 text-start">
              <button type="submit" className="btn btn-primary">
                Save
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  reset();
                }}
              >
                Clean
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

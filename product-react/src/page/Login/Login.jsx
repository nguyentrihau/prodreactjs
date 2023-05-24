import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postLoginApi } from "../../redux/reducers/UserReducer";

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(postLoginApi(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <form className="form__login m-auto w-50" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center mb-2">Login</h1>
      <div className="mb-3">
        <label htmlFor="emai" className="form-label">
          Email address
        </label>
        <input
          name="email"
          className="form-control"
          id="email"
          placeholder="example@gmail.com"
          {...register("email", {
            required: { value: "/^$|s+/", message: "Email cannot be empty" },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && errors.email?.message && (
          <span className="text-danger">{errors.email.message} </span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="password"
          {...register("password", {
            required: { value: "/^$|s+/", message: "Email cannot be empty" },
          })}
        />
        {errors.email && errors.password?.message && (
          <span className="text-danger">{errors.password.message} </span>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;

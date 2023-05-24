import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteProductApi,
  getArrProductsApi,
  getProductIdApi,
} from "../../redux/reducers/ProductsReducer";

const Products = ({ item }) => {
  const dispatch = useDispatch();
  const [id, setID] = useState("");
  useEffect(() => {
    setID(item?.id);
  }, [item?.id]);
  useEffect(() => {
    getArrProductsApi();
  }, []);
  const HandleEdit = () => {
    if (id) dispatch(getProductIdApi(id));
  };
  const HandleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        dispatch(deleteProductApi(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div className="card">
      <img
        src={item?.img}
        className="card-img-top"
        width={259}
        height={259}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{item?.name}</h5>
        <p className="card-text">
          {item?.description?.length > 20
            ? item?.description?.substr(0, 20) + "..."
            : item?.description}
        </p>
        <p className="card-text">id:{item?.id}</p>
        <p>
          <button className="btn btn-success mx-1" onClick={HandleEdit}>
            edit
          </button>
          <button className="btn btn-danger" onClick={HandleDelete}>
            delete
          </button>
        </p>
        <span className="prodution">prodution:{item?.produce}</span>
      </div>
    </div>
  );
};

export default Products;

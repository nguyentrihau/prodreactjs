import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteProductApi,
  getArrProductsApi,
  getProductIdApi,
} from "../../redux/reducers/ProductsReducer";
import Swal from "sweetalert2";
const ProductsList = ({ item }) => {
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
    <li className="list-group-item d-flex justify-content-around align-items-center">
      <p>{item?.id}</p>
      <p>
        <img
          src={item?.img}
          width={30}
          height={30}
          className="img img-fluid"
          alt="..."
        />
      </p>
      <p>{item?.name}</p>
      <p>{item?.description}</p>
      <p>{item?.produce}</p>
      <p>
        <button className="btn btn-success" onClick={HandleEdit}>
          edit
        </button>
        <button className="btn btn-danger" onClick={HandleDelete}>
          delete
        </button>
      </p>
    </li>
  );
};

export default ProductsList;

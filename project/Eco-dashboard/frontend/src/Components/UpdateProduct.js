import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_SUCCESSFULLY,
} from "../Redux/types";

import { fetchByID, updateProduct } from "../Redux/actions/productAction";
import { useEffect } from "react";
import Swal from "sweetalert2";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is require "),
  price: Yup.string().required("Price is require "),
  category: Yup.string().required("Category is require "),
  company: Yup.string().required("Company name is require "),
});

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.abc
  const { product } = useSelector((state) => ({
    product: state.product.fetchByID,
  }));
  console.log("product", product);
  console.log("name:-", product.name);

  useEffect(() => {
    dispatch(fetchByID(id));
  }, [dispatch]);

  const data = JSON.parse(localStorage.getItem("user"))._id;

  return (
    <div className="container mt-5 card p-5 shadow border-0 w-50">
      <div className="row">
        <div>
          <Formik
            initialValues={{
              name: product?.name,
              price: product?.price,
              category: product?.category,
              company: product?.company,
            }}
            enableReinitialize
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              const userId = data;
              const name = values.name;
              const price = values.price;
              const category = values.category;
              const company = values.company;
              const full = { name, price, category, company, userId };

              updateProduct(id, full).then((res) => {
                if (res.success) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.meassge,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  dispatch({
                    type: PRODUCT_UPDATE_SUCCESSFULLY,
                    paload: res.meassge,
                  });
                  navigate("/product");
                } else {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title:
                      res.meassge || "Something went wrong! Please try again.",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  dispatch({
                    type: PRODUCT_UPDATE_FAILURE,
                    payload: res.message,
                  });
                }
              });
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} id="form" className="row">
                <div className=" mx-auto col-10 col-md-9 col-lg-8 ">
                  <h1 className="mb-5">Update Product</h1>
                  <label htmlFor="name" className="mb-2">
                    Name
                  </label>
                  <div>
                    <input
                      name="name"
                      type="text"
                      placeholder="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }  input_`}
                    />
                    {errors.name && touched.name && (
                      <p id="error-=message" className="text-danger">
                        {errors.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" mx-auto col-10 col-md-9 col-lg-8 mt-4">
                  <label htmlFor="name" className="mb-2">
                    Price
                  </label>
                  <div>
                    <input
                      name="price"
                      type="number"
                      placeholder="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      }  input_`}
                    />
                    {errors.price && touched.price && (
                      <p id="error-=message" className="text-danger">
                        {errors.price}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" mx-auto col-10 col-md-9 col-lg-8 mt-4">
                  <label htmlFor="name" className="mb-2">
                    Category
                  </label>
                  <div>
                    <input
                      name="category"
                      type="text"
                      placeholder="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                      className={`form-control ${
                        errors.category ? "is-invalid" : ""
                      }  input_`}
                    />
                    {errors.category && touched.category && (
                      <p id="error-=message" className="text-danger">
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" mx-auto col-10 col-md-9 col-lg-8 mt-4">
                  <label htmlFor="name" className="mb-2">
                    Company Name
                  </label>
                  <div>
                    <input
                      name="company"
                      type="text"
                      placeholder="Company Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.company}
                      className={`form-control ${
                        errors.company ? "is-invalid" : ""
                      }  input_`}
                    />
                    {errors.company && touched.company && (
                      <p id="error-=message" className="text-danger">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="mx-auto col-10 col-md-9 col-lg-8 p-3 mt-3  bg-dark text-light btn  border-0 rounded"
                >
                  Update Product
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

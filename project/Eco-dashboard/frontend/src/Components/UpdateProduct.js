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

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name Required "),
  price: Yup.string().required("Price Required "),
  category: Yup.string().required("Category Required "),
  company: Yup.string().required("Company name Required "),
});

export default function UpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { product } = useSelector((state) => ({
    product: state.product.fetchByID,
  }));

  console.log(product.name);
  console.log(product.price);
  console.log(product.category);
  console.log(product.company);
  console.log("product", product);

  useEffect(() => {
    dispatch(fetchByID(params.id));
  }, [dispatch, params.id]);

  const data = JSON.parse(localStorage.getItem("user"))._id;

  return (
    <div className="container mt-5">
      <div className="row">
        <div>
          <Formik
            initialValues={{
              name: product.name,
              price: product.price,
              category: product.category,
              company: product.company,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              const userId = data;
              const name = values.name;
              const price = values.price;
              const category = values.category;
              const company = values.company;
              const full = { name, price, category, company, userId };
              updateProduct(params.id, full).then((res) => {
                if (res.success) {
                  alert(res.meassge);
                  dispatch({
                    type: PRODUCT_UPDATE_SUCCESSFULLY,
                    paload: res.meassge,
                  });
                  navigate("/product");
                } else {
                  alert(
                    res.message || "Something went wrong! Please try again."
                  );

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

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { signUp } from "../Redux/actions/authAction";
import { SIGNUP_FAILURE, SIGNUP_SUCCESSFULLY } from "../Redux/types";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name Required "),
  email: Yup.string().required("Email Required "),
  password: Yup.string()
    .required("password Required ")
    .min(4, "Password must be 4 characters long"),
});

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const users = localStorage.getItem("user");
    if (users) {
      navigate("/product");
    }
  }, []);
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              signUp(values).then((res) => {
                if (res.success) {
                  alert(res.meassge);
                  dispatch({
                    type: SIGNUP_SUCCESSFULLY,
                    paload: res.meassge,
                  });
                  navigate("/");
                } else {
                  alert(
                    res.message || "Something went wrong! Please try again."
                  );

                  dispatch({
                    type: SIGNUP_FAILURE,
                    payload: res.message,
                  });
                }
              });
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} id="form" className="row">
                <div className=" mx-auto col-10 col-md-9 col-lg-8 ">
                  <h1 className="mb-5">Register</h1>
                  <label htmlFor="name" className="mb-2">
                    Name
                  </label>
                  <div>
                    <input
                      name="name"
                      type="name"
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
                  <label htmlFor="email" className="mb-2">
                    Email
                  </label>
                  <div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }  input_`}
                    />
                    {errors.email && touched.email && (
                      <p id="error-=message" className="text-danger">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mx-auto col-10 col-md-9 col-lg-8 mt-4">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }  input_`}
                  />
                  {errors.password && touched.password && (
                    <p id="error-=message" className="text-danger">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="mx-auto col-10 col-md-9 col-lg-8 p-3 mt-3  bg-dark text-light btn  border-0 rounded"
                >
                  Sign Up
                </button>
                <Link
                  to="/"
                  className="Link d-flex  mt-4 justify-content-center"
                >
                  <h5 className="text-secondary ms-3 ">Back to login </h5>
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

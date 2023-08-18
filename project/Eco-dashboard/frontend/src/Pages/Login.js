import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { login } from "../Redux/actions/authAction";
import { LOGEDIN_FAILURE, LOGEDIN_SUCCESSFULLY } from "../Redux/types";
import Swal from "sweetalert2";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email Required "),
  password: Yup.string()
    .required("password Required ")
    .min(4, "Password must be 4 characters long"),
});

export default function Login() {
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
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log("values", values);
              login(values).then((res) => {
                console.log(res);
                if (res.success) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.meassge,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  dispatch({
                    type: LOGEDIN_SUCCESSFULLY,
                    paload: res.meassges,
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
                    type: LOGEDIN_FAILURE,
                    payload: res.meassge,
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
                <div className=" mx-auto col-10 col-md-9 col-lg-8 mt-4">
                  <h1 className="mb-5">Login</h1>
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
                  Login
                </button>
                <Link
                  to="/signup"
                  className="Link d-flex  mt-4 justify-content-center"
                >
                  <p>You dont Have an Account ? </p>
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

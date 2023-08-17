import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};
export default AuthLayout;

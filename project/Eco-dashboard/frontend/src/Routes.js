import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AddProduct from "./Components/AddProduct";

const ProtectedRoute = () => {
  const users = localStorage.getItem("user");
  return users ? <MainLayout /> : <Navigate to={"/"} />;
};

const Route = () => {
  let element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
    {
      element: (  
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/product", element: <h1>product</h1> },
        { path: "/add", element: <AddProduct/> },
        { path: "/update", element: <h1>update</h1> },
        { path: "/logout", element: <h1>logout</h1> },
      ],
    },
    {
      path: "*",
      element: <h1>404 Page not Found</h1>,
    },
  ]);

  return element;
};
export default Route;

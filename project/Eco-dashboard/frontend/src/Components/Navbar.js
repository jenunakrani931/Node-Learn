import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { Button, Overlay } from "react-bootstrap";
import { MdOutlineLogout } from "react-icons/md";
import { BiUserCircle, BiMailSend } from "react-icons/bi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
  const data = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleOverlayToggle = () => {
    setShow(!show);
  };

  return (
    <div className="main-sidebar ">
      <div className="d-flex justify-content-between">
        <ul className="sidebar">
          <li>
            <Link to="/product" className="link">
              Product
            </Link>
          </li>
          <li>
            <Link to="/add" className="link">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/update" className="link">
              Update Product
            </Link>
          </li>
          <li></li>
        </ul>
        <Button
          variant=""
          ref={target}
          onClick={handleOverlayToggle}
          className="p-0"
        >
          <ul className="sidebar">
            <li className="pe-3">
              <BiUserCircle className="fs-2 text-light" />
            </li>
          </ul>
        </Button>
      </div>
      <Overlay target={target.current} show={show} placement="bottom">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: "absolute",
              width: "250px",
              backgroundColor: "#034b5e",
              padding: "5px 15px",
              color: "white",
              borderRadius: 3,
              boxShadow: "5px 5px 20px #093845",
              ...props.style,
            }}
          >
            <div className="p-2">
              <div className="mb-2">
                <BiUserCircle className="me-2 fs-5" /> {JSON.parse(data).name}
              </div>
              <div className="mb-2">
                <BiMailSend className="me-2 fs-5" /> {JSON.parse(data).email}
              </div>
              <div>
                <MdOutlineLogout className="me-2 fs-5" />
                <Link
                  to="/logout"
                  className="link"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </Overlay>
    </div>
  );
};
export default Navbar;

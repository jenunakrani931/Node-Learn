import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Table from "react-bootstrap/Table";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  deletProduct,
  fetchProduct,
  searchProduct,
} from "../Redux/actions/productAction";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [search, setsearch] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data } = useSelector((state) => ({
    data: state.product.product,
  }));

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log(id);
    deletProduct(id).then((res) => {
      if (res.success) {
        alert(res.meassge);
        dispatch(fetchProduct());
      } else {
        alert(res.meassge || "Somthing went wrong! please try again");
      }
    });
    handleClose();
  };

  const handleUpdate = (_id) => {
    navigate(`/update/:${_id}`);
  };
  
  const productList = data.filter((product) => {
    if (!search) {
      return data;
    } else if (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.company.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  const handleSearch = (e) => {
    const key = e.target.value;
    setsearch(key);
    dispatch(searchProduct(key));
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <h2 className="text-center">Product List</h2>
        <input
          type="text"
          size="40"
          className="border p-2 search shadow-05"
          onChange={handleSearch}
        />
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.company}</td>
                  <td>{product.price}</td>
                  <td className="text-center">
                    <MdDelete
                      onClick={handleShow}
                      style={{ cursor: "pointer" }}
                    />
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton></Modal.Header>
                      <Modal.Body>
                        Are you sure ? you want to delete data
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleDelete(product._id)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <MdModeEditOutline
                      className="ms-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUpdate(product._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};
export default ProductList;

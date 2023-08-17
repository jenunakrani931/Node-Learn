import axios from "axios";
import { PRODUCT_FETCH_BYID_FAILURE, PRODUCT_FETCH_BYID_SUCCESSFULLY, PRODUCT_FETCH_FAILURE, PRODUCT_FETCH_SUCCESSFULLY, PRODUCT_SEARCH_FAILURE, PRODUCT_SEARCH_SUCCESSFULLY } from "../types";

export const addProduct = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/add-product",
      data
    );
    console.log(response);
    return {
      meassge: "Product add succesfully",
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      meassge: error.meassge,
      success: false,
    };
  }
};

export const fetchProduct = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        dispatch({
          type: PRODUCT_FETCH_SUCCESSFULLY,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_FETCH_FAILURE,
          error: error.message,
        });
      });
  };
};

export const deletProduct = async (_id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/product/${_id}`);
    console.log(response);
    return {
      meassge: "Product delete succesfully",
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      meassge: error.meassge,
      success: false,
    };
  }
};

export const updateProduct = async (_id,data) => {
  const id = _id.slice(1)
  try {
    const response = await axios.put(`http://localhost:4000/productUpdate/${id}`,data);
    console.log(response);
    return {
      meassge: "Product update succesfully",
      success: true,
      data: response,
    };
  } catch (error) {
    return {
      meassge: error.meassge,
      success: false,
    };
  }
};

export const fetchByID = (_id) => {
  const id = _id.slice(1)
  return async (dispatch) => {
    await axios
      .get(`http://localhost:4000/productById/${id}`)
      .then((response) => {
        dispatch({
          type: PRODUCT_FETCH_BYID_SUCCESSFULLY,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_FETCH_BYID_FAILURE,
          error: error.message,
        });
      });
  };
};

export const searchProduct = (key) => {
  return async (dispatch) => {
    await axios
      .get(`http://localhost:4000/product-search/${key}`)
      .then((response) => {
        dispatch({
          type: PRODUCT_SEARCH_SUCCESSFULLY,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_SEARCH_FAILURE,
          error: error.message,
        });
      });
  };
};
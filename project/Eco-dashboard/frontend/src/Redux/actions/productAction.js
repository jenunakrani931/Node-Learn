import axios from "axios";

export const addProduct = async (data) => {
  try {
    const response = await axios.post("http://localhost:4000/add-product", data);
    console.log(response);
    return {
      meassge: "Product add succesfuly",
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


import axios from "axios";

export const signUp = async (data) => {
  try {
    const response = await axios.post("http://localhost:4000/register", data);
    console.log(response);
    return {
      meassge: "SignUp succesfuly",
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

export const login = async (data) => {
  const response = await axios.post("http://localhost:4000/login", data);
  console.log(response);
  if (response.data.name) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return {
      meassges: "Login succesfuly",
      success: true,
      data: response.data,
    };
  } else {
    return {
      meassge: response.data.result,
      success: false,
    };
  }
};

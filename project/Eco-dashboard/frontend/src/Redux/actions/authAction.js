import axios from "axios";

export const signUp = async (data) => {
  try {
    const response = await axios.post("http://localhost:4000/register", data);
    console.log(response);
    return {
      meassge: "SignUp succesfully",
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
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token",response.data.token);
    return {
      meassges: "Login succesfully",
      success: true,
      data: response.data.user,
    };
  } else {
    return {
      meassge: response.data.result,
      success: false,
    };
  }
};

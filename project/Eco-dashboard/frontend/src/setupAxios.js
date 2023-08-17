const setupAxios = (axios) => {
  let token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  }
};

export default setupAxios;

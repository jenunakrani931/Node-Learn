const setupAxios = (axios) => {
  let token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  }
};

export default setupAxios;

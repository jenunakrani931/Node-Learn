import "./App.css";
import Route from "./Routes";
import { Fragment } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import setupAxios from "./setupAxios";
import axios from "axios";
function App() {
  setupAxios(axios)
  return (
    <Fragment>
      <Route />
    </Fragment>
  );
}

export default App;

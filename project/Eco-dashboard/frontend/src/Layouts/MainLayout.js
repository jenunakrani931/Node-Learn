import { Fragment } from "react"
import Navbar from "../Components/Navbar"
import { Outlet } from "react-router-dom"

const MainLayout = ()=>{
return(
    <Fragment>
        <Navbar/>
        <Outlet/>
    </Fragment>
)
}
export default MainLayout
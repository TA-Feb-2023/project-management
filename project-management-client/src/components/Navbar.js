import { NavLink } from "react-router-dom"

function Navbar() {
    return (
    <>
     <NavLink to="/"> Home Page </NavLink>

     <NavLink to="/projects"> Projects </NavLink>
    </>
    )
}

export default Navbar
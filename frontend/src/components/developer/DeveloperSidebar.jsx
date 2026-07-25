import {NavLink} from "react-router-dom";
import "./DeveloperSidebar.css";

export default function DeveloperSidebar(){

return(

<div className="developer-sidebar">

<h2>

Developer

</h2>

<NavLink to="/developer">

Dashboard

</NavLink>



</div>

);

}
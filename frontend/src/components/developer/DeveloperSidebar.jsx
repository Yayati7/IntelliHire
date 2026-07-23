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

<NavLink to="/developer/analytics">

Analytics

</NavLink>

<NavLink to="/developer/system">

System

</NavLink>

<NavLink to="/developer/logs">

Logs

</NavLink>

</div>

);

}
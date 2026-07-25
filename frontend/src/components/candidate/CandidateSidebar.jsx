import "./CandidateSidebar.css";

import {NavLink} from "react-router-dom";

export default function CandidateSidebar(){

return(

<div className="sidebar">

<h2>

Candidate

</h2>

<NavLink to="/candidate/home">

Dashboard

</NavLink>

<NavLink to="/candidate/applications">

Applications

</NavLink>

<NavLink to="/candidate/profile">

Profile

</NavLink>

</div>

);

}
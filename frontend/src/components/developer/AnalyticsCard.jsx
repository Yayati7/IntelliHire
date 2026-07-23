import "./AnalyticsCard.css";

export default function AnalyticsCard({

title,

value

}){

return(

<div className="analytics-card">

<h2>

{value}

</h2>

<p>

{title}

</p>

</div>

);

}
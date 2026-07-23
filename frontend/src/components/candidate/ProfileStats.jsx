import "./ProfileStats.css";

export default function ProfileStats({

recommendations,

applications,

history

}){

return(

<div className="profile-stats">

<div>

<h1>

{recommendations}

</h1>

<p>

Recommendations

</p>

</div>

<div>

<h1>

{applications}

</h1>

<p>

Applications

</p>

</div>

<div>

<h1>

{history}

</h1>

<p>

History Records

</p>

</div>

</div>

);

}
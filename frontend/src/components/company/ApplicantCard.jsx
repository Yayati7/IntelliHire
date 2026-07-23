import "./ApplicantCard.css";

export default function ApplicantCard({

candidate,

approve,

reject

}){

return(

<div className="applicant-card">

<div>

<h2>

{candidate.name}

</h2>

<p>

Email :

{candidate.email}

</p>

<p>

AI Match :

{candidate.score}%

</p>

</div>

<div>

<button

onClick={()=>approve(candidate)}

>

Approve

</button>

<button

onClick={()=>reject(candidate)}

>

Reject

</button>

<button>

Resume

</button>

</div>

</div>

);

}
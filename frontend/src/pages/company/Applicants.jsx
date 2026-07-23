import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import {

getApplicantDetails

} from "../../services/applicationService";

import "./Applicants.css";

export default function Applicants(){

const { jobId } = useParams();

const [applicants,setApplicants] = useState([]);

useEffect(()=>{

loadApplicants();

},[]);

async function loadApplicants(){

try{

const data =

await getApplicantDetails(

jobId

);

setApplicants(

data

);

}

catch(e){

console.log(e);

}

}

async function approve(id){

if(

!window.confirm(

"Approve this candidate?"

)

){

return;

}

try{

await axios.put(

`http://localhost:8084/application/${id}/approve`

);

setApplicants(

applicants.map(app=>

app.applicationId===id

?

{

...app,

status:"NEXT_ROUND"

}

:

app

)

);

alert(

"Candidate Approved"

);

}

catch(e){

console.log(e);

}

}

async function reject(id){

if(

!window.confirm(

"Reject this candidate?"

)

){

return;

}

try{

await axios.put(

`http://localhost:8084/application/${id}/reject`

);

setApplicants(

applicants.map(app=>

app.applicationId===id

?

{

...app,

status:"REJECTED"

}

:

app

)

);

alert(

"Candidate Rejected"

);

}

catch(e){

console.log(e);

}

}

return(

<div className="applicants-page">

<h2>

Applicants

</h2>

{

applicants.length===0 &&

<p>

No applicants yet.

</p>

}

{

applicants.map(app=>(

<div

key={app.applicationId}

className="applicant-card"

>

<h3>

{app.candidateName}

</h3>

<p>

<b>Email:</b>

{app.email}

</p>

<a

href={`http://localhost:8082/resume/download/${app.userId}`}

target="_blank"

rel="noreferrer"

>

📄 View Resume

</a>

<p>

<b>Status:</b>

{app.status}

</p>

<div className="applicant-actions">

<button

onClick={()=>approve(app.applicationId)}

disabled={app.status==="NEXT_ROUND"}

>

Approve

</button>

<button

onClick={()=>reject(app.applicationId)}

disabled={app.status==="REJECTED"}

>

Reject

</button>

</div>

</div>

))

}

</div>

);

}
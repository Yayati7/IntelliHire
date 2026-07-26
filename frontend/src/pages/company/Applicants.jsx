import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

import { FaFileAlt } from "react-icons/fa";

import CompanyLayout from "../../layouts/CompanyLayout";

import { useConfirm } from "../../context/ConfirmContext";

import {

getApplicantDetails

} from "../../services/applicationService";

import "./Applicants.css";

export default function Applicants(){

const { jobId } = useParams();

const confirm = useConfirm();

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

const ok = await confirm("Approve this candidate for the next round?", {
    title: "Approve Candidate",
    confirmText: "Approve"
});

if(!ok){

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

toast.success(

"Candidate Approved"

);

}

catch(e){

console.log(e);

}

}

async function reject(id){

const ok = await confirm("Reject this candidate's application?", {
    title: "Reject Candidate",
    confirmText: "Reject",
    danger: true
});

if(!ok){

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

toast.success(

"Candidate Rejected"

);

}

catch(e){

console.log(e);

}

}

return(

<CompanyLayout>

<div className="applicants-page">

<h2>

Applicants

</h2>

{

applicants.length===0 &&

<p className="applicants-empty">

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

{

app.resumeFileName && (

<a

href={`http://localhost:8082/resume/download/${app.userId}`}

target="_blank"

rel="noreferrer"

>

<FaFileAlt /> View Resume

</a>

)

}

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

</CompanyLayout>

);

}
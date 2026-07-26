import {

useEffect,

useState

}

from "react";

import CompanyLayout from "../../layouts/CompanyLayout";

import CompanyJobCard from "../../components/company/CompanyJobCard";

import {

getRecruiterJobs,

deleteJob

}

from "../../services/jobService";

import {

useNavigate

}

from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./MyJobs.css";

export default function MyJobs(){

const navigate=

useNavigate();

const { user } = useAuth();

const[jobs,setJobs]=

useState([]);

useEffect(()=>{

if(user){

load();

}

},[user]);

async function load(){

const data=

await getRecruiterJobs(

user.userId

);

setJobs(data);

}

async function remove(id){

await deleteJob(id);

load();

}

function edit(job){

navigate(

"/company/edit/"+job.id,

{

state:job

}

);

}

function applicants(id){

navigate(

"/company/applicants/job/" + id

);

}

return(

<CompanyLayout>

<div className="my-jobs-page">

<h1>

My Posted Jobs

</h1>

<div className="my-jobs-grid">

{

jobs.map(job=>

<CompanyJobCard

key={job.id}

job={job}

onDelete={remove}

onEdit={edit}

onApplicants={applicants}

/>

)

}

</div>

</div>

</CompanyLayout>

);

}
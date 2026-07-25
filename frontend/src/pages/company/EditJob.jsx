import {useEffect,useState} from "react";

import axios from "axios";

import {

useNavigate,

useParams

}

from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import CompanyLayout from "../../layouts/CompanyLayout";

import "./PostJob.css";

export default function EditJob(){

const{id}=

useParams();

const navigate=

useNavigate();

const { user } = useAuth();

const[job,setJob]=

useState({

title:"",

company:"",

location:"",

description:"",

skills:""

});

useEffect(()=>{

loadJob();

},[]);

async function loadJob(){

try{

const res=

await axios.get(

`http://localhost:8083/job/${id}`

);

setJob(res.data);

}

catch(e){

console.log(e);

}

}

function handleChange(e){

setJob({

...job,

[e.target.name]:

e.target.value

});

}

async function update(){

try{

await axios.put(

`http://localhost:8083/job/${id}`,

{

...job,

recruiterId:user.userId

}

);

alert(

"Job Updated"

);

navigate(

"/company/home"

);

}

catch(e){

console.log(e);

}

}

return(

<CompanyLayout>

<div className="post-job">

<h2>

Edit Job

</h2>

<input

name="title"

value={job.title}

onChange={handleChange}

/>

<input

name="company"

value={job.company}

onChange={handleChange}

/>

<input

name="location"

value={job.location}

onChange={handleChange}

/>

<textarea

rows="8"

name="description"

value={job.description}

onChange={handleChange}

/>

<input

name="skills"

value={job.skills}

onChange={handleChange}

/>

<button

onClick={update}

>

Update Job

</button>

</div>

</CompanyLayout>

);

}
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CandidateLayout from "../../layouts/CandidateLayout";

import DashboardHeader from "../../components/candidate/DashboardHeader";
import ResumeStatusCard from "../../components/candidate/ResumeStatusCard";
import StatsCard from "../../components/candidate/StatsCard";
import SearchBar from "../../components/candidate/SearchBar";
import JobCard from "../../components/candidate/JobCard";

import HistoryCard from "../../components/candidate/HistoryCard";
import HistoryModal from "../../components/candidate/HistoryModal";

import PageLoader from "../../components/common/PageLoader";

import { useAuth } from "../../context/AuthContext";

import {
    getUser
} from "../../services/userService";

import {
    getResume
} from "../../services/resumeService";

import {
    applyJob
} from "../../services/applicationService";

import {
    getRecommendations
} from "../../services/recommendationService";

import {
    searchJobs
} from "../../services/jobService";

import {

    getRecommendationHistory,

    getHistoryDetails

} from "../../services/historyService";

import "../../styles/CandidateDashboard.css";

export default function CandidateHome(){

const { user } = useAuth();

const[userData,setUser]=
useState(null);

const[loading,setLoading]=
useState(true);

const[resumeUploaded,setResumeUploaded]=
useState(false);

const[history,setHistory]=
useState([]);

const[selectedHistory,setSelectedHistory]=
useState(null);

const[historyOpen,setHistoryOpen]=
useState(false);

const name=
userData?.name??
"Candidate";

const[recommendations,setRecommendations]=
useState([]);

const[title,setTitle]=
useState("");

const[location,setLocation]=
useState("");

useEffect(()=>{

if(user){

initialize();

}

},[user]);

async function initialize(){

try{

const data=

await getUser(

user.userId

);

setUser(data);

}catch(e){

console.log(e);

}

try{

await getResume(

user.userId

);

setResumeUploaded(true);

await loadRecommendations();

}catch(e){

setResumeUploaded(false);

await loadRandomJobs();

}

try{

const historyData=

await getRecommendationHistory(

user.userId

);

setHistory(historyData);

}catch(e){

setHistory([]);

}

setLoading(false);

}

async function loadRecommendations(){

try{

const data=

await getRecommendations(

user.userId

);

setRecommendations(

data.recommendations??

data

);

}catch(e){

console.log(e);

}

}

async function loadRandomJobs(){

try{

const data=

await searchJobs(

"",

""

);

setRecommendations(data);

}catch(e){

console.log(e);

}

}

async function search(){

const data=

await searchJobs(

title,

location

);

setRecommendations(data);

}

function reset(){

setTitle("");

setLocation("");

if(resumeUploaded){

loadRecommendations();

}
else{

loadRandomJobs();

}

}

async function apply(

jobId

){

if(!resumeUploaded){

toast.error(

"Upload resume first."

);

return;

}

try{

await applyJob(

user.userId,

jobId

);

toast.success(

"Application submitted."

);

}catch(e){

toast.error(

"Application failed."

);

}

}

async function openHistory(

historyId

){

const details=

await getHistoryDetails(

historyId

);

setSelectedHistory(details);

setHistoryOpen(true);

}

if(loading){

return <PageLoader/>;

}

console.log(recommendations);

return(

<CandidateLayout>

<ToastContainer/>

<DashboardHeader

name={name}

/>

<ResumeStatusCard

resumeUploaded={resumeUploaded}

onUpload={()=>{}}

onUpdate={()=>{}}

/>

<div className="dashboard-stats">

<StatsCard

title="Recommended Jobs"

value={recommendations.length}

/>

<StatsCard

title="Applications"

value="0"

/>

<StatsCard

title="Resume"

value={

resumeUploaded

?

"✔"

:

"✖"

}

/>

</div>

<SearchBar

title={title}

setTitle={setTitle}

location={location}

setLocation={setLocation}

search={search}

reset={reset}

/>

<h2 className="jobs-heading">

Recommended Jobs

</h2>

{

recommendations.map(job=>

<JobCard

key={job.jobId}

job={job}

resumeUploaded={resumeUploaded}

onApply={apply}

/>

)

}

<h2

className="jobs-heading"

>

Recommendation History

</h2>

{

history.map(item=>

<HistoryCard

key={item.historyId}

history={item}

onOpen={openHistory}

/>

)

}

<HistoryModal

open={historyOpen}

data={selectedHistory}

onClose={()=>setHistoryOpen(false)}

/>

</CandidateLayout>

);

}
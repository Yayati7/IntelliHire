import { useEffect, useState } from "react";

import { toast } from "react-toastify";

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

import { FaBriefcase, FaClipboardList, FaFileAlt } from "react-icons/fa";

import ResumeUploadModal from "../../components/candidate/ResumeUploadModal";
import { uploadResume } from "../../services/resumeService";
import { getUserApplicationDetails } from "../../services/applicationService";

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

const [uploadOpen, setUploadOpen] = useState(false);
const [appliedMap, setAppliedMap] = useState({});

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

const apps = await getUserApplicationDetails(user.userId);

const map = {};

apps.forEach(a => {
    map[a.jobId] = a.status;
});

setAppliedMap(map);

}catch(e){

setAppliedMap({});

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

const data = await searchJobs("", "");

const normalized = data.map(job => ({

...job,

jobId: job.id,

finalScore: undefined

}));

setRecommendations(normalized);

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

setAppliedMap(prev => ({
    ...prev,
    [jobId]: "APPLIED"
}));

toast.success(

"Application submitted."

);

}catch(e){

toast.error(

e?.response?.data?.message || "Application failed."

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

<DashboardHeader

name={name}

/>

<ResumeStatusCard

resumeUploaded={resumeUploaded}

onUpload={() => setUploadOpen(true)}

onUpdate={() => setUploadOpen(true)}

/>

<ResumeUploadModal

open={uploadOpen}

onClose={() => setUploadOpen(false)}

onUpload={async (file) => {

await uploadResume(user.userId, file);

setResumeUploaded(true);

await loadRecommendations();

toast.success("Resume uploaded. Recommendations updated.");

}}

/>

<div className="dashboard-stats">

<StatsCard

icon={<FaBriefcase />}

title="Recommended Jobs"

value={recommendations.length}

/>

<StatsCard

icon={<FaClipboardList />}

title="Applications"

value="0"

/>

<StatsCard

icon={<FaFileAlt />}

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

<div className="jobs-grid">

{

recommendations.map(job=>

<JobCard

key={job.jobId}

job={job}

resumeUploaded={resumeUploaded}

appliedStatus={appliedMap[job.jobId]}

onApply={apply}

/>

)

}

</div>

<h2

className="jobs-heading"

>

Recommendation History

</h2>

<div className="history-list">

{

history.map(item=>

<HistoryCard

key={item.historyId}

history={item}

onOpen={openHistory}

/>

)

}

</div>

<HistoryModal

open={historyOpen}

data={selectedHistory}

onClose={()=>setHistoryOpen(false)}

/>

</CandidateLayout>

);

}
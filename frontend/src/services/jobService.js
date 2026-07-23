import axios from "axios";

const API="http://localhost:8083";

export async function searchJobs(

title,

location

){

const response=

await axios.get(

`${API}/job/search`,

{

params:{

title,

location

}

}

);

return response.data;

}

export async function createJob(job){

const response=

await axios.post(

`${API}/job`,

job

);

return response.data;

}

export async function getJobs(){

const response=

await axios.get(

`${API}/job`

);

return response.data;


}

export async function getRecruiterJobs(recruiterId){

    const response = await axios.get(

        `http://localhost:8083/job/recruiter/${recruiterId}`

    );

    return response.data;

}



export async function deleteJob(

id

){

await axios.delete(

`${API}/job/${id}`

);

}

export async function updateJob(

id,

job

){

const response=

await axios.put(

`${API}/job/${id}`,

job

);

return response.data;

}
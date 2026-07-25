import axios from "axios";

const API = "http://localhost:8084";

export async function applyJob(

    userId,

    jobId

){

    const response =

    await axios.post(

        `${API}/application/apply`,

        {

            userId,

            jobId

        }

    );

    return response.data;

}

export async function getUserApplicationDetails(userId){

    const response =
    await axios.get(
        `${API}/application/user/${userId}/details`
    );

    return response.data;
}

export async function getJobApplications(

    jobId

){

    const response =

    await axios.get(

        `${API}/application/job/${jobId}`

    );

    return response.data;

}

export async function getApplicantDetails(

    jobId

){

    const response =

    await axios.get(

        `${API}/application/job/${jobId}/details`

    );

    return response.data;

}

export async function approveApplication(id){
    const response = await axios.put(
        `${API}/application/${id}/approve`
    );
    return response.data;
}

export async function rejectApplication(id){
    const response = await axios.put(
        `${API}/application/${id}/reject`
    );
    return response.data;
}
import axios from "axios";

const API="http://localhost:8082";

export async function getResume(userId){

    const response=

    await axios.get(

        `${API}/resume/user/${userId}`

    );

    return response.data;

}

export async function uploadResume(

    userId,

    file

){

    const formData=new FormData();

    formData.append(

        "userId",

        userId

    );

    formData.append(

        "file",

        file

    );

    const response=

    await axios.post(

        `${API}/resume/upload`,

        formData,

        {

            headers:{

                "Content-Type":"multipart/form-data"

            }

        }

    );

    return response.data;

}
import axios from "axios";

const API="http://localhost:8082";

export async function getUser(userId){

    const response=

    await axios.get(

        `${API}/user/${userId}`

    );

    return response.data;

}
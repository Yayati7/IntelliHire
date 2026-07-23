import axios from "axios";

const API = "http://localhost:8086";

export async function getDashboard() {
    const response = await axios.get(
        `${API}/analytics/dashboard`
    );
    return response.data;
}

export async function getSystemHealth(){

const response=

await axios.get(

`${API}/analytics/system`

);

return response.data;

}
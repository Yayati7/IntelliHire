import axios from "axios";

const API="http://localhost:8085";

export async function getRecommendations(userId){

const response=

await axios.get(

`${API}/recommendation/${userId}`

);

return response.data;

}
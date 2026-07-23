import axios from "axios";

const API = "http://localhost:8085";

export async function getRecommendationHistory(userId){

    const response = await axios.get(

        `${API}/recommendation/history/${userId}`

    );

    return response.data;

}

export async function getHistoryDetails(historyId){

    const response = await axios.get(

        `${API}/recommendation/history/details/${historyId}`

    );

    return response.data;

}
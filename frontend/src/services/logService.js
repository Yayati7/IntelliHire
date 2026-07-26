import axios from "axios";

export async function getServiceLogs(baseUrl, lines = 300) {
    const response = await axios.get(`${baseUrl}/logs`, { params: { lines } });
    return response.data;
}
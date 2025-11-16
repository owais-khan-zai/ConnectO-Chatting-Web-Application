import axios from "axios";

axios.defaults.withCredentials = true;

export const ApiRequestHandler = async (method, url, payload = {}) => {
    try {
        let response;
        if(method.toLowerCase() === "get"){
            response = await axios.get(url)
        }
        else if(method.toLowerCase() === "post"){
            response = await axios.post(url, payload)
        }
        else{
            console.log("Invalid HTTP method")
        }
        return response.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Something went wrong";
        throw new Error(errMsg);
    }
}
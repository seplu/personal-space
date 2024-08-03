import axios from "../api/Axios";

const CheckMe = () => {
    return axios.get("/user").then(response => {
        return !!response?.data?.username;

    }).catch(() => {
        return false;
    });
}

export default CheckMe;

import axios from "../api/Axios";

const RegisterCheck = async () => {
    const REGISTER_CHECK_URL = "/register/check"
    try {
        const response = await axios.get(REGISTER_CHECK_URL);
        return response?.data?.value;
    } catch (error) {
        console.error('Error fetching register setting:', error);
        return false;
    }
};
export default RegisterCheck;

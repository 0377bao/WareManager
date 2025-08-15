import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, options = {}, token, employeeID) => {
    const response = await request.post(path, options, {
        headers: {
            token: `Beare ${token}`,
            employeeid: employeeID,
        }
    });
    return response.data;
};

export default request;

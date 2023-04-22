import axios from 'axios';
axios.defaults.baseURL = 'https://6429521bebb1476fcc46e108.mockapi.io/';
const controller = new AbortController();

export const getUsers = async (p) => {
    try {
        const users = await axios(`/tweeter-users?page=${p}&limit=3`, {
            signal: controller.signal
         });
        return users;
    } catch (err) {
        throw new Error("Loading error");
    }
    
}
export const abortRequest = () => {
    controller.abort();
}

export const updateUser = async (u) => {

    try {
        const res = await axios.put(`/tweeter-users/${u.id}`, u);
        return res;
    } catch(error) {
        return error;
    }
}
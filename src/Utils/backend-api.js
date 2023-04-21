import axios from 'axios';
axios.defaults.baseURL = 'https://6429521bebb1476fcc46e108.mockapi.io/';

export const getUsers = async () => {
    try {
        const users = await axios('/tweeter-users');
        return users;
    } catch(error) {
        return error;
    }
    
}

export const updateUser = async (u) => {

    try {
        const res = await axios.put(`/tweeter-users/${u.id}`, u);
        return res;
    } catch(error) {
        return error;
    }
}
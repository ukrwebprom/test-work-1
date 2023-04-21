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

export const updateUser = async (id, followers) => {
    const user = {
        followers:followers
    }
    try {
        const res = await axios.patch(`/tweeter-users/${id}`, user);
        return res;
    } catch(error) {
        return error;
    }
}
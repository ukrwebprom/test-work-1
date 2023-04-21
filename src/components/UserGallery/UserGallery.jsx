import { useState, useEffect } from "react"
import { UserCard } from "../UserCard/UserCard"
import * as backend from "../../Utils/backend-api";
import './usergallery.scss';

export const UserGallery = () => {
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState(() => localStorage.getItem('following') ? JSON.parse(localStorage.getItem('following')) : []);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showLimit, setShowLimit] = useState(3);
    
    const loadUsers = async () => {
        try {
            const res = await backend.getUsers();
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            setIsError(true);
        }
    }

    const updateUser = async (u) => {
        try {
            const res = await backend.updateUser(u);
            setUsers(u => u.map(cur => cur.id === res.data.id ? res.data : cur));
        } catch (error) {
            setIsError(true);
        }
    }
    const loadMore = () => setShowLimit(l => l + 3);

    const followUser = id => {
        const user = {...users.find(u => u.id === id)}
        if(following.includes(id)) {
            user.followers -= 1;
            setFollowing(u => u.filter(f => f !== id ));
        } else {
            user.followers += 1;
            setFollowing(u => [...u, id]);
        }
        updateUser(user)
    }

    useEffect(() => {
        localStorage.setItem('following', JSON.stringify(following));
    }, [following])

    useEffect(() => {
        setLoading(true);
        loadUsers();
    }, [])

    return(
        <div className="wrapper">
        {loading && <p>Loading</p>} 
        {isError && <p>Loading error</p>}
        <ul className="userlist">
            {users.map((u, index) => 
                (index <= showLimit-1) &&
                <li key={u.id}>
                    <UserCard user={u} onFollow={followUser} isFollowing={following.includes(u.id)} />
                </li>
            
            )}
        </ul>
        <button type="button" onClick={loadMore}>Load more</button>
        </div>
    )
}
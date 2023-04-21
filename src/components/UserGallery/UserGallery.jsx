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
            console.log(res.data);
        } catch (error) {
            setIsError(true);
            console.log(error);
        }
    }
    const loadMore = () => setShowLimit(l => l + 3);

    const followUser = id => {
        if(following.includes(id)) {
            setFollowing(u => u.filter(f => f !== id ));
        } else {
            setFollowing(u => [...u, id]);
        }
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
import { UserCard } from "../components/UserCard/UserCard";
import { TweetsHeader } from "../components/TweetsHeader/TweetsHeader";
import { useState, useEffect, useRef } from "react";
import * as backend from "../Utils/backend-api";
import clsx from "clsx";
import Alert from "@mui/material/Alert";

export const Tweets = () => {
  const Init = useRef(false);
  const Step = 3;
  const TweetFilter = ["Show All", "Follow", "Followings"];
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [following, setFollowing] = useState(() =>
    localStorage.getItem("following")
      ? JSON.parse(localStorage.getItem("following"))
      : []
  );
  const isFollowing = id => following.includes(id);

  const loadUsers = async (p) => {
    try {
      const res = (filter === '')?  await backend.getUsers(p, Step) : await backend.getAllUsers();
      setUsers((current) => (filter === '')? [...current, ...res.data] : [...res.data]);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error.message)
    }
  };

  useEffect(() => {
    if (!Init.current) {
      return () => (Init.current = true);
    } else {
      setLoading(true);
      loadUsers(page);
    }
  }, [filter, page]);

  useEffect(() => {
    localStorage.setItem("following", JSON.stringify(following));
  }, [following]);

/*   const handleLoadMore = () => {
    loadUsers(page + 1);
    setLoading(true);
    setPage((p) => p + 1);
  }; */

/*   const handleFilter = (f) => {
    setFilter(f);
  }; */

/*   useEffect(() => {
    if(Init.current) {
      console.log("djsdb")
    }
  }, [filter, page]) */

  const filteredTweets = () => {
    let filtered = {};
    switch (filter) {
      case TweetFilter[1]:
        filtered = users.filter((u) => !isFollowing(u.id));
        break;
      case TweetFilter[2]:
        filtered = users.filter((u) => isFollowing(u.id));
        break;
      default:
        filtered = users;
    }
    return filtered;
  };

  const updateUser = async (u) => {
    try {
      const res = await backend.updateUser(u);
      setUsers((u) =>
        u.map((cur) => (cur.id === res.data.id ? res.data : cur))
      );
    } catch (error) {
      setIsError(true);
    }
  };

  const toggleFollowUser = (id) => {
    const user = { ...users.find((u) => u.id === id) };
    user.followers = isFollowing(id)? user.followers - 1 : user.followers + 1;
    setFollowing((u) => isFollowing(id)? u.filter((f) => f !== id) : [...u, id]);
    updateUser(user);
  };

  return (
    <div className="wrapper">
      <TweetsHeader filter={TweetFilter} onFilter={setFilter} />
      {!isError ? (
        <>
        <ul className="userlist">
          {filteredTweets().length > 0 ? (
            filteredTweets().map((u, index) => ((index < page * Step || filter === '') &&
              <li key={u.id}>
                <UserCard
                  user={u}
                  onFollow={toggleFollowUser}
                  isFollowing={following.includes(u.id)}
                />
              </li>
              )
            )
          ) : (
            <Alert severity="error">Nothing to show</Alert>
          )}
        </ul>
      

      <button
        type="button"
        onClick={() => setPage((p) => p + 1)}
        className={clsx("mainBtn", { loading: loading })}
        disabled={loading}
      >
        Load more
      </button>
      </>
      ) :
      (<Alert severity="error">Server communication error</Alert>)
    }
    </div>
  );
};

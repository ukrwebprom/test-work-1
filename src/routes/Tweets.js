import { UserCard } from "../components/UserCard/UserCard";
import { TweetsHeader } from "../components/TweetsHeader/TweetsHeader";
import { useState, useEffect, useRef } from "react";
import * as backend from "../Utils/backend-api";
import clsx from "clsx";
import Alert from "@mui/material/Alert";

export const Tweets = () => {
  const Init = useRef(false);
  const TweetFilter = ["Show All", "Follow", "Followings"];
  const [filter, setFilter] = useState(TweetFilter[0]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [following, setFollowing] = useState(() =>
    localStorage.getItem("following")
      ? JSON.parse(localStorage.getItem("following"))
      : []
  );

  const loadUsers = async (p) => {
    try {
      const res = await backend.getUsers(p);
      setUsers((current) => [...current, ...res.data]);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error.message)
    }
  };

  useEffect(() => {
    if (!Init.current) {
      setLoading(true);
      loadUsers(page);
      return () => (Init.current = true);
    }
  }, [page]);

  useEffect(() => {
    localStorage.setItem("following", JSON.stringify(following));
  }, [following]);

  const handleLoadMore = () => {
    loadUsers(page + 1);
    setLoading(true);
    setPage((p) => p + 1);
  };

  const handleFilter = (f) => {
    setFilter(f);
  };

  const filteredTweets = () => {
    let filtered = {};
    switch (filter) {
      case TweetFilter[1]:
        filtered = users.filter((u) => !following.includes(u.id));
        break;
      case TweetFilter[2]:
        filtered = users.filter((u) => following.includes(u.id));
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
    if (following.includes(id)) {
      user.followers -= 1;
      setFollowing((u) => u.filter((f) => f !== id));
    } else {
      user.followers += 1;
      setFollowing((u) => [...u, id]);
    }
    updateUser(user);
  };

  return (
    <div className="wrapper">
      <TweetsHeader filter={TweetFilter} onFilter={handleFilter} />
      {!isError ? (
        <>
        <ul className="userlist">
          {filteredTweets().length > 0 ? (
            filteredTweets().map((u) => (
              <li key={u.id}>
                <UserCard
                  user={u}
                  onFollow={toggleFollowUser}
                  isFollowing={following.includes(u.id)}
                />
              </li>
            ))
          ) : (
            <Alert severity="error">Nothing to show</Alert>
          )}
        </ul>
      

      <button
        type="button"
        onClick={handleLoadMore}
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

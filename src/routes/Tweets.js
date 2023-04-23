import { UserCard } from "../components/UserCard/UserCard";
import { TweetsHeader } from "../components/TweetsHeader/TweetsHeader";
import { useState, useEffect, useRef } from "react";
import * as backend from "../Utils/backend-api";
import clsx from "clsx";
import Alert from "@mui/material/Alert";

export const Tweets = () => {
  const Init = useRef(false);
  const Step = 3;
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [following, setFollowing] = useState(() =>
    localStorage.getItem("following")
      ? JSON.parse(localStorage.getItem("following"))
      : []
  );
  const isFollowing = (id) => following.includes(id);
  const isEmpty = () => filteredTweets().length <= page * Step;

  const loadUsers = async () => {
    try {
      const res = await backend.getUsers();
      setUsers([...res.data]);
      setLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (!Init.current) {
      setLoading(true);
      loadUsers();
      return () => (Init.current = true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("following", JSON.stringify(following));
  }, [following]);

  const filteredTweets = () => {
    let filtered = {};
    switch (filter) {
      case "Follow":
        filtered = users.filter((u) => !isFollowing(u.id));
        break;
      case "Followings":
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
    user.followers = isFollowing(id) ? user.followers - 1 : user.followers + 1;
    setFollowing((u) =>
      isFollowing(id) ? u.filter((f) => f !== id) : [...u, id]
    );
    updateUser(user);
  };
  const handleFilter = f => {
    setFilter(f);
    setPage(1);
  }

  return (
    <div className="wrapper">
      <TweetsHeader onFilter={handleFilter} />
      {!isError ? (
        <>
          <ul className="userlist">
            {filteredTweets().length > 0 ? (
              filteredTweets().map(
                (u, index) =>
                  index < page * Step && (
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

          {!isEmpty() && (
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className={clsx("linkBtn", { loading: loading })}
            >
              Load more
            </button>
          )}
        </>
      ) : (
        <Alert severity="error">Server communication error</Alert>
      )}
    </div>
  );
};

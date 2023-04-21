import "./usercard.scss";
import Cover from "../../Images/card-cover.png";
import Coverx2 from "../../Images/card-cover@2x.png";
import { ReactComponent as Logo } from "../../Images/Logo.svg";
import { useState } from "react";
import clsx from "clsx";

export const UserCard = ({user, onFollow, isFollowing}) => {
  const [following, setFollowing] = useState(isFollowing);

    const handleFollow = () => {
        onFollow(user.id);
        setFollowing(f => !f)
    }

  return (
    <div className="card">
      <img
        srcSet={`${Cover} 1x, ${Coverx2} 2x`}
        src={Cover}
        alt="Card cover"
        className="card-cover"
      />
      <Logo className="card-logo" />
      <div className="card-devider">
        <div className="card-avatar">
          <img src={user.avatar} alt={user.user} />
        </div>
      </div>
      <div className="card-data">
        <p>{`${user.tweets} TWEETS`}</p>
        <p>{`${user.followers.toLocaleString("en-US")} FOLLOWERS`}</p>
      </div>

      <button
        type="button"
        className={clsx("card-button", { following: following })}
        onClick={handleFollow}
      >
        {following ? "FOLLOWING" : "FOLLOW"}
      </button>
    </div>
  );
};

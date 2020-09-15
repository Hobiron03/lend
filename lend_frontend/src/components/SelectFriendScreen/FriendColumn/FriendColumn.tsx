import React from "react";
import "./_FriendColumn.scss";

interface FriendColumnProps {
  iconImageURL: string | undefined;
  name: string;
}

const FriendColumn = (props: FriendColumnProps): JSX.Element => {
  return (
    <div className="friend_column">
      <img src={props.iconImageURL} alt="logo" width="35" height="35" />
      <p className="friend_column__name">{props.name}</p>
    </div>
  );
};

export default FriendColumn;

import React, { useCallback, useState } from "react";
import FriendColumn from "./FriendColumn/FriendColumn";
import "./_SelectFriendScreen.scss";
import friends from "./Friends.json";

const SelectFriendScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    e.target.value === "" ? setIsSearch(false) : setIsSearch(true);
  }, []);

  return (
    <div className="select_friend_screen">
      <div className="select_friend_screen__top">
        <p className="select_friend_screen__top__title">鬼滅の刃 一巻</p>
        <p>を貸す友達を選択してください</p>
        <div className="select_friend_screen__top__search">
          <input
            type="text"
            className="select_friend_screen__top__search__input"
            placeholder="友達検索"
            onChange={(e) => handleSearch(e)}
            value={searchText}
          />
        </div>
      </div>
      <div className="select_friend_screen__friend_list">
        {friends.friends.map((friend) => {
          if (isSearch) {
            return searchText === friend.name ? (
              <FriendColumn
                name={friend.name}
                iconImageURL={friend.iconImageURL}
              />
            ) : (
              <></>
            );
          } else {
            return (
              <FriendColumn
                name={friend.name}
                iconImageURL={friend.iconImageURL}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SelectFriendScreen;

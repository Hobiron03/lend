import React, { useCallback, useState } from "react";
import FriendColumn from "./FriendColumn/FriendColumn";
import "./_SelectFriendScreen.scss";
import friends from "./Friends.json";

interface SelectFriendScreenProps {
  lendBookName: string;
  //貸し出す本の情報が欲しい？
}

const SelectFriendScreen = (props: SelectFriendScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    e.target.value === "" ? setIsSearch(false) : setIsSearch(true);
  }, []);

  return (
    <div className="select_friend_screen">
      <div className="select_friend_screen__top">
        <p className="select_friend_screen__top__title">{props.lendBookName}</p>
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
                key={friend.id}
                name={friend.name}
                iconImageURL={friend.iconImageURL}
              />
            ) : (
              <></>
            );
          } else {
            return (
              <FriendColumn
                key={friend.id}
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

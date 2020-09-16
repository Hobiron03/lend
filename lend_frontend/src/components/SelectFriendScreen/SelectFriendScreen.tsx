import React, { useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import FriendColumn from "./FriendColumn/FriendColumn";
import BaseModal from "@material-ui/core/Modal";
import ModalContentConfirm from "../Modal/ModalContentConfirm/ModalContentConfirm";
import friends from "./Friends.json";
import Screen from "../Screen/Screen";
import "./_SelectFriendScreen.scss";
interface SelectFriendScreenProps extends RouteComponentProps<{ id: string }> {
  lendBookName: string;
  //貸し出す本の情報が欲しい？
}

const SelectFriendScreen = (props: SelectFriendScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(true);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    e.target.value === "" ? setIsSearch(false) : setIsSearch(true);
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const onConfirm = () => {
    //貸し出しのAPIを叩く
    console.log("貸し出しのAPIを叩く");
  };

  const onDeny = () => {
    //貸し出しを中止してモーダルを閉じる
    console.log("貸し出しを中止してモーダルを閉じる");
  };

  return (
    <Screen>
      <div className="select_friend_screen">
        <div className="select_friend_screen__top">
          <p className="select_friend_screen__top__title">
            {props.lendBookName}
          </p>
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
                <span onClick={handleModalOpen}>
                  <FriendColumn
                    key={friend.id}
                    name={friend.name}
                    iconImageURL={friend.iconImageURL}
                  />
                </span>
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
      <BaseModal
        open={isModalOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal_background">
          <ModalContentConfirm
            description="鬼滅の刃一巻を貸し出しても良いですか"
            onConfirm={onConfirm}
            onDeny={onDeny}
          />
        </div>
      </BaseModal>
    </Screen>
  );
};

export default SelectFriendScreen;

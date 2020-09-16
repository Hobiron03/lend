import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import FriendColumn from "./FriendColumn/FriendColumn";
import BaseModal from "@material-ui/core/Modal";
import ModalContentConfirm from "../Modal/ModalContentConfirm/ModalContentConfirm";
import friends from "./Friends.json";
import Screen from "../Screen/Screen";
import AppContext from "../../contexts/AppContexts";
import "./_SelectFriendScreen.scss";
import axios from "axios";
interface SelectFriendScreenProps extends RouteComponentProps<{ id: string }> {
  lendBookName: string;
}

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const SelectFriendScreen = (props: SelectFriendScreenProps) => {
  const { state } = useContext(AppContext);
  const [searchText, setSearchText] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [lendUsername, setLendUsername] = useState<string>("");

  const messagesDomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const y =
      messagesDomRef.current!.scrollHeight -
      messagesDomRef.current!.clientHeight;
    messagesDomRef.current!.scrollTo(0, y);
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    e.target.value === "" ? setIsSearch(false) : setIsSearch(true);
  }, []);

  const handleModalOpen = (friendName: string) => {
    setLendUsername(friendName);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onConfirm = async () => {
    console.log(state.user);
    //貸し出しのAPIを叩く
    await axios
      .post(ENTRY_POINT + "/lend", {
        //自分のユーザーIDを
        id: state.user.id,
        borrower_id: 1,
        book_id: props.match.params.id,
        deadline: "2020/09/22 12:26:48.084076",
      })
      .then((res) => {
        console.log(res);
      });
    console.log("貸し出しのAPIを叩くいてモーダルを閉じる");
  };

  const onDeny = () => {
    //貸し出しを中止してモーダルを閉じる
    console.log("貸し出しを中止してモーダルを閉じる");
    handleModalClose();
  };

  return (
    <Screen>
      <div className="select_friend_screen" ref={messagesDomRef}>
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
                <span onClick={() => handleModalOpen(friend.name)}>
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
                <span onClick={() => handleModalOpen(friend.name)}>
                  <FriendColumn
                    key={friend.id}
                    name={friend.name}
                    iconImageURL={friend.iconImageURL}
                  />
                </span>
              );
            }
          })}
        </div>
      </div>

      <BaseModal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal_background">
          <ModalContentConfirm
            description={`${props.lendBookName} を ${lendUsername} さんに貸し出しても良いですか?`}
            onConfirm={onConfirm}
            onDeny={onDeny}
          />
        </div>
      </BaseModal>
    </Screen>
  );
};

export default SelectFriendScreen;

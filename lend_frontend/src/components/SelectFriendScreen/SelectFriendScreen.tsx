import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import FriendColumn from "./FriendColumn/FriendColumn";
import BaseModal from "@material-ui/core/Modal";
import ModalContentConfirm from "../Modal/ModalContentConfirm/ModalContentConfirm";
import Screen from "../Screen/Screen";
import AppContext from "../../contexts/AppContexts";
import calculateDeadline from "../../CalculateDeadline";
import "./_SelectFriendScreen.scss";
import axios from "axios";
interface SelectFriendScreenProps extends RouteComponentProps<{ id: string }> {
  lendBookName: string;
}
interface FriendsState {
  id: number;
  icon_image: string;
  name: string;
}

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;

const SelectFriendScreen = (props: SelectFriendScreenProps) => {
  const history = useHistory();

  const { state } = useContext(AppContext);
  const [searchText, setSearchText] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [lendUsername, setLendUsername] = useState<string>("");
  const [lendUserId, setlendUserId] = useState<number>(0);

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

  const handleModalOpen = (friendName: string, friendId: number) => {
    setlendUserId(friendId);
    setLendUsername(friendName);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onConfirm = async () => {
    await axios
      .post(ENTRY_POINT + "/lend", {
        id: state.user.id,
        borrower_id: lendUserId.toString(),
        book_id: props.match.params.id,
        deadline: calculateDeadline(1),
      })
      .then((res) => {
        console.log("SelectFriendScreen res: ");
        console.log(res);
      });
    handleModalClose();
    history.push(`/mybook/`);
  };

  const onDeny = () => {
    handleModalClose();
  };

  return (
    <Screen>
      <div className="select_friend_screen" ref={messagesDomRef}>
        <div className="select_friend_screen__top">
          <p className="select_friend_screen__top__title"></p>
          <p>貸す友達を選択してください</p>
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
          {state.friends.map((friend: FriendsState, index: number) => {
            if (isSearch) {
              return searchText === friend.name ? (
                <span
                  onClick={() => handleModalOpen(friend.name, friend.id)}
                  key={index}
                >
                  <FriendColumn
                    name={friend.name}
                    iconImageURL={friend.icon_image}
                  />
                </span>
              ) : (
                <></>
              );
            } else {
              return (
                <span
                  onClick={() => handleModalOpen(friend.name, friend.id)}
                  key={index}
                >
                  <FriendColumn
                    name={friend.name}
                    iconImageURL={friend.icon_image}
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
            description={`${lendUsername} さんに貸し出しても良いですか？ 
            \n貸し出した本は返却されるまで読むことができません`}
            onConfirm={onConfirm}
            onDeny={onDeny}
          />
        </div>
      </BaseModal>
    </Screen>
  );
};

export default SelectFriendScreen;

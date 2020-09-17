import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./_BookCard.scss";
import "./Button/Button";
import Button from "./Button/Button";
import Book from "../../model/book";
import BaseModal from "@material-ui/core/Modal";
import ModalContentConfirm from "../Modal/ModalContentConfirm/ModalContentConfirm";
import AppContext from "../../contexts/AppContexts";
import axios from "axios";
import dateFormat from "../../utils/dateFormatter";
import BookImage from "../organizations/BookImage/BookImage";

/**
 * 本の状態によってボタンを出し分けるためのCardType
 * + read_lend: 読むボタンと貸すボタンを設置（今すぐ読める本）
 * + buy: 購入ボタンのみ設置
 * + read_lend_return: 読むボタン、買うボタン、返すボタンを設置
 * + lending_label: 貸し出しボタンを設置
 */
type CardType = "read_lend" | "buy" | "read_buy_return" | "lending_label";

const ENTRY_POINT = process.env.REACT_APP_API_ENTRYPOINT;
interface BookCardProps {
  book: Book;
  type?: CardType;
}

const BookCard = ({ book, type = "read_lend" }: BookCardProps): JSX.Element => {
  const history = useHistory();
  const { state } = useContext(AppContext);

  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleRead = () => {
    history.push(`/mybook/${book.id}/read`, { book });
  };

  const handleLend = () => {
    history.push(`/mybook/${book.id}/lend`);
  };

  // 購入の場合のみ、カードをクリックしてアクションを起こせる
  const handleBuy = () => {
    if (type === "buy") {
      history.push(`/store/${book.id}`, { book });
    }
  };

  const handlePurchase = () => {
    history.push(`/store/${book.id}`, { book });
  };

  const handleReturn = async () => {
    await axios
      .post(ENTRY_POINT + "/return_book", {
        id: state.user.id,
        book_id: book.id,
        message,
      })
      .then((res) => {
        console.log("HandleRerutn ");
        console.log(res);
      });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onConfirm = () => {
    handleReturn();
    handleModalClose();
  };

  const onDeny = () => {
    handleModalClose();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="BookCard" onClick={handleBuy}>
      <div className="BookCard__top">
        <div className="BookCard__top__left">
          <div className="BookCard__top__left__image">
            <BookImage src={book.image} isDiscount={book.status === "borrowing"}/>
          </div>
        </div>
        <div className="BookCard__top__right">
          <div className="BookCard__top__right__description">
            <p className="BookCard__top__right__description__title">
              {book.name}
            </p>
            <p>{book.info}</p>
          </div>
        </div>
      </div>
      {
        book.status === "borrowing" && (
          <div className="BookCard__middle">
            <small>{type === "buy" ? '割引期間' : '返却期限'}: {dateFormat(book.deadline).replace(' ', '')}まで</small>
          </div>
        )
      }

      {/* 購入以外は、フッターにボタンを表示する */}

      {type !== "buy" && (
        <div className="BookCard__under">
          {book.status === "having" ? (
            <>
              <Button content="読む" onClick={handleRead} />
              <Button content="貸す" onClick={handleLend} />
            </>
          ) : book.status === "borrowing" ? (
            <>
              <Button content="読む" onClick={handleRead} />
              <Button content="購入" onClick={handlePurchase} />
              <Button content="返却" onClick={handleModalOpen} />
            </>
          ) : (
            book.status === "lending" && (
              <div>
                <small>
                  貸し出し中: {dateFormat(book.deadline).replace(" ", "")}まで
                </small>
              </div>
            )
          )}
        </div>
      )}
      <BaseModal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal_background">
          <textarea
            className="message"
            cols={35}
            rows={4}
            placeholder="貸してくれた人にメッセージを送りましょう"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleMessageChange(e)
            }
          ></textarea>
          <ModalContentConfirm
            description={`このメッセージと共に ${book.name} を 返却します`}
            onConfirm={onConfirm}
            onDeny={onDeny}
          />
        </div>
      </BaseModal>
    </div>
  );
};

export default BookCard;

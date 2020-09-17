import React from "react";
import { useHistory } from "react-router-dom";
import "./_BookCard.scss";
import "./Button/Button";
import Button from "./Button/Button";
import Book from "../../model/book";

/**
 * 本の状態によってボタンを出し分けるためのCardType
 * + read_lend: 読むボタンと貸すボタンを設置（今すぐ読める本）
 * + buy: 購入ボタンのみ設置
 * + read_lend_return: 読むボタン、買うボタン、返すボタンを設置
 * + lending_label: 貸し出しボタンを設置
 */
type CardType = "read_lend" | "buy" | "read_buy_return" | "lending_label";

interface BookCardProps {
  book: Book;
  type?: CardType;
}

const BookCard = ({ book, type = "read_lend" }: BookCardProps): JSX.Element => {
  const history = useHistory();

  const handleRead = () => {
    history.push(`/mybook/${book.id}/read`, { book });
  };

  const handleLend = () => {
    history.push(`/mybook/${book.id}/lend`);
  };

  // 購入の場合のみ、カードをクリックしてアクションを起こせる
  const handleBuy = () => {
    if(type === "buy"){
      history.push(`/store/${book.id}`, { book });
    }
  };

  return (
    <div className="BookCard" onClick={handleBuy}>
      <div className="BookCard__top">
        <div className="BookCard__top__left">
          <div className="BookCard__top__left__image">
            <img src={book.image} alt="cover" />
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
      {/* 購入以外は、フッターにボタンを表示する */}
      {type !== "buy" && (
        <div className="BookCard__under">
          {type === "read_lend" ? (
            <>
              <Button content="読む" onClick={handleRead} />
              <Button content="貸す" onClick={handleLend} />
            </>
          ) : type === "read_buy_return" ? (
            <>
              <Button content="読む" onClick={handleRead} />
              <Button content="購入" onClick={() => console.log("購入")} />
              <Button content="貸す" onClick={handleLend} />
            </>
          ) : (
            type === "lending_label" && (
              // TODO: デザイン未確認
              <div>貸し出し中です</div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default BookCard;

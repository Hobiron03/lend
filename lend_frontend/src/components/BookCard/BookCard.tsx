import React from "react";
import { useHistory } from "react-router-dom";
import "./_BookCard.scss";
import "./Button/Button";
import Button from "./Button/Button";
import Book from '../../model/book';

interface BookCardProps {
  book: Book,
}

const BookCard = (props: BookCardProps): JSX.Element => {
  const history = useHistory();

  const handleRead = () => {
    history.push(`/mybook/${props.book.id}/read`);
  }

  return (
    <div className="BookCard">
      <div className="BookCard__top">
        <div className="BookCard__top__left">
          <div className="BookCard__top__left__image">
            {/* TODO: バックエンドで表紙画像が未実装なのでとりあえず1ページ目を表示します。（現時点9/15 16:10 ではurlがミスってるっぽくてそもそも画像が見れませんが。） */}
            <img src={props.book.image} alt="cover" />
          </div>
        </div>
        <div className="BookCard__top__right">
          <div className="BookCard__top__right__description">
            <p className="BookCard__top__right__description__title">
              {props.book.name}
            </p>
            {/* TODO: バックエンドでdescriptionが未実装なので書籍説明が未実装です */}
            <p>{props.book.name.repeat(4)}</p>
          </div>
        </div>
      </div>
      <div className="BookCard__under">
        <Button content="読む" onClick={handleRead} />
        <Button content="貸す" onClick={() => console.log("貸す")} />
      </div>
    </div>
  );
};

export default BookCard;

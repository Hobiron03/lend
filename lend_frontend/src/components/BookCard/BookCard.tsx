import React from "react";
import "./_BookCard.scss";
import "./Button/Button";
import Button from "./Button/Button";
import Cover from "../../DummyImages/1.jpg";

interface BookCardProps {
  title: string;
  description: string;
  // imageURL: string;
}

const BookCard = (props: BookCardProps): JSX.Element => {
  return (
    <div className="BookCard">
      <div className="BookCard__top">
        <div className="BookCard__top__left">
          <div className="BookCard__top__left__image">
            <img src={Cover} alt="cover" />
          </div>
        </div>
        <div className="BookCard__top__right">
          <div className="BookCard__top__right__description">
            <p className="BookCard__top__right__description__title">
              {props.title}
            </p>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
      <div className="BookCard__under">
        <Button content="読む" onClick={() => console.log("読む")} />
        <Button content="貸す" onClick={() => console.log("貸す")} />
      </div>
    </div>
  );
};

export default BookCard;

import React from "react";
import "./_DiscountButton.scss";

interface buttonProps {
  content: string;
  onClick: () => void;
}

const Button = (props: buttonProps): JSX.Element => {
  return (
    <div className="discount-button" onClick={props.onClick}>
      <p>{props.content}</p>
      <div className="discount-badge">
        <div className="discount-lanbel">割引価格で</div>
      </div>
    </div>
  );
};

export default Button;

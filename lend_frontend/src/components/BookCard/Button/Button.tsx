import React from "react";
import "./_Button.scss";

interface buttonProps {
  content: string;
  onClick: () => void;
}

const Button = (props: buttonProps): JSX.Element => {
  return (
    <div className="button" onClick={props.onClick}>
      <p>{props.content}</p>
    </div>
  );
};

export default Button;

import React from "react";

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

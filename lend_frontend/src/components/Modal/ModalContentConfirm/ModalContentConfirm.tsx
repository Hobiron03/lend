import React from "react";
import "./_ModalContentConfirm.scss";
import Button from "../../BookCard/Button/Button";

interface ModalContentConfirmProps {
  description: string;
  onConfirm: () => void;
  onDeny: () => void;
}

const ModalContentConfirm = (props: ModalContentConfirmProps) => {
  return (
    <div className="modal_content__confirm">
      <p className="modal_content__confirm__description">{props.description}</p>
      <div className="modal_content__confirm__button">
        <Button content="いいえ" onClick={props.onDeny} />
        <Button content="はい" onClick={props.onConfirm} />
      </div>
    </div>
  );
};

export default ModalContentConfirm;

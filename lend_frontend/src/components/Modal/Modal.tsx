import React, { ReactNode, useState } from "react";
import BaseModal from "@material-ui/core/Modal";
import "./_Modal.scss";

interface ModalProps {
  children: ReactNode;
}

const Modal = (props: ModalProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BaseModal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal_background">{props.children}</div>
      </BaseModal>
    </div>
  );
};

export default Modal;

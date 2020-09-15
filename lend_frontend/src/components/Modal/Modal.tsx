import React, { useState } from "react";
import BaseModal from "@material-ui/core/Modal";
import ModalContentConfirm from "./ModalContentConfirm/ModalContentConfirm";
import "./_Modal.scss";

const Modal = (): JSX.Element => {
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
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal_background">
          <ModalContentConfirm
            description="鬼滅の刃1巻をきりんさんに貸し出して良いですか？"
            onConfirm={() => console.log("onConfirm")}
            onDeny={() => console.log("onDeny")}
          />
        </div>
      </BaseModal>
    </div>
  );
};

export default Modal;

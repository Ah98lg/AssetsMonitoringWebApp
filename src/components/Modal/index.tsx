import { Modal } from "antd";
import React, { ReactNode, useState } from "react";

interface IModal {
  title: string;
  children: ReactNode;
  open: boolean;
  onOk: () => void;
  isConfirmLoading: boolean;
  toggleModal: () => void;
}

function AppModal({
  title,
  children,
  open,
  onOk,
  isConfirmLoading,
  toggleModal,
}: IModal) {
  return (
    <>
      <Modal
        title={`${title}`}
        open={open}
        onOk={onOk}
        confirmLoading={isConfirmLoading}
        onCancel={toggleModal}
      >
        {children}
      </Modal>
    </>
  );
}

export default AppModal;

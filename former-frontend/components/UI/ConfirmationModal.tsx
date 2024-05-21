import React from "react";
import SquareButton from "./SquareButton";
interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}
const ConfirmationModal = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-actions center">
            <SquareButton color="var(--color-danger)" onClick={onCancel}>
              Cancel
            </SquareButton>
            <SquareButton color="var(--color-secondary)" onClick={onConfirm}>
              Confirm
            </SquareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

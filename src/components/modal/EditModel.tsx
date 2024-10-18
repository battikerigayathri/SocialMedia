import React from "react";
// import Modal from "react-modal";

interface ConfirmationEditModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}


// const EditConfirmationModal = ({
//   isOpen,
//   onConfirm,
//   onCancel,
//   onClose,
// }: any) => (
  // <Modal isOpen={isOpen} onRequestClose={onCancel}>

  const   EditModal: React.FC<ConfirmationEditModalProps> = ({ isOpen, onConfirm, onCancel, onClose }) => {
    if (!isOpen) return null;

    return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to switch to edit mode?
        </h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-900"
          >
            Confirm{" "}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            X
          </button>
      </div>
    </div>
  
);
  };

export default EditModal;

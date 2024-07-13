import React, { useState } from "react";
import AccelerateHiring from "./AccelerateYourHiring";
import AggregatorSelector from "./AggregatorSelector";
import Modal from "../Modal";

const Dasbhoard = () => {

  const [isModalOpen, setModalOpen] = useState(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className="px-8">
      <AccelerateHiring />
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <AggregatorSelector />
      </Modal>
    </div>
  );
};

export default Dasbhoard;

import React, { useState } from "react";
import AccelerateHiring from "./AccelerateYourHiring";
import AggregatorSelector from "./AggregatorSelector";
import Modal from "../Modal";
import JobTableContainer from "./Components/JobTableContainer";
import JobList from "./Components/JobList";
import UserSearchAnalytics from "./Components/UserSearchAnalytics";

const Dasbhoard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className="px-8">
      {!isModalOpen && (
        <>
          <AccelerateHiring />

          <JobTableContainer />
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <AggregatorSelector onClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default Dasbhoard;

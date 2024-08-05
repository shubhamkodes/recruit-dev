import React, { useState } from "react";
import AccelerateHiring from "./AccelerateYourHiring";
import AggregatorSelector from "./AggregatorSelector";
import Modal from "../Modal";
import JobResults from "./JobResults/JobResults";
import JobPeakViewSection from "./Components/JobPeakViewSection";
import { fakeJobData } from "./Components/FakeJobGenerator";
import JobTableContainer from "./Components/JobTableContainer";

const Dasbhoard = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className="px-8">
      <AccelerateHiring /> 
      <JobTableContainer />
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <AggregatorSelector />
      </Modal>
    </div>
  );
};

export default Dasbhoard;

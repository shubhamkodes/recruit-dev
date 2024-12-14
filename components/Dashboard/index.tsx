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
          <div className="dashboard flex flex-col md:flex-row gap-8 p-8">
            <div className="w-full">
              <JobList />
            </div>
            {/* <div className="md:w-1/2 w-full">
              <UserSearchAnalytics />
            </div> */}
          </div>
         <JobTableContainer />
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <AggregatorSelector onClose={handleModalClose}/>
      </Modal>
    </div>
  );
};

export default Dasbhoard;

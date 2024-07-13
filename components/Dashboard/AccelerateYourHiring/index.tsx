"use client";
import React, { useState } from "react";
import Image from "next/image";
import JobDescriptionForm from "../JobDescription/JobDescriptionForm";
import Modal from "@components/Modal";

const AccelerateHiring: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className="px-8">
      <div className="w-full mx-auto p-0 border border-primary rounded-lg shadow-lg flex items-center space-x-6">
        <div className="flex-grow p-6">
          <h2 className="text-4xl font-bold mb-2">
            Accelerate Your <span className="text-primary">Hiring</span>
          </h2>
          <p className="text-xl py-4">
            Close Candidate <span className="text-primary">Requirements</span>{" "}
            in{" "}
            <span className="text-primary">
              <br />
              10 Minutes
            </span>{" "}
            for diverse Job Profiles
          </p>
          <button
            onClick={handleModalOpen}
            className="px-6 py-3 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90"
          >
            Search result
          </button>
        </div>
        <div className="relative w-64 h-64">
          <Image
            src="/dashboard/person-with-laptop.png"
            alt="Person with laptop"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <JobDescriptionForm />
      </Modal>
    </div>
  );
};

export default AccelerateHiring;

"use client";

import CandidateViewModel from "@app/api/viewmodel/CandidateViewModel";
import JobResults from "@components/Dashboard/JobResults/JobResults";
import { useRouter } from "next/router"; // Import useRouter to get query params
import { useState, useEffect } from "react";

const page = () => {


  return (
    <div>
      <JobResults />
    </div>
  );
};

export default page;

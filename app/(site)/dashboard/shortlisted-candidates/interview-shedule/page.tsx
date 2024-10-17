"use client";
import React from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

const Page: React.FC = () => {
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => {
      console.log("onEventScheduled");
      console.log(e.data.payload);
    },
  });

  return (
    <div className="relative inset-0 p-5 py-20 px-16 font-sans box-border overflow-auto bg-white">
      <div className="text-center">
        <h1 className="mb-1 text-xl font-bold">
          Add your panel for interview schedule
        </h1>
        <p className="mb-5 text-base">
          Select and organize your interview panel (Name) and time effortlessly.
        </p>
      </div>
      <InlineWidget
        url="https://calendly.com/tech-assetsavvy/interview-schedule"
        prefill={{
          name: "Abhishek",
          email: "shubtomar33@gmail.com",
        }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "FF9D00",
          textColor: "4d5055",
        }}
      />
    </div>
  );
};

export default Page;

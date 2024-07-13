import React from "react";
import DashboardHeader from "/components/Dashboard/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex flex-col flex-1 py-20 ">{children}</div>
    </div>
  );
};

export default layout;
"use client";
import React, { useEffect, useState } from "react";
import { PanelDetail } from "@app/api/model/PanelRequest";

interface PanelsListProps {
  panels: PanelDetail[];
  onSelect: (panel: PanelDetail) => void; // Callback to handle selection
}

const PanelsList: React.FC<PanelsListProps> = ({ panels, onSelect }) => {
  return (
    <div className="max-h-[60vh] overflow-y-auto space-y-4 p-4">
      {panels && panels.length > 0 ? (
        panels.map((panel) => (
          <div
            key={panel.id}
            onClick={() => onSelect(panel)}
            className="pb-4 border-b border-gray-200 flex items-start gap-3 p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <div>
              <h3 className="font-semibold text-sm text-gray-800">
                {panel.name}
              </h3>
              <p className="text-xs text-gray-600 mt-2">{panel.role}</p>
              <ul className="list-inside">
                {panel.members.map((member, memberIndex) => (
                  <li key={memberIndex} className="text-xs text-gray-800">
                    {member}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm">
          You haven't added any panel yet. Please add a panelist now.
        </div>
      )}
    </div>
  );
};

export default PanelsList;

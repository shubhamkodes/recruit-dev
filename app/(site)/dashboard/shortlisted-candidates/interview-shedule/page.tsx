"use client";
import React, { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "tailwindcss/tailwind.css";
import { InlineWidget } from "react-calendly";
import { PanelResponse, PanelsResponse } from "@app/api/model/PanelRequest";
import PanelViewModel from "@app/api/viewmodel/PannelViewModel";
import PannelViewModel from "@app/api/viewmodel/PannelViewModel";

interface TimePickerProps {
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  setSelectedTime,
}) => {
  const times = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {times.map((time) => (
        <button
          key={time}
          className={`p-4 w-28 h-28 ${
            selectedTime === time
              ? "bg-orange-200 text-orange-600 border border-orange-600"
              : "bg-white border border-gray-300"
          } rounded-xl shadow-lg transition-all duration-200`}
          onClick={() => setSelectedTime(time)}
        >
          <div className="text-center text-lg">{time}</div>
        </button>
      ))}
    </div>
  );
};

interface DatePickerComponentProps {
  onClose: () => void;
  selectedDate: string | null;
  setSelectedDate: (date: string) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onClose,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toDateString().slice(0, 10));
    }
    return dates;
  };

  const dates = generateDates();

  return (
    <div className="absolute top-20 left-0 p-6 bg-white shadow-xl rounded-lg z-10 w-[500px]">
      <h2 className="text-xl font-semibold mb-4">Select Date</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {dates.map((date) => (
          <button
            key={date}
            className={`p-4 w-28 h-28 ${
              selectedDate === date
                ? "bg-orange-200 text-orange-600 border border-orange-600"
                : "bg-white border border-gray-300"
            } rounded-xl shadow-md transition-all duration-200`}
            onClick={() => setSelectedDate(date)}
          >
            <div className="text-center">
              <div className={`text-base font-medium`}>
                {date.split(" ")[0]}
              </div>
              <div className="text-2xl font-bold">{date.split(" ")[2]}</div>
            </div>
          </button>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">Select Time</h2>
      <TimePicker
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <button
        onClick={onClose}
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold transition hover:bg-orange-600"
      >
        Close
      </button>
    </div>
  );
};

const AddPanelistModal: React.FC<{
  onClose: () => void;
  onSave: (name: string, email: string, jobRole: string) => void;
}> = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobRole, setJobRole] = useState("");

  const handleSave = () => {
    onSave(name, email, jobRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="p-8 bg-white rounded-lg shadow-lg w-[600px]">
        <h2 className="text-2xl font-semibold mb-6">Add Panelist</h2>
        <p className="mb-4 text-gray-600">
          Fill in the details of the panelist you want to add to this interview
          panel.
        </p>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Job Role</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter job role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-3 px-5 py-3 bg-gray-200 text-gray-700 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-md font-semibold transition hover:bg-orange-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const OldPage: React.FC = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [panelName, setPanelName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [members, setMembers] = useState<string[]>([]);
  const [panels, setPanels] = useState<PanelsResponse>();

  const fetchPanels = async () => {
    try {
      const panels = await PannelViewModel.getPanels();
      setPanels(panels);
    } catch (error) {
      console.error("Failed to fetch job candidates:", error);
    }
  };

  useEffect(() => {
    fetchPanels();
  }, []);

  const addPanelist = (name: string, email: string, jobRole: string) => {
    const member = `${name} (${jobRole}, ${email})`;
    setMembers([...members, member]);
  };

  const savePanel = async () => {
    if (!panelName || !role || members.length === 0) {
      alert("Please fill in all details before saving the panel.");
      return;
    }

    const panelRequest = {
      name: panelName,
      members,
      role,
    };

    try {
      await PanelViewModel.createNewPanel(panelRequest);
      fetchPanels();
      alert("Panel created successfully!");
    } catch (error) {
      console.error("Error creating panel:", error);
      alert("Failed to create panel. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 p-5 py-20 px-16 font-sans box-border overflow-hidden bg-white">
      <div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Add Your Panel for Interview Schedule
        </h1>
        <p className="mb-6 text-base text-gray-600">
          Select and organize your interview panel members and schedule the
          interview effortlessly.
        </p>

        <div className="flex  mb-6 gap-5">
          <div>
            <div className="flex-grow flex   p-5 border border-gray-300 rounded-xl bg-white shadow-md">
              <input
                type="text"
                placeholder="Panel Name"
                className="p-2 text-lg font-bold border-none focus:outline-none"
                value={panelName || ""}
                onChange={(e) => setPanelName(e.target.value)}
              />
            </div>

            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-4">Panels</h2>
              <ul>
                {panels?.data.map((panel) => (
                  <li key={panel.id} className="mb-4">
                    <h3 className="font-bold text-lg">{panel.name}</h3>
                    <p className="text-sm text-gray-600">Role: {panel.role}</p>
                    <ul className="ml-4 mt-2">
                      {panel.members.map((member, index) => (
                        <li key={index} className="text-sm text-gray-800">
                          {member}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative flex-grow flex items-center p-5 border border-gray-300 rounded-xl justify-between bg-white shadow-md">
            <span className="text-lg font-semibold">Time</span>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            >
              <FiChevronUp size={20} />
              <FiChevronDown size={20} />
            </div>
            {isDatePickerOpen && (
              <DatePickerComponent
                onClose={() => setIsDatePickerOpen(false)}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />
            )}
          </div>
        </div>

        <br></br>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-lg text-orange-600 border border-orange-600 rounded-full bg-orange-100 hover:bg-orange-200 transition"
        >
          + Add More Panelist
        </button>
      </div>
      {isModalOpen && (
        <AddPanelistModal
          onClose={() => setIsModalOpen(false)}
          onSave={addPanelist}
        />
      )}
      <button
        onClick={savePanel}
        className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold transition hover:bg-orange-600"
      >
        Schedule
      </button>

      {/* {selectedDate && selectedTime && panelName && (
        <InlineWidget
          url=""
          prefill={{
            name: panelName,
            email: "shubtomar33@gmail.com",
            customAnswers: {
              a1: `${selectedDate} ${selectedTime}`,
            },
          }}
          pageSettings={{
            backgroundColor: "ffffff",
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: "00a2ff",
            textColor: "4d5055",
          }}
        />
      )} */}
    </div>
  );
};

export default OldPage;

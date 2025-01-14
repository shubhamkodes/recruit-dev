"use client";
import React, { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "tailwindcss/tailwind.css";
import { InlineWidget } from "react-calendly";
import {
  PanelDetail,
  PanelResponse,
  PanelsResponse,
} from "@app/api/model/PanelRequest";
import PanelViewModel from "@app/api/viewmodel/PannelViewModel";
import PannelViewModel from "@app/api/viewmodel/PannelViewModel";
import PanelsList from "@components/Dashboard/Components/PanelsDropdownList";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "@node_modules/next/navigation";
import ScheduleSelector from "react-schedule-selector";

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
      <ToastContainer position="top-right" autoClose={3000} />

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

const OldPage: React.FC = () => {
  const [isAddPanelVisible, setIsAddPanelVisible] = useState(false);
  const [isPanelsDialogOpen, setIsPanelsDialogOpen] = useState(false);
  const router = useRouter();
  const [selectedPanel, setSelectedPanel] = useState<PanelDetail | null>(null);
  const [panels, setPanels] = useState<PanelsResponse>();
  const [availableSlots, setAvailableSlots] = useState<string[]>([
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
  ]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

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

  const handleScheduleClick = () => {
    toast.success(
      "Interview mail sent successfully to candidates and panels.",
      {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      }
    );
    setTimeout(() => {
      router.back();
    }, 2000);
  };

  const handlePanelSelect = (panel: PanelDetail) => {
    setSelectedPanel(panel);
    setIsPanelsDialogOpen(false);
  };

  return (
    <div className="fixed inset-0 p-5 py-20 px-16 font-sans box-border overflow-hidden bg-white">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />

      <div>
        <div className="flex justify-between">
          <h1 className="mb-4 text-xl font-bold text-gray-800">
            Add Your Panel for Interview Schedule
          </h1>
          <button
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold transition hover:bg-orange-600"
            onClick={handleScheduleClick}
          >
            Schedule
          </button>
        </div>
        <p className="mb-6 text-sm text-gray-600">
          Select and organize your interview panel members and schedule the
          interview effortlessly.
        </p>

        <div className="flex gap-5 items-center mb-6">
          {/* Select Panel Field */}
          <div className="relative w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Panel
            </label>
            <div
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
              onClick={() => setIsPanelsDialogOpen(true)}
            >
              {selectedPanel?.name || "-- Select a Panel --"}
            </div>
          </div>

          {/* Select Available Slots Field */}
          <div className="relative w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Available Slots
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              <option value="" disabled>
                -- Select a Slot --
              </option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PanelsList Dialog */}
      {isPanelsDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 ">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 px-4 pt-4">
              Select a Panel
            </h2>
            <PanelsList
              panels={panels?.data || []}
              onSelect={handlePanelSelect}
            />
            <div className="flex justify-between px-4 pb-4">
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-full  hover:bg-primary-600"
                onClick={() => {
                  setIsPanelsDialogOpen(false);
                  setIsAddPanelVisible(true);
                }}
              >
                Add More Panelist
              </button>

              <button
                className="mt-4 px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
                onClick={() => setIsPanelsDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ScheduleDateSelector />
      {isAddPanelVisible && (
        <AddPanelistModal
          onClose={() => setIsAddPanelVisible(false)}
          onSaved={() => {
            fetchPanels();
            toast.success("Saved Successfully!", {
              position: "bottom-center",
              autoClose: 2000,
              transition: Slide,
            });
            setIsPanelsDialogOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default OldPage;

const AddPanelistModal: React.FC<{
  onClose: () => void;
  onSaved: () => void;
}> = ({ onClose, onSaved }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !jobRole || email.length === 0) {
      alert("Please fill in all details before saving the panel.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const panelRequest = {
        name: name,
        members: [email],
        role: jobRole,
      };

      await PanelViewModel.createNewPanel(panelRequest);
      onSaved();
      onClose();
    } catch (error) {
      console.error("Error creating panel:", error);
      alert("Failed to create panel. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="p-8 bg-white rounded-lg shadow-lg w-[600px]">
        <h2 className="text-xl font-semibold mb-2">Add Panelist</h2>
        <p className="mb-6 text-sm text-gray-600">
          Fill in the details of the panelist you want to add to this interview
          panel.
        </p>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full p-3 text-sm border border-gray-300 rounded-md"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 text-sm border border-gray-300 rounded-md"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Job Role</label>
          <input
            type="text"
            className="w-full text-sm p-3 border border-gray-300 rounded-md"
            placeholder="Enter job role"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-3 text-sm px-5 py-3 bg-gray-200 text-gray-700 rounded-md"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-6 text-sm py-3 text-white rounded-md font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-orange-600"
            }`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ScheduleDateSelector: React.FC = () => {
  const [schedule, setSchedule] = useState<Array<Date>>([]);

  const handleChange = (newSchedule: Array<Date>) => {
    setSchedule(newSchedule);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Time slots of panel</h1>
      <p className="mb-6 text-gray-600">Select your preferred time slots:</p>
      <ScheduleSelector
        selection={schedule}
        numDays={15}
        minTime={2}
        maxTime={24}
        hourlyChunks={1}
        onChange={handleChange}
        rowGap="10px"
        columnGap="10px"
        timeFormat="24"
      />
    </div>
  );
};

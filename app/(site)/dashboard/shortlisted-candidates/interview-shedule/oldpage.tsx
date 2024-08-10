"use client";
import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import "tailwindcss/tailwind.css";
import { InlineWidget } from "react-calendly";

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
          className={`p-4 w-24 h-24 ${
            selectedTime === time ? "bg-orange-100 text-orange-500" : "bg-white"
          } rounded-xl shadow-md`}
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
    <div className="absolute top-20 left-0 p-5 bg-white shadow-lg rounded-lg z-10">
      <h2 className="text-lg font-semibold mb-4">Select Date</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {dates.map((date) => (
          <button
            key={date}
            className={`p-4 w-24 h-24 ${
              selectedDate === date
                ? "bg-orange-100 text-orange-500"
                : "bg-white"
            } rounded-xl shadow-xl`}
            onClick={() => setSelectedDate(date)}
          >
            <div className="text-center">
              <div
                className={`text-base ${
                  selectedDate === date ? "font-semibold" : ""
                }`}
              >
                {date.split(" ")[0]}
              </div>
              <div className="text-2xl">{date.split(" ")[2]}</div>
            </div>
          </button>
        ))}
      </div>
      <h2 className="text-lg font-semibold mb-4">Select Time</h2>
      <TimePicker
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <button
        onClick={onClose}
        className="mt-4 p-2 bg-orange-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  );
};

const OldPage: React.FC = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [panelName, setPanelName] = useState<string | null>(null);

  const handleScheduleClick = () => {
    if (!selectedDate || !selectedTime || !panelName) {
      alert("Please select a date, time, and enter a panel name.");
      return;
    }
    console.log("Scheduling for:", {
      date: selectedDate,
      time: selectedTime,
      name: panelName,
    });
  };

  return (
    <div className="fixed inset-0 p-5 py-20 px-16 font-sans box-border overflow-hidden bg-white">
      <div>
        <h1 className="mb-1 text-xl mt-10 font-bold">
          Add your panel for interview schedule
        </h1>
        <p className="mb-5 text-base">
          Select and organize your interview panel (Name) and time effortlessly.
        </p>
        <div className="flex items-center mb-5 gap-5">
          <div className="flex-grow flex items-center p-5 border border-gray-300 rounded-xl bg-white">
            <input
              type="text"
              placeholder="+ Panel - 1"
              className="p-2 text-lg font-bold bg-none border-none cursor-pointer"
              value={panelName || ""}
              onChange={(e) => setPanelName(e.target.value)}
            />
          </div>
          <div className="relative flex-grow flex items-center p-5 border border-gray-300 rounded-xl justify-between bg-white">
            <span className="text-lg p-2 font-semibold">Time</span>
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
        <button
          onClick={handleScheduleClick}
          className="p-2.5 text-lg text-orange-500 border rounded-full mt-5 bg-orange-100 border-orange-500 cursor-pointer"
        >
          + Add more panelist
        </button>
      </div>
      <div className="absolute right-1 bottom-1">
        <img
          src="/dashboard/shedule.svg"
          alt="Calendar illustration"
          className="w-auto h-auto"
        />
      </div>
      {selectedDate && selectedTime && panelName && (
        <InlineWidget
          url="https://calendly.com/tech-assetsavvy/interview-schedule"
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
      )}
    </div>
  );
};

export default OldPage;

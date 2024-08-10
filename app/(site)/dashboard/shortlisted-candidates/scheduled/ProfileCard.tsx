import React from "react";
import StatusBadge from "./StatusBadge";

type Project = {
  title: string;
  description: string;
};

export type ProfileCardProps = {
  name: string;
  experience: string;
  education: string;
  projects: Project[];
  status: "scheduled" | "in progress" | "shortlisted";
  meetingLink?: string;
  time: string;
};

const statusClasses = {
  scheduled: "bg-yellow-200 text-yellow-800",
  "in progress": "bg-orange-200 text-orange-800",
  shortlisted: "bg-green-200 text-green-800",
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  experience,
  education,
  projects,
  status,
  meetingLink,
  time,
}) => {
  return (
    <div className="border rounded-md shadow-sm mb-4">
      <div className="">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">{name}</h2>
            <span
              className={`px-2 py-1 rounded-full text-sm ${statusClasses[status]}`}
            >
              {status.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())}
            </span>
          </div>
          <p className="text-sm text-gray-500">{experience}</p>
          <p className="mt-2">
            <strong>Education:</strong> {education}
          </p>
          <div className="mt-2">
            <strong>Projects:</strong>
            <ul className="list-disc list-inside ml-4">
              {projects.map((project, index) => (
                <li key={index}>
                  <strong>{project.title}:</strong> {project.description}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2 flex justify-between">
            <strong>Time:</strong> <span className="text-right">{time}</span>
          </p>
        </div>

        {meetingLink && (
          <div className="mt-2 bg-yellow-50 p-4 rounded-md ">
            <a href={meetingLink} className="text-blue-600 underline">
              {meetingLink}
            </a>
            <span className="pl-4"/>
            <button className="  border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
              Copy meeting link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;

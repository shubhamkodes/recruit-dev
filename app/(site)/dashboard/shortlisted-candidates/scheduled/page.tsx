import React from "react";
import ProfileCard, { ProfileCardProps } from "./ProfileCard";

const page = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center pb-8">
        <div>
          <div className="font-bold">Job ID: 123</div>
          <div className="text">Python Developer Profile</div>
        </div>
      </div>

      {sampleData.map((data, index) => (
        <ProfileCard key={index} {...data} />
      ))}
    </div>
  );
};

export default page;

const sampleData: ProfileCardProps[] = [
  {
    name: "John Doe",
    experience: "5 years - Paytm, Amazon, Phone Pe",
    education: "Bachelor of Technology in Computer Science",
    projects: [
      {
        title: "E-commerce Platform",
        description:
          "Developed a full-fledged e-commerce platform with Django, integrated payment gateways, and optimized for performance.",
      },
      {
        title: "Machine Learning Model",
        description:
          "Built a recommendation system using collaborative filtering and deployed it on AWS.",
      },
    ],
    status: "scheduled",
    meetingLink: "https://meet.google.com/djm-kamm-ioc?authuser=0",
    time: "Wed - 13 July, 10 AM - 12 PM",
  },
  {
    name: "Jane Smith",
    experience: "3 years - Google, Facebook",
    education: "Master of Computer Science",
    projects: [
      {
        title: "Search Engine Optimization",
        description:
          "Implemented SEO strategies that increased organic search traffic by 50%.",
      },
      {
        title: "Social Media Analytics",
        description:
          "Developed tools to analyze and visualize social media data.",
      },
    ],
    status: "in progress",
    meetingLink: "https://meet.google.com/abc-defg-hij?authuser=0",
    time: "Thu - 14 July, 1 PM - 3 PM",
  },
  {
    name: "Alice Johnson",
    experience: "7 years - Microsoft, IBM",
    education: "Bachelor of Software Engineering",
    projects: [
      {
        title: "Cloud Infrastructure",
        description:
          "Designed and implemented scalable cloud infrastructure solutions.",
      },
      {
        title: "AI Chatbot",
        description: "Built an AI-powered chatbot for customer support.",
      },
    ],
    status: "shortlisted",
    meetingLink: "https://meet.google.com/xyz-uvw-ghk?authuser=0",
    time: "Fri - 15 July, 9 AM - 11 AM",
  },
  {
    name: "Bob Brown",
    experience: "6 years - Uber, Lyft",
    education: "Bachelor of Information Technology",
    projects: [
      {
        title: "Ride-sharing Algorithm",
        description:
          "Developed a real-time ride-sharing algorithm to optimize routes.",
      },
      {
        title: "Driver Analytics",
        description: "Created a driver performance analytics dashboard.",
      },
    ],
    status: "scheduled",
    meetingLink: "https://meet.google.com/mno-pqr-stu?authuser=0",
    time: "Mon - 18 July, 2 PM - 4 PM",
  },
  {
    name: "Charlie Davis",
    experience: "4 years - Netflix, Hulu",
    education: "Master of Data Science",
    projects: [
      {
        title: "Content Recommendation System",
        description:
          "Built a machine learning model to recommend personalized content.",
      },
      {
        title: "User Behavior Analysis",
        description:
          "Analyzed user behavior data to improve content engagement.",
      },
    ],
    status: "in progress",
    meetingLink: "https://meet.google.com/ghi-jkl-mno?authuser=0",
    time: "Tue - 19 July, 11 AM - 1 PM",
  },
  {
    name: "Dana Edwards",
    experience: "5 years - Spotify, Pandora",
    education: "Bachelor of Computer Science",
    projects: [
      {
        title: "Music Recommendation Engine",
        description:
          "Developed a music recommendation engine using collaborative filtering.",
      },
      {
        title: "Audio Analysis Tools",
        description: "Created tools to analyze and categorize audio content.",
      },
    ],
    status: "shortlisted",
    meetingLink: "https://meet.google.com/efg-hij-klm?authuser=0",
    time: "Wed - 20 July, 3 PM - 5 PM",
  },
  {
    name: "Eve Foster",
    experience: "2 years - Airbnb, Booking.com",
    education: "Bachelor of Technology in Computer Science",
    projects: [
      {
        title: "Property Listing Platform",
        description: "Built a platform to list and manage rental properties.",
      },
      {
        title: "Booking System",
        description:
          "Developed a booking system with integrated payment gateways.",
      },
    ],
    status: "scheduled",
    meetingLink: "https://meet.google.com/lmn-opq-rst?authuser=0",
    time: "Thu - 21 July, 10 AM - 12 PM",
  },
  {
    name: "Frank Green",
    experience: "6 years - Intel, AMD",
    education: "Master of Electrical Engineering",
    projects: [
      {
        title: "Chip Design",
        description:
          "Led the design and development of high-performance microchips.",
      },
      {
        title: "Embedded Systems",
        description: "Worked on embedded systems for various applications.",
      },
    ],
    status: "in progress",
    meetingLink: "https://meet.google.com/uvw-xyz-abc?authuser=0",
    time: "Fri - 22 July, 1 PM - 3 PM",
  },
  {
    name: "Grace Hill",
    experience: "8 years - Oracle, SAP",
    education: "Bachelor of Business Administration",
    projects: [
      {
        title: "ERP System Implementation",
        description: "Implemented ERP systems for various enterprises.",
      },
      {
        title: "Database Optimization",
        description:
          "Optimized database performance for large-scale applications.",
      },
    ],
    status: "shortlisted",
    meetingLink: "https://meet.google.com/ijk-lmn-opq?authuser=0",
    time: "Mon - 25 July, 9 AM - 11 AM",
  },
  {
    name: "Hank Ivers",
    experience: "3 years - Tesla, SpaceX",
    education: "Bachelor of Mechanical Engineering",
    projects: [
      {
        title: "Autonomous Driving",
        description: "Developed software for autonomous driving vehicles.",
      },
      {
        title: "Spacecraft Navigation",
        description: "Worked on navigation systems for spacecraft.",
      },
    ],
    status: "scheduled",
    meetingLink: "https://meet.google.com/abc-def-ghi?authuser=0",
    time: "Tue - 26 July, 2 PM - 4 PM",
  },
];

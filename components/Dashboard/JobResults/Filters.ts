import { AcademicCapIcon, BriefcaseIcon, BuildingOffice2Icon, CurrencyRupeeIcon, MapPinIcon } from "@heroicons/react/16/solid";
import {
    BorderAllIcon,
    CheckCircledIcon,
    CrossCircledIcon,
    StopwatchIcon,
    GlobeIcon,
  } from "@radix-ui/react-icons"

 
  
class Filter {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  
    constructor(value: string, label: string, icon: React.ComponentType<{ className?: string }>) {
      this.value = value;
      this.label = label;
      this.icon = icon;
    }
  }


  // Define the pay filters using a scale in INR
  export const payFilters = [
    new Filter("0-500000", "₹0 - ₹5,00,000", CurrencyRupeeIcon),
    new Filter("500000-1000000", "₹5,00,000 - ₹10,00,000", CurrencyRupeeIcon),
    new Filter("1000000-1500000", "₹10,00,000 - ₹15,00,000", CurrencyRupeeIcon),
    new Filter("1500000-2000000", "₹15,00,000 - ₹20,00,000", CurrencyRupeeIcon),
    new Filter("2000000+", "₹20,00,000+", CurrencyRupeeIcon),
  ];
  
  // Define the job type filters
  export const jobTypeFilters = [
    new Filter("full-time", "Full Time", BriefcaseIcon),
    new Filter("part-time", "Part Time", BriefcaseIcon),
    new Filter("contract", "Contract", BriefcaseIcon),
    new Filter("internship", "Internship", BriefcaseIcon),
  ];
  
  // Define the education level filters
  export const educationLevelFilters = [
    new Filter("high-school", "High School", AcademicCapIcon),
    new Filter("bachelor", "Bachelor's Degree", AcademicCapIcon),
    new Filter("master", "Master's Degree", AcademicCapIcon),
    new Filter("phd", "PhD", AcademicCapIcon),
  ];
  
  // Define the location filters with popular cities in India
  export const locationFilters = [
    new Filter("mumbai", "Mumbai", MapPinIcon),
    new Filter("delhi", "Delhi", MapPinIcon),
    new Filter("bangalore", "Bangalore", MapPinIcon),
    new Filter("hyderabad", "Hyderabad", MapPinIcon),
    new Filter("chennai", "Chennai", MapPinIcon),
    new Filter("kolkata", "Kolkata", MapPinIcon),
    new Filter("pune", "Pune", MapPinIcon),
    new Filter("ahmedabad", "Ahmedabad", MapPinIcon),
    new Filter("jaipur", "Jaipur", MapPinIcon),
    new Filter("lucknow", "Lucknow", MapPinIcon),
  ];
  
  // Define the location type filters
  export const locationTypeFilters = [
    new Filter("remote", "Remote", GlobeIcon),
    new Filter("hybrid", "Hybrid", MapPinIcon),
    new Filter("onsite", "OnSite", BuildingOffice2Icon),
  ];

  export const candidateSelectionState = [
    new Filter("shortlisted", "Shortlisted", CheckCircledIcon ),
    new Filter("rejected", "Rejected", CrossCircledIcon),
    new Filter("all", "All", BorderAllIcon),
  ];
  
  export const statuses = [
    new Filter("in progress", "In Progress", StopwatchIcon),
    new Filter("done", "Done", CheckCircledIcon),
    new Filter("canceled", "Canceled", CrossCircledIcon),
  ];


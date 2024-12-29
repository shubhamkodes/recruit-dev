export enum NoticePeriodStatus {
  ImmediateJoiner = 1,
  OneMonth = 2,
  TwoMonths = 3,
  ThreeMonths = 4,
}

// Mapping object for display values
export const NoticePeriodStatusDisplay = {
  [NoticePeriodStatus.ImmediateJoiner]: "Immediate Joiner (0-15 days)",
  [NoticePeriodStatus.OneMonth]: "1 Month",
  [NoticePeriodStatus.TwoMonths]: "2 Months",
  [NoticePeriodStatus.ThreeMonths]: "3 Months",
};

// Function to get display value by enum value
export const getNoticePeriodDisplayValue = (
  status: NoticePeriodStatus
): string => {
  return NoticePeriodStatusDisplay[status] || "Unknown";
};

import React from 'react';

type StatusBadgeProps = {
  status: 'scheduled' | 'in progress' | 'shortlisted';
};

const statusClasses = {
  scheduled: 'bg-yellow-200 text-yellow-800',
  'in progress': 'bg-orange-200 text-orange-800',
  shortlisted: 'bg-green-200 text-green-800',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-sm ${statusClasses[status]}`}>
      {status.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())}
    </span>
  );
};

export default StatusBadge;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const UserSearchAnalytics: React.FC = () => {
  const data = {
    labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
    datasets: [
      {
        label: 'New user',
        data: [7, 10, 8, 9, 10, 9],
        backgroundColor: '#FF9D00',
        barThickness: 30, 
      },
      {
        label: 'Repeat',
        data: [19, 18, 20, 19, 21, 20],
        backgroundColor: '#24346D',
        barThickness: 30,  
      },
      {
        label: 'Drop',
        data: [-11, -12, -10, -11, -12, -11],
        backgroundColor: '#FF767E',
        barThickness: 30,  
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="user-search-analytics w-full shadow-l rounded-xl p-8 border border-[#E6EBF3]">
      {/* <Bar data={data} options={options} /> */}
      <Bar data={data}  />
    </div>
  );
};

export default UserSearchAnalytics;

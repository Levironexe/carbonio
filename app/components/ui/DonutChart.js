"use client";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart =  ({Verified, Unverified}) => {
  const data = {
    labels: ['Verified', 'Unverified'], //set properties for the chart and nodes
    datasets: [
      {
        label: 'Issues',
        data: [Verified, Unverified],
        backgroundColor: [
          '#22c55e',    // green-500
          '#ef4444',    // red-500
        ],
        borderColor: '#F9FAFB',
        hoverBorderColor: '#333333',
        borderWidth: 4,
        borderRadius: 0,
        hoverBackgroundColor: [
          '#16a34a',    // green-600
          '#dc2626',    // red-600
        ],
        hoverOffset: 25,  // Makes segments pop out on hover
      },
    ],
  };

  const options = {
    cutout:'0%',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 20
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataValue = tooltipItem.raw;
            return `${tooltipItem.label}: ${dataValue}`; // Use backticks for template literals
          },
        },
      },
    },
  };

  return (
    <div
      className="w-full"
    >


      <div
        className="rounded w-full flex, items-center justify-center">
        <div className="w-full h-[200px]"> {/* Set hei  ght to ensure chart fits */}
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StationCapacityComparisonChart = ({ tanks }) => {
  if (!tanks || tanks.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md h-[400px] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Station Capacity Comparison</h2>
          <p>No tank data available.</p>
        </div>
      </div>
    );
  }

  // Aggregate capacity and current_volume by station
  const stationData = tanks.reduce((acc, tank) => {
    const station = tank.station.name;
    if (!acc[station]) {
      acc[station] = { capacity: 0, current_volume: 0 };
    }
    acc[station].capacity += parseFloat(tank.capacity) || 0;
    acc[station].current_volume += parseFloat(tank.current_volume) || 0;
    return acc;
  }, {});

  const stations = Object.keys(stationData);
  const chartData = {
    labels: stations,
    datasets: [
      {
        label: 'Current Volume (L)',
        data: stations.map(station => stationData[station].current_volume),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Capacity (L)',
        data: stations.map(station => stationData[station].capacity),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 14 }, color: '#333' },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} L`,
        },
      },
    },
    scales: {
      x: {
        stacked: true, // Stack bars for capacity and current_volume
        title: { display: true, text: 'Station', font: { size: 14 } },
        ticks: { font: { size: 12 }, color: '#333', maxRotation: 45, minRotation: 45 },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: 'Volume (Liters)', font: { size: 14 } },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { font: { size: 12 }, color: '#333' },
      },
    },
    layout: { padding: 20 },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Station Capacity Comparison</h2>
      <div className="flex-1 relative min-h-0">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StationCapacityComparisonChart;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FuelTypeDistributionChart = ({ tanks }) => {

  if (!tanks || tanks.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md h-[400px] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Fuel Type Distribution</h2>
          <p>No tank data available.</p>
        </div>
      </div>
    );
  }

  // Aggregate capacity and current_volume by fuel type
  const fuelTypeData = tanks.reduce((acc, tank) => {
    const fuelType = tank.fuel_type.name;
    if (!acc[fuelType]) {
      acc[fuelType] = { capacity: 0, current_volume: 0 };
    }
    acc[fuelType].capacity += parseFloat(tank.capacity) || 0;
    acc[fuelType].current_volume += parseFloat(tank.current_volume) || 0;
    return acc;
  }, {});

  const fuelTypes = Object.keys(fuelTypeData);
  const chartData = {
    labels: fuelTypes,
    datasets: [
      {
        label: 'Current Volume (L)',
        data: fuelTypes.map(fuelType => fuelTypeData[fuelType].current_volume),
        backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Capacity (L)',
        data: fuelTypes.map(fuelType => fuelTypeData[fuelType].capacity),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
        borderColor: 'rgba(255, 99, 132, 1)',
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
        title: { display: true, text: 'Fuel Type', font: { size: 14 } },
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
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Fuel Type Distribution</h2>
      <div className="flex-1 relative min-h-0">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default FuelTypeDistributionChart;
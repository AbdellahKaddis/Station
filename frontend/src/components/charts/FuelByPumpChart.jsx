import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FuelByPumpChart = ({ sales, onPumpClick }) => {
  const pumpData = sales.reduce((acc, sale) => {
    const pumpCode = sale.meter_reading.pump.code;
    acc[pumpCode] = (acc[pumpCode] || 0) + parseFloat(sale.quantity);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(pumpData),
    datasets: [{
      label: 'Fuel Dispensed (L)',
      data: Object.values(pumpData),
      backgroundColor: ['#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Quantity (L)' } },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const pumpCode = chartData.labels[index];
        onPumpClick(pumpCode);
      }
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Fuel Dispensed by Pump</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default FuelByPumpChart;
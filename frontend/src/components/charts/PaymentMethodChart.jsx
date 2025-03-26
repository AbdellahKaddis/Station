import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const PaymentMethodChart = ({ sales }) => {
  if (!sales || sales.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md h-[512px] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Payment Method Breakdown</h2>
          <p>No sales data available.</p>
        </div>
      </div>
    );
  }

  const paymentData = sales.reduce((acc, sale) => {
    const method = sale.payment_method || 'Unknown';
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(paymentData),
    datasets: [{
      data: Object.values(paymentData),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Red, Blue, Yellow
      hoverOffset: 4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14 },
          color: '#333',
          boxWidth: 20,
          padding: 10,
        },
        maxHeight: 100, // Limit legend height to prevent overflow
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} sales`,
        },
      },
      title: {
        display: false, // Title is handled by h2, avoid duplication
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 20,
        left: 20,
        right: 20,
      }, // Ensure chart fits within container
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[512px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Payment Method Breakdown</h2>
      <div className="flex-1 relative min-h-0"> {/* min-h-0 prevents flex overflow */}
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PaymentMethodChart;
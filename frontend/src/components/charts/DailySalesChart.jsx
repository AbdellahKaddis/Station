import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailySalesChart = ({ sales, dateRange }) => {
  const [start, end] = dateRange || [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()];

  const daysInRange = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    daysInRange.push(new Date(d).toISOString().split('T')[0]);
  }

  const salesByDate = sales.reduce((acc, sale) => {
    const date = sale.sale_date.split(' ')[0];
    acc[date] = (acc[date] || 0) + parseFloat(sale.amount);
    return acc;
  }, {});

  const data = daysInRange.map(date => salesByDate[date] || 0);

  const chartData = {
    labels: daysInRange.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [{
      label: 'Daily Sales (MAD)',
      data,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            // Get the full date from daysInRange based on the hovered index
            const index = tooltipItems[0].dataIndex;
            const fullDate = new Date(daysInRange[index]).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return fullDate; // e.g., "March 21, 2025"
          },
          label: (tooltipItem) => {
            return `Sales: ${tooltipItem.raw} MAD`; // Customize the value display
          },
        },
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Amount (MAD)' } },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Daily Sales Trend</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DailySalesChart;
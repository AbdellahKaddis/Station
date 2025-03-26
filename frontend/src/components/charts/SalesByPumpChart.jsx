import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesByPumpChart = ({ sales, dateRange }) => {
  
  if (!sales || sales.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-4">Sales by Pump and Date</h2>
        <p>No sales data available.</p>
      </div>
    );
  }

  // Fallback to last 7 days if dateRange is invalid
  const [start, end] = dateRange && dateRange[0] && dateRange[1]
    ? [new Date(dateRange[0]), new Date(dateRange[1])]
    : [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()];
  
  // Ensure start and end are valid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('Invalid dateRange:', dateRange);
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-red-500">
        <h2 className="text-xl font-semibold mb-4">Sales by Pump and Date</h2>
        <p>Invalid date range provided.</p>
      </div>
    );
  }

  // Generate array of days in the range
  const daysInRange = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    daysInRange.push(new Date(d).toISOString().split('T')[0]); // e.g., "2025-03-21"
  }

  // Aggregate sales by date and pump
  const salesByDateAndPump = sales.reduce((acc, sale) => {
    const date = sale.sale_date?.split(' ')[0]; // e.g., "2025-03-21"
    const pumpCode = sale.meter_reading?.pump?.code || 'Unknown';
    const amount = parseFloat(sale.amount) || 0;

    if (!date) {
      console.warn('Sale missing sale_date:', sale); // Debug: Catch bad data
      return acc;
    }

    if (!acc[date]) acc[date] = {};
    acc[date][pumpCode] = (acc[date][pumpCode] || 0) + amount;
    return acc;
  }, {});
 

  // Get unique pump codes
  const pumps = [...new Set(sales.map(sale => sale.meter_reading?.pump?.code || 'Unknown'))];


  if (pumps.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-4">Sales by Pump and Date</h2>
        <p>No pump data available.</p>
      </div>
    );
  }

  // Prepare datasets for each pump
  const datasets = pumps.map((pump, index) => ({
    label: pump,
    data: daysInRange.map(date => salesByDateAndPump[date]?.[pump] || 0),
    backgroundColor: [
      'rgba(255, 159, 64, 0.6)',  // Orange
      'rgba(75, 192, 192, 0.6)',  // Teal
      'rgba(153, 102, 255, 0.6)', // Purple
      'rgba(255, 99, 132, 0.6)',  // Red
    ][index % 4],
    borderColor: [
      'rgba(255, 159, 64, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 99, 132, 1)',
    ][index % 4],
    borderWidth: 1,
  }));


  const chartData = {
    labels: daysInRange.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets,
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
          title: (tooltipItems) => {
            const date = daysInRange[tooltipItems[0].dataIndex];
            return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          },
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} MAD`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: 'Date', font: { size: 14 } },
        ticks: { font: { size: 12 }, color: '#333', maxRotation: 45, minRotation: 45 },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: 'Amount (MAD)', font: { size: 14 } },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { font: { size: 12 }, color: '#333' },
      },
    },
    layout: { padding: 20 },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const date = daysInRange[index];
        const pump = datasets[elements[0].datasetIndex].label;
      
      }
    },
  };

  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md h-[512px]">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Sales by Pump and Date</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesByPumpChart;
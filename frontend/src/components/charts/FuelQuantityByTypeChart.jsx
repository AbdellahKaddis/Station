import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FuelQuantityByTypeChart = ({ sales, dateRange }) => {
  if (!sales || sales.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-4">Fuel Quantity by Type and Date</h2>
        <p>No sales data available.</p>
      </div>
    );
  }

  // Fallback to last 7 days if dateRange is invalid
  const [start, end] = dateRange && dateRange[0] && dateRange[1]
    ? dateRange
    : [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()];

  // Generate array of days in the range
  const daysInRange = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    daysInRange.push(new Date(d).toISOString().split('T')[0]); // e.g., "2025-03-21"
  }

  // Aggregate quantities by date and fuel type
  const quantitiesByDateAndType = sales.reduce((acc, sale) => {
    const date = sale.sale_date.split(' ')[0]; // e.g., "2025-03-21"
    const fuelType = sale.meter_reading?.pump?.tank?.fuel_type?.name || 'Unknown';
    const quantity = parseFloat(sale?.quantity) || 0;
    if (!acc[date]) acc[date] = {};
    acc[date][fuelType] = (acc[date][fuelType] || 0) + quantity;
    return acc;
  }, {});

  // Get unique fuel types
  const fuelTypes = [...new Set(sales.map(sale => sale.meter_reading?.pump?.tank?.fuel_type?.name || 'Unknown'))];

  // Prepare datasets for each fuel type
  const datasets = fuelTypes.map((type, index) => ({
    label: type,
    data: daysInRange.map(date => quantitiesByDateAndType[date]?.[type] || 0),
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',  // Diesel: Red
      'rgba(54, 162, 235, 0.6)',  // Gasoline: Blue
      'rgba(255, 206, 86, 0.6)',  // Other: Yellow (if applicable)
    ][index % 3], // Cycle through colors
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
    ][index % 3],
    borderWidth: 1,
  }));

  const chartData = {
    labels: daysInRange.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })), // e.g., "Mar 21"
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
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()} Liters`,
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
        title: { display: true, text: 'Quantity (Liters)', font: { size: 14 } },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { font: { size: 12 }, color: '#333' },
      },
    },
    layout: { padding: 20 },
  };

  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md h-[512px]">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Fuel Quantity by Type and Date</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default FuelQuantityByTypeChart;
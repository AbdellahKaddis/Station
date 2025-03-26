// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const MonthlySalesChart = ({ sales, dateRange, onMonthClick }) => {
//   // Fallback to last 6 months if dateRange is invalid
//   const defaultStart = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000); // 6 months ago
//   const [start, end] = dateRange && dateRange[0] && dateRange[1]
//     ? dateRange
//     : [defaultStart, new Date()];

//   const monthsInRange = [];
//   let current = new Date(start.getFullYear(), start.getMonth(), 1);
//   const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
//   while (current <= endMonth) {
//     monthsInRange.push(new Date(current));
//     current.setMonth(current.getMonth() + 1);
//   }

//   if (!sales || sales.length === 0) {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
//         <h2 className="text-xl font-semibold mb-4">Monthly Sales Trend</h2>
//         <p>No sales data available for this range.</p>
//       </div>
//     );
//   }

//   const salesByMonth = sales.reduce((acc, sale) => {
//     const saleDate = new Date(sale.sale_date.split(' ')[0]);
//     const monthKey = `${saleDate.getFullYear()}-${saleDate.getMonth()}`;
//     acc[monthKey] = (acc[monthKey] || 0) + parseFloat(sale.amount);
//     return acc;
//   }, {});

//   const data = monthsInRange.map(month => {
//     const monthKey = `${month.getFullYear()}-${month.getMonth()}`;
//     return salesByMonth[monthKey] || 0;
//   });

//   const chartData = {
//     labels: monthsInRange.map(month =>
//       month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
//     ),
//     datasets: [{
//       label: 'Monthly Sales (MAD)',
//       data,
//       borderColor: 'rgba(54, 162, 235, 1)', // High contrast blue
//       backgroundColor: 'rgba(54, 162, 235, 0.2)',
//       borderWidth: 2, // Thicker line for visibility
//       fill: true,
//       tension: 0.3,
//     }],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false, // Better control over size
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: { font: { size: 14 }, color: '#333' }, // Larger, darker legend
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         backgroundColor: 'rgba(0, 0, 0, 0.8)', // Better contrast
//         titleFont: { size: 14 },
//         bodyFont: { size: 12 },
//         callbacks: {
//           title: (tooltipItems) => {
//             const index = tooltipItems[0].dataIndex;
//             return monthsInRange[index].toLocaleDateString('en-US', {
//               month: 'long',
//               year: 'numeric',
//             });
//           },
//           label: (tooltipItem) => `Sales: ${tooltipItem.raw.toLocaleString()} MAD`, // Formatted number
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: 'Amount (MAD)', font: { size: 14 } },
//         grid: { color: 'rgba(0, 0, 0, 0.1)' }, // Add grid lines
//         ticks: { font: { size: 12 }, color: '#333' },
//       },
//       x: {
//         title: { display: true, text: 'Month', font: { size: 14 } },
//         ticks: {
//           font: { size: 12 },
//           color: '#333',
//           maxRotation: 45, // Rotate labels if crowded
//           minRotation: 45,
//         },
//       },
//     },
//     layout: { padding: 20 }, // More breathing room
//     onClick: (event, elements) => {
//       if (elements.length > 0 && onMonthClick) {
//         const index = elements[0].index;
//         onMonthClick(monthsInRange[index]); // Callback for interactivity
//       }
//     },
//   };

//   return (
//     <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md h-96">
//       <h2 className="text-xl font-bold mb-4 text-gray-800">Monthly Sales Trend</h2>
//       <Line data={chartData} options={options} />
//     </div>
//   );
// };

// export default MonthlySalesChart;
import React from 'react';
import { Bar } from 'react-chartjs-2'; // Changed to Bar
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlySalesChart = ({ sales, dateRange, onMonthClick }) => {
  const defaultStart = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000); // 6 months ago
  const [start, end] = dateRange && dateRange[0] && dateRange[1]
    ? dateRange
    : [defaultStart, new Date()];

  const monthsInRange = [];
  let current = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
  while (current <= endMonth) {
    monthsInRange.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
        <p>No sales data available for this range.</p>
      </div>
    );
  }

  const salesByMonth = sales.reduce((acc, sale) => {
    const saleDate = new Date(sale.sale_date.split(' ')[0]);
    const monthKey = `${saleDate.getFullYear()}-${saleDate.getMonth()}`;
    acc[monthKey] = (acc[monthKey] || 0) + parseFloat(sale.amount);
    return acc;
  }, {});

  const data = monthsInRange.map(month => {
    const monthKey = `${month.getFullYear()}-${month.getMonth()}`;
    return salesByMonth[monthKey] || 0;
  });

  const chartData = {
    labels: monthsInRange.map(month =>
      month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    ),
    datasets: [{
      label: 'Monthly Sales (MAD)',
      data,
      backgroundColor: 'rgba(54, 162, 235, 0.6)', // Slightly transparent for depth
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
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
            const index = tooltipItems[0].dataIndex;
            return monthsInRange[index].toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            });
          },
          label: (tooltipItem) => `Sales: ${tooltipItem.raw.toLocaleString()} MAD`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Amount (MAD)', font: { size: 14 } },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { font: { size: 12 }, color: '#333' },
      },
      x: {
        title: { display: true, text: 'Month', font: { size: 14 } },
        ticks: {
          font: { size: 12 },
          color: '#333',
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    layout: { padding: 20 },
    onClick: (event, elements) => {
      if (elements.length > 0 && onMonthClick) {
        const index = elements[0].index;
        onMonthClick(monthsInRange[index]);
      }
    },
  };

  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md h-[512px]">
    <h2 className="text-xl font-bold mb-4 text-gray-800">Monthly Sales</h2>
    <Bar data={chartData} options={options} />
  </div>
  );
};

export default MonthlySalesChart;
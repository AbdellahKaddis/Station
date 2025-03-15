import { ChartBarIcon, FireIcon, UsersIcon, ClockIcon, CogIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Deepdash() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-white dark:bg-gray-800 shadow-lg fixed">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              ⛽ FuelFlow
            </h1>
          </div>
          
          <nav className="mt-8">
            {[
              { name: 'Dashboard', icon: ChartBarIcon },
              { name: 'Pumps', icon: FireIcon },
              { name: 'Staff', icon: UsersIcon },
              { name: 'Schedule', icon: ClockIcon },
              { name: 'Settings', icon: CogIcon },
            ].map((item) => (
              <a
                key={item.name}
                className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Dashboard Overview
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white">JD</span>
              </div>
            </div>
          </header>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Daily Sales"
              value="$12,450"
              trend="+15%"
              icon={ChartBarIcon}
              color="bg-green-100 dark:bg-green-900"
            />
            <MetricCard
              title="Active Pumps"
              value="8/10"
              trend="-2%"
              icon={FireIcon}
              color="bg-blue-100 dark:bg-blue-900"
            />
            <MetricCard
              title="Monthly Customers"
              value="2,345"
              trend="+24%"
              icon={UsersIcon}
              color="bg-purple-100 dark:bg-purple-900"
            />
            <MetricCard
              title="Stock Level"
              value="78%"
              trend="Stable"
              icon={FireIcon}
              color="bg-yellow-100 dark:bg-yellow-900"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                Sales Overview
              </h3>
              <SalesChart />
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">
                Inventory Levels
              </h3>
              <InventoryChart />
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Recent Transactions
            </h3>
            <TransactionTable />
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable Metric Card Component
const MetricCard = ({ title, value, trend, icon: Icon, color }) => (
  <div className={`${color} p-6 rounded-xl shadow-sm`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
        <p className="text-2xl font-bold mt-2 dark:text-white">{value}</p>
        <span className="text-sm text-green-500">{trend}</span>
      </div>
      <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
        <Icon className="w-6 h-6 text-gray-700 dark:text-white" />
      </div>
    </div>
  </div>
);

// SalesChart Component (Line Chart)
const SalesChart = () => {
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// InventoryChart Component (Bar Chart)
const InventoryChart = () => {
  const inventoryData = [
    { name: 'Pump 1', stock: 80 },
    { name: 'Pump 2', stock: 45 },
    { name: 'Pump 3', stock: 60 },
    { name: 'Pump 4', stock: 90 },
    { name: 'Pump 5', stock: 30 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={inventoryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stock" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Sample Table Component
const TransactionTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-left text-gray-600 dark:text-gray-300 border-b">
          <th className="pb-3">Time</th>
          <th className="pb-3">Pump</th>
          <th className="pb-3">Amount</th>
          <th className="pb-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i} className="border-b last:border-b-0">
            <td className="py-3 dark:text-white">10:2{i} AM</td>
            <td className="py-3 dark:text-white">Pump #{i+1}</td>
            <td className="py-3 dark:text-white">${i+1}50.00</td>
            <td className="py-3">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">
                Completed
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
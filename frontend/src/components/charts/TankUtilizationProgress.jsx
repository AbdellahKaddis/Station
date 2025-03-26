import React from 'react';

const TankUtilizationProgress = ({ tanks }) => {

  if (!tanks || tanks.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center text-gray-500">
        <h2 className="text-lg font-semibold mb-4">Tank Utilization</h2>
        <p>No tank data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Tank Utilization</h2>
      <div className="space-y-4">
        {tanks.map((tank) => {
          const utilization = (tank.current_volume / tank.capacity) * 100;
          const barColor = 
            utilization < 20 ? 'bg-red-500' : // Low: Red
            utilization > 80 ? 'bg-blue-500' : // High: Blue
            'bg-teal-500'; // Normal: Teal

          return (
            <div key={tank.id} className="flex items-center space-x-4">
              <div className="w-1/4 text-sm font-medium text-gray-700 truncate">
                {tank.name}
              </div>
              <div className="w-3/4">
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className={`${barColor} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min(utilization, 100)}%` }} // Cap at 100%
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {utilization.toFixed(1)}% Full ({tank.current_volume} / {tank.capacity} L)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TankUtilizationProgress;
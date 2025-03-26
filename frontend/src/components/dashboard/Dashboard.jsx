import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import saleApi from "../../services/api/sale/saleApi";
import tankApi from "../../services/api/tank/tankApi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DailySalesChart from "../charts/DailySalesChart";
import MonthlySalesChart from "../charts/MonthlySalesChart";
import SalesByPumpChart from "../charts/SalesByPumpChart";
import FuelQuantityByTypeChart from "../charts/FuelQuantityByTypeChart";
import PaymentMethodChart from "../charts/PaymentMethodChart";
import TankUtilizationProgress from "../charts/TankUtilizationProgress";
import FuelTypeDistributionChart from "../charts/FuelTypeDistributionChart";
import StationCapacityComparisonChart from "../charts/StationCapacityComparisonChart";

const Dashboard = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [filteredTanks, setFilteredTanks] = useState([]);
  const [stations, setStations] = useState([]); // For station dropdown
  const [selectedStation, setSelectedStation] = useState(''); // Station filter
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  // Fetch sales data
  const fetchSales = async () => {
    try {
      const { data } = await saleApi.getAllSales();
      setSales(data);
      filterSales(data, dateRange, selectedStation);
    } catch (err) {
      toast.error("Failed to load sales data. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Fetch tanks data and extract unique stations
  const fetchTanks = async () => {
    try {
      const { data } = await tankApi.getAllTanks();
      setTanks(data.data);
      filterTanks(data.data, selectedStation);
      // Extract unique stations for dropdown
      const uniqueStations = [...new Set(data.data.map(tank => tank.station.name))];
      setStations(uniqueStations);
    } catch (err) {
      toast.error("Failed to load tanks data. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Fetch both sales and tanks on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchSales(), fetchTanks()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter sales by date range and station
  const filterSales = (salesData, range, station) => {
    const [start, end] = range || dateRange;
    const filtered = salesData.filter(sale => {
      const saleDate = new Date(sale.sale_date.split(' ')[0]);
      const dateMatch = (!start || saleDate >= start) && (!end || saleDate <= end);
      const stationMatch = !station || (sale.meter_reading?.pump?.tank?.station?.name === station); // Updated field
      return dateMatch && stationMatch;
    });
    setFilteredSales(filtered);
  };

  // Filter tanks by selected station
  const filterTanks = (tanksData, station) => {
    const filtered = station
      ? tanksData.filter(tank => tank.station.name === station)
      : tanksData; // Show all tanks if no station selected
    setFilteredTanks(filtered);
  };

  // Update filtered data when dateRange or selectedStation changes
  useEffect(() => {
    filterSales(sales, dateRange, selectedStation);
    filterTanks(tanks, selectedStation);
  }, [dateRange, selectedStation, sales, tanks]);

  const handleDateRangeChange = (update) => {
    const [newStart, newEnd] = update;
    setDateRange([
      newStart || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      newEnd || new Date(),
    ]);
  };

  const resetDateRange = () => {
    setDateRange([new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]);
    toast.info("Date range reset to last 7 days", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleStationChange = (e) => {
    setSelectedStation(e.target.value || ''); // Empty string for "All Stations"
  };

  const resetStationFilter = () => {
    setSelectedStation('');
    toast.info("Station filter reset to all stations", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  if (loading) {
    return (
      <div className="looping-rhombuses-spinner">
    <div className="rhombus"></div>
    <div className="rhombus"></div>
    <div className="rhombus"></div>
  </div>
    );
  }

  return (
    <div className="container mx-auto p-4">

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sales Date Range</label>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateRangeChange}
            className="p-2 border rounded-md w-full sm:w-64"
            dateFormat="MMMM d, yyyy"
            placeholderText="Select date range"
        
          />
        </div>
        <button
          onClick={resetDateRange}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Reset Date Range
        </button>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Station</label>
          <select
            value={selectedStation}
            onChange={handleStationChange}
            className="p-2 border rounded-md w-full sm:w-64"
          >
            <option value="">All Stations</option>
            {stations.map(station => (
              <option key={station} value={station}>{station}</option>
            ))}
          </select>
        </div>
        <button
          onClick={resetStationFilter}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Reset Station
        </button>
      </div>

      {/* Grid Layout: Sales Charts */}
      <div className="space-y-6">
        {/* Row 1: Daily and Monthly Sales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DailySalesChart sales={filteredSales} dateRange={dateRange} />
          <MonthlySalesChart sales={filteredSales} dateRange={dateRange} />
        </div>
        {/* Row 2: Pump and Fuel Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SalesByPumpChart sales={filteredSales} dateRange={dateRange} />
          <FuelQuantityByTypeChart sales={filteredSales} dateRange={dateRange} />
        </div>
        {/* Row 3: Payment Method */}
        <div className="grid grid-cols-1 gap-6">
          <PaymentMethodChart sales={filteredSales} />
        </div>
      </div>

      {/* Tank Charts Section */}
      <div className="mt-6 space-y-6">
        <h2 className="text-2xl font-bold">Tank Insights</h2>
        {/* Tank Utilization Progress */}
        <TankUtilizationProgress tanks={filteredTanks} />
        {/* Row for Fuel Type and Station Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FuelTypeDistributionChart tanks={filteredTanks} />
          <StationCapacityComparisonChart tanks={filteredTanks} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
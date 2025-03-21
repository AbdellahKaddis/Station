import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import meterReadingApi from "../../services/api/meterReading/meterReadingApi";


const MeterReadingsList = () => {
  const [meterReadings, setMeterReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch meter readings
  const fetchMeterReadings = async () => {
    setLoading(true);
    try {
      const { data } = await meterReadingApi.getAllMeterReadings(); 
      setMeterReadings(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load meter readings. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchMeterReadings();
  }, []);

  // Add a new meter reading
  const handleAddMeterReading = async (meterReading) => {
    try {
      await meterReadingApi.addMeterReading(meterReading); 
      fetchMeterReadings();
      toast.success("Meter reading added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to add meter reading. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Update a meter reading
  const handleUpdateMeterReading = async (meterReading) => {
    try {
      await meterReadingApi.updateMeterReading(meterReading); 
      fetchMeterReadings();
      toast.success("Meter reading updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to update meter reading. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Delete a meter reading
  const handleDeleteMeterReading = async (meterReadingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await meterReadingApi.deleteMeterReading(meterReadingId); 
          fetchMeterReadings();
          toast.success("Meter reading deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } catch (err) {
          console.log(err);
          toast.error(`Failed to delete meter reading. ${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  // Loading state
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
      <h1 className="text-3xl font-bold mb-6">Meter Readings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pump Number
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Initial Reading
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final Reading
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {meterReadings.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m0 0V9m0 8H5m4 0h4m4 0v-2m0 0V9m0 8h4m-4-8V5m0 4V5m0 4h4m-4 4h4"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No meter readings found</h3>
            {/* <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new meter reading.
            </p>
            <div className="mt-6">
              <button
                // onClick={() => openEditModal()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Meter Reading
              </button>
            </div> */}
          </div>): (meterReadings.map((meterReading) => (
                <tr key={meterReading.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{meterReading.pump.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{meterReading.initial_reading}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{meterReading.final_reading|| "N/A"} </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MeterReadingsList;
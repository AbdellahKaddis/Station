import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import axios from "axios";
import StationFormModal from "./StationFormModal";
import StationDetailsModal from "./StationDetailsModal"; 
import stationApi from "../../services/api/station/stationApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

const StationList = () => {
  const [stations, setStations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [editingStation, setEditingStation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null); 

  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await stationApi.getAllStations();
      setStations(response.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load stations list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleAddStation = async (station) => {
    try {
      await stationApi.addNewStation(station);
      fetchStations();
      toast.success("Station added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to add station. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdateStation = async (station) => {
    try {
      await stationApi.updateStation(station);
      fetchStations();
      toast.success("Station updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to update station. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeleteStation = async (stationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await stationApi.deleteStation(stationId);
          fetchStations();
          toast.success("Station deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } catch (err) {
          console.log(err);
          toast.error(`Failed to delete station. ${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openModal = (station = null) => {
    let formattedStation = null;
    if (station) {
      const formatttedOpeningHours = station.opening_hours.map((opening_hour) => {
        return {
          ...opening_hour,
          opening_time: opening_hour.opening_time.slice(0, 5),
          closing_time: opening_hour.closing_time.slice(0, 5)
        }
      });
      formattedStation = { ...station, opening_hours: formatttedOpeningHours }
    }
    setEditingStation(formattedStation);
    setIsModalOpen(true);
  };

  const openDetailsModal = (station) => {
    setSelectedStation(station);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setEditingStation(null);
    setIsModalOpen(false);
  };

  const closeDetailsModal = () => {
    setSelectedStation(null);
    setIsDetailsModalOpen(false);
  };

  if (loading) {
    return <div className="looping-rhombuses-spinner">
      <div className="rhombus"></div>
      <div className="rhombus"></div>
      <div className="rhombus"></div>
    </div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Stations</h1>
      <button
        onClick={() => openModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Station
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Stations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stations.map((station) => (
                <tr key={station.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{station.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{station.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{station.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1  ${station.status === 'active' ? `bg-green-100 text-green-800` : `bg-red-100 text-red-800`} rounded-full text-sm`}>
                      {station.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5" onClick={() => openModal(station)} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" onClick={() => handleDeleteStation(station.id)} />
                    </button>
                    <button className="text-gray-600 hover:text-orange-900 cursor-pointer">
                      <Eye className="h-5 w-5" onClick={() => openDetailsModal(station)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <StationFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingStation ? handleUpdateStation : handleAddStation}
        initialData={editingStation}
      />

      <StationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        station={selectedStation}
      />

      <ToastContainer />
    </div>
  );
};

export default StationList;
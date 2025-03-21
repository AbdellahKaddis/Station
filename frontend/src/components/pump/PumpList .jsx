import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import pumpApi from "../../services/api/pump/pumpApi"; 
import PumpFormModal from "./PumpFormModal"; 
import PumpDetailsModal from "./PumpDetailsModal";
import meterReadingApi from "../../services/api/meterReading/meterReadingApi.js";
const PumpList = () => {
  const [pumps, setPumps] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [editingPump, setEditingPump] = useState(null);
  const [selectedPump, setSelectedPump] = useState(null); 

  const fetchPumps = async () => {
    setLoading(true);
    try {
      const { data } = await pumpApi.getAllPumps(); 
      setPumps(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load pumps list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchPumps();
  }, []);
  const addMeterReading = async (meterReading) => {
    try {
      await meterReadingApi.addMeterReading(meterReading); 
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
  const handleAddPump = async (pump) => {
    try {
      const {data}=await pumpApi.addNewPump(pump); 
      fetchPumps();

      const newMeterReading = {
        initial_reading:0,
        final_reading:null,
        pump_id: data.data.id
      };
  
      addMeterReading(newMeterReading);
      toast.success("Pump added successfully!", {
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
      toast.error(`Failed to add pump. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdatePump = async (pump) => {
    try {
      await pumpApi.updatePump(pump); 
      fetchPumps();
      toast.success("Pump updated successfully!", {
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
      toast.error(`Failed to update pump. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };


  const handleDeletePump = async (pumpId) => {
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
          await pumpApi.deletePump(pumpId); 
          fetchPumps();
          toast.success("Pump deleted successfully!", {
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
          toast.error(`Failed to delete pump. ${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };


  const openEditModal = (pump = null) => {
    if (pump !== null) {
      pump = { ...pump, tank_id: pump.tank.id }; 
    }
    setEditingPump(pump);
    setIsEditModalOpen(true);
  };

  const openDetailsModal = (station) => {
    setSelectedPump(station);
    setIsDetailsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingPump(null);
    setIsEditModalOpen(false);
  };
  const closeDetailsModal = () => {
    setSelectedPump(null);
    setIsDetailsModalOpen(false);
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
      <h1 className="text-3xl font-bold mb-6">Pumps</h1>
      <button
        onClick={() => openEditModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Pump
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pump Number
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flow Rate
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tank Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pumps.map((pump) => (
                <tr key={pump.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{pump.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 ${
                        pump.statuts === "active"
                          ? "bg-green-100 text-green-800"
                          : pump.statuts === "under_maintenance"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      } rounded-full text-sm`}
                    >
                      {pump.statuts}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{pump.flow} L</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pump.tank.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pump.tank.fuel_type.name} L/min</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pump.tank.station.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => openEditModal(pump)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeletePump(pump.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                     <button className="text-gray-600 hover:text-orange-900 cursor-pointer">
                        <Eye className="h-5 w-5" onClick={() => openDetailsModal(pump)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pump Form Modal */}
      <PumpFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingPump ? handleUpdatePump : handleAddPump}
        initialData={editingPump}
      />

        <PumpDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        pump={selectedPump}
        />

      <ToastContainer />
    </div>
  );
};

export default PumpList;
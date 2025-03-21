import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import tankApi from "../../services/api/tank/tankApi"; 
import TankFormModal from "./TankFormModal";

const TanksList = () => {
  const [tanks, setTanks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingTank, setEditingTank] = useState(null);

  const fetchTanks = async () => {
    setLoading(true);
    try {
      const { data } = await tankApi.getAllTanks(); 
      setTanks(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load tanks list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchTanks();
  }, []);

  const handleAddTank = async (tank) => {
    try {
      await tankApi.addNewTank(tank); 
      fetchTanks();
      toast.success("Tank added successfully!", {
        position: "top-right",
        autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to add tank. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdateTank = async (tank) => {
    try {
      await tankApi.updateTank(tank); 
      fetchTanks();
      toast.success("Tank updated successfully!", {
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
      toast.error(`Failed to update tank. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeleteTank = async (tankId) => {
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
          await tankApi.deleteTank(tankId); 
          fetchTanks();
          toast.success("Tank deleted successfully!", {
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
          toast.error(`Failed to delete tank. ${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (tank = null) => {
    if(tank !==null)
    {
        tank = {...tank,fuel_type_id:tank.fuel_type.id,station_id:tank.station.id}
    }
    setEditingTank(tank);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingTank(null);
    setIsEditModalOpen(false);
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
      <h1 className="text-3xl font-bold mb-6">Tanks</h1>
      <button
        onClick={() => openEditModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Tank
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Tank Name
      </th>
        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Fuel Type
      </th>
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Capacity (L)
      </th>
      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Current Volume (L)
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
              {tanks.map((tank) => (

                  <tr key={tank.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{tank.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tank.fuel_type.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tank.capacity} L</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tank.current_volume} L</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tank.station.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => openEditModal(tank)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteTank(tank.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                     </td>
                    </tr>
                    
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TankFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingTank ? handleUpdateTank : handleAddTank}
        initialData={editingTank}
      />

      <ToastContainer />
    </div>
  );
};

export default TanksList;
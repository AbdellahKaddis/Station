import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";
import FuelTypeFormModal from './FuelTypeFormModal';

const FuelTypesList = () => {
  const [fuelTypes, setFuelTypes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingFuelType, setEditingFuelType] = useState(null);

  const fetchFuelTypes = async () => {
    setLoading(true);
    try {
      const response = await fuelTypeApi.getAllFuelTypes();
      setFuelTypes(response.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load fuel types list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchFuelTypes();
  }, []);

  const handleAddFuelType = async (fuelType) => {
    try {
      await fuelTypeApi.addNewFuelType(fuelType);
      fetchFuelTypes();
      toast.success("fuel type added successfully!", {
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
      toast.error(`Failed to add fuel type. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdateFuelType = async (fuelType) => {
    try {
      await fuelTypeApi.updateFuelType(fuelType);
      fetchFuelTypes();
      toast.success("Fuel type updated successfully!", {
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
      toast.error(`Failed to update fuel Type. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeleteFuelType = async (fuelTypeId) => {
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
          await fuelTypeApi.deleteFuelType(fuelTypeId);
          fetchFuelTypes();
          toast.success("Fuel type deleted successfully!", {
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
          toast.error(`Failed to delete fuel type. ${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (fuelType = null) => {
    setEditingFuelType(fuelType);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setEditingFuelType(null);
    setIsEditModalOpen(false);
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
      <h1 className="text-3xl font-bold mb-6">Fuel Types</h1>
      <button
        onClick={() => openEditModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Fuel Type
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Id
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fuelTypes.map((fuelType) => (
                <tr key={fuelType.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{fuelType.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{fuelType.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5" onClick={() => openEditModal(fuelType)} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" onClick={() => handleDeleteFuelType(fuelType.id)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FuelTypeFormModal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        onSubmit={editingFuelType ? handleUpdateFuelType : handleAddFuelType}
        initialData={editingFuelType}
      />


      <ToastContainer />
    </div>
  );
};

export default FuelTypesList;
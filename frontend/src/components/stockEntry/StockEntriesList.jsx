import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

import StockEntryFormModal from './StockEntryFormModal'; 
import tankApi from "../../services/api/tank/tankApi";
import stockEntryApi from "../../services/api/stockEntry/stockEntryApi";

const StockEntriesList = () => {
  const [stockEntries, setStockEntries] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState(null);

  // Fetch stock entries
  const fetchStockEntries = async () => {
    setLoading(true);
    try {
      const { data } = await stockEntryApi.getAllStockEntries(); 
      setStockEntries(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load stock entries. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchStockEntries();
  }, []);

  // Add new stock entry
  const handleAddStockEntry = async (entry) => {

    let {data} = await tankApi.getTank(entry.tank_id);
    let tank = data.data;
    tank.current_volume+=parseFloat(entry.quantity);
    try {
        await tankApi.updateTank(tank);
          await stockEntryApi.addNewStockEntry(entry); 
          fetchStockEntries();
          toast.success("Stock entry added successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } catch (err) {
          toast.error(`Failed to add stock entry. ${err.response?.data?.message || "Please try again."}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      };


  // Update stock entry
  const handleUpdateStockEntry = async (entry) => {
    let {data} = await tankApi.getTank(entry.tank_id);
    let tank = data.data;

    tank.current_volume= parseFloat(entry.previousVolume) + parseFloat(entry.quantity);
    try {
      await tankApi.updateTank(tank);
      await stockEntryApi.updateStockEntry(entry); 
      fetchStockEntries();
      toast.success("Stock entry updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`Failed to update stock entry. ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Delete stock entry
  const handleDeleteStockEntry = async (entryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await stockEntryApi.deleteStockEntry(entryId); 
          fetchStockEntries();
          toast.success("Stock entry deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } catch (err) {
          toast.error(`Failed to delete stock entry. ${err.response?.data?.message || "Please try again."}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  // Open edit modal
  const openEditModal = (entry = null) => {
    if(entry != null){
        entry = {...entry,tank_id:entry.tank.id,fuel_type_id:entry.fuel_type.id,supplier_id:entry.supplier.id}
    }
    setEditingEntry(entry);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingEntry(null);
    setIsEditModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Stock Entries</h1>
      <button
        onClick={() => openEditModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Stock Entry
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entry Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity (L)
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Price (per L)
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tank Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stockEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.entry_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${entry.purchase_price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.tank?.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.fuel_type?.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.supplier?.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => openEditModal(entry)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteStockEntry(entry.id)}
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

      {/* Stock Entry Form Modal */}
      <StockEntryFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingEntry ? handleUpdateStockEntry : handleAddStockEntry}
        initialData={editingEntry}
      />

      <ToastContainer />
    </div>
  );
};

export default StockEntriesList;

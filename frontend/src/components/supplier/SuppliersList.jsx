import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import supplierApi from "../../services/api/supplier/supplierApi"; 
import SupplierFormModal from './SupplierFormModal'; 

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingSupplier, setEditingSupplier] = useState(null);


  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data } = await supplierApi.getAllSuppliers(); 
      setSuppliers(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load suppliers list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Handle adding a new supplier
  const handleAddSupplier = async (supplier) => {
    try {
      await supplierApi.addNewSupplier(supplier); 
      fetchSuppliers();
      toast.success("Supplier added successfully!", {
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
      toast.error(`Failed to add supplier. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Handle updating a supplier
  const handleUpdateSupplier = async (supplier) => {
    try {
      await supplierApi.updateSupplier(supplier); 
      fetchSuppliers();
      toast.success("Supplier updated successfully!", {
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
      toast.error(`Failed to update supplier. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Handle deleting a supplier
  const handleDeleteSupplier = async (supplierId) => {
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
          await supplierApi.deleteSupplier(supplierId); 
          fetchSuppliers();
          toast.success("Supplier deleted successfully!", {
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
          toast.error(`Failed to delete supplier. ${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  // Open edit modal
  const openEditModal = (supplier = null) => {
    setEditingSupplier(supplier);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingSupplier(null);
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
      <h1 className="text-3xl font-bold mb-6">Suppliers</h1>
      <button
        onClick={() => openEditModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Supplier
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telephone
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
<td className="px-6 py-4 whitespace-nowrap">{supplier.name}</td>
<td className="px-6 py-4 whitespace-nowrap">{supplier.city ?? "N/A"}</td>
<td className="px-6 py-4 whitespace-nowrap">{supplier.address ?? "N/A"}</td>
<td className="px-6 py-4 whitespace-nowrap">{supplier.telephone}</td>
<td className="px-6 py-4 whitespace-nowrap">{supplier.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => openEditModal(supplier)}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteSupplier(supplier.id)}
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

      {/* Supplier Form Modal */}
      <SupplierFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingSupplier ? handleUpdateSupplier : handleAddSupplier}
        initialData={editingSupplier}
      />

      <ToastContainer />
    </div>
  );
};

export default SuppliersList;
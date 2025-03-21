import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

import SalePriceFormModal from "./SalePriceFormModal";
import salePriceHistoryApi from "../../services/api/salePriceHistory/salePriceHistoryApi";

const SalePriceList = () => {
  const [salePrices, setSalePrices] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingSalePrice, setEditingSalePrice] = useState(null);

  const fetchSalePrices = async () => {
    setLoading(true);
    try {
      const { data } = await salePriceHistoryApi.getAllSalePrices();
      setSalePrices(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load sale price history. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchSalePrices();
  }, []);

  const handleAddSalePrice = async (salePrice) => {
    try {
      await salePriceHistoryApi.addNewSalePrice(salePrice);
      fetchSalePrices();
      toast.success("Sale price added successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to add sale price. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdateSalePrice = async (salePrice) => {
    try {
      await salePriceHistoryApi.updateSalePrice(salePrice);
      fetchSalePrices();
      toast.success("Sale price updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to update sale price. ${err.response.data.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeleteSalePrice = async (id) => {
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
          await salePriceHistoryApi.deleteSalePrice(id);
          fetchSalePrices();
          toast.success("Sale price deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } catch (err) {
          console.log(err);
          toast.error(`Failed to delete sale price. ${err.response.data.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (salePrice = null) => {
    if(salePrice)
    {
        salePrice.fuel_type_id=salePrice.fuel_type.id
    }
    setEditingSalePrice(salePrice);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingSalePrice(null);
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
      <h1 className="text-3xl font-bold mb-6">Sale Price Histories</h1>
      <button
        onClick={() => openEditModal()}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
         Add Sale Price
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sale Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fuel Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {salePrices.map((salePrice) => (
              <tr key={salePrice.id}>
                <td className="px-6 py-4 whitespace-nowrap">{salePrice.start_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salePrice.end_date || "Ongoing"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{salePrice.sale_price} $</td>
                <td className="px-6 py-4 whitespace-nowrap">{salePrice.fuel_type.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                  <button onClick={() => openEditModal(salePrice)} disabled={salePrice.end_date } className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDeleteSalePrice(salePrice.id)} disabled={salePrice.end_date } className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      <SalePriceFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingSalePrice ? handleUpdateSalePrice : handleAddSalePrice}
        initialData={editingSalePrice}
      />

      <ToastContainer />
    </div>
  );
};

export default SalePriceList;
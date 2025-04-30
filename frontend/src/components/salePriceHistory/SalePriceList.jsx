// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';

// import SalePriceFormModal from "./SalePriceFormModal";
// import salePriceHistoryApi from "../../services/api/salePriceHistory/salePriceHistoryApi";

// const SalePriceList = () => {
//   const [salePrices, setSalePrices] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingSalePrice, setEditingSalePrice] = useState(null);

//   const fetchSalePrices = async () => {
//     setLoading(true);
//     try {
//       const { data } = await salePriceHistoryApi.getAllSalePrices();
//       setSalePrices(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load sale price history. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchSalePrices();
//   }, []);

//   const handleAddSalePrice = async (salePrice) => {
//     try {
//       await salePriceHistoryApi.addNewSalePrice(salePrice);
//       fetchSalePrices();
//       toast.success("Sale price added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add sale price. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdateSalePrice = async (salePrice) => {
//     try {
//       await salePriceHistoryApi.updateSalePrice(salePrice);
//       fetchSalePrices();
//       toast.success("Sale price updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update sale price. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeleteSalePrice = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await salePriceHistoryApi.deleteSalePrice(id);
//           fetchSalePrices();
//           toast.success("Sale price deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete sale price. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (salePrice = null) => {
//     if(salePrice)
//     {
//         salePrice.fuel_type_id=salePrice.fuel_type.id
//     }
//     setEditingSalePrice(salePrice);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditingSalePrice(null);
//     setIsEditModalOpen(false);
//   };

//   if (loading) {
//     return <div className="looping-rhombuses-spinner">
//       <div className="rhombus"></div>
//       <div className="rhombus"></div>
//       <div className="rhombus"></div>
//     </div>
//   }


//   return (
// <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Sale Price Histories</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//          Add Sale Price
//       </button>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Start Date
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 End Date
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Sale Price
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Fuel Type
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//             {salePrices.map((salePrice) => (
//               <tr key={salePrice.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{salePrice.start_date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{salePrice.end_date || "Ongoing"}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{salePrice.sale_price} $</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{salePrice.fuel_type.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                   <button onClick={() => openEditModal(salePrice)} disabled={salePrice.end_date } className="text-indigo-600 hover:text-indigo-900">
//                     <Edit className="h-5 w-5" />
//                   </button>
//                   <button onClick={() => handleDeleteSalePrice(salePrice.id)} disabled={salePrice.end_date } className="text-red-600 hover:text-red-900">
//                     <Trash2 className="h-5 w-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <SalePriceFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingSalePrice ? handleUpdateSalePrice : handleAddSalePrice}
//         initialData={editingSalePrice}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default SalePriceList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronDown, X, Download, Filter } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalePriceFormModal from "./SalePriceFormModal";
import salePriceHistoryApi from "../../services/api/salePriceHistory/salePriceHistoryApi";
import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";

const SalePriceList = () => {
  const [salePrices, setSalePrices] = useState([]);
  const [filteredSalePrices, setFilteredSalePrices] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSalePrice, setSelectedSalePrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSalePrice, setEditingSalePrice] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [fuelTypes, setFuelTypes] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const itemsPerPage = 10;

  // Fetch sale prices
  const fetchSalePrices = async () => {
    setLoading(true);
    try {
      const { data } = await salePriceHistoryApi.getAllSalePrices();
      setSalePrices(data.data);
      setFilteredSalePrices(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load sale price history. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Fetch fuel types
  const fetchFuelTypes = async () => {
    try {
      const { data } = await fuelTypeApi.getAllFuelTypes();
      setFuelTypes(data);
    } catch (err) {
      toast.error("Failed to load fuel types. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchSalePrices();
    fetchFuelTypes();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = salePrices.filter((salePrice) => {
      const dateMatch =
        (!startDate || new Date(salePrice.start_date) >= startDate) &&
        (!endDate || new Date(salePrice.start_date) <= endDate);
      const fuelTypeMatch = !selectedFuelType || salePrice.fuel_type?.id === parseInt(selectedFuelType);
      return dateMatch && fuelTypeMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === 'start_date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortConfig.key === 'sale_price') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredSalePrices(filtered);
  }, [salePrices, startDate, endDate, selectedFuelType, sortConfig]);

  // Handle pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredSalePrices.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (filteredSalePrices.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredSalePrices, currentPage, itemsPerPage]);

  // Handle adding a new sale price
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
      toast.error(`Failed to add sale price. ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Handle updating a sale price
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
      toast.error(`Failed to update sale price. ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Handle deleting a sale price
  const handleDeleteSalePrice = async (id) => {
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
          await salePriceHistoryApi.deleteSalePrice(id);
          fetchSalePrices();
          toast.success("Sale price deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } catch (err) {
          toast.error(`Failed to delete sale price. ${err.response?.data?.message || "Please try again."}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  // Open edit modal
  const openEditModal = (salePrice = null) => {
    if (salePrice) {
      salePrice.fuel_type_id = salePrice.fuel_type.id;
    }
    setEditingSalePrice(salePrice);
    setIsEditModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingSalePrice(null);
    setIsEditModalOpen(false);
  };

  // Open details modal
  const openDetailsModal = (salePrice) => {
    setSelectedSalePrice(salePrice);
    setIsDetailsModalOpen(true);
  };

  // Close details modal
  const closeDetailsModal = () => {
    setSelectedSalePrice(null);
    setIsDetailsModalOpen(false);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedFuelType('');
    setCurrentPage(1);
    toast.info("Filters reset", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // Remove specific filter
  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'date':
        setStartDate(null);
        setEndDate(null);
        break;
      case 'fuelType':
        setSelectedFuelType('');
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filteredSalePrices.length / itemsPerPage);
  const paginatedSalePrices = filteredSalePrices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div className="container mx-auto p-6">
      {/* Filters Section */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="sm:hidden flex items-center text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label={isFilterOpen ? "Hide filters" : "Show filters"}
          >
            <Filter className="h-5 w-5 mr-2" />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
          <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Filter Sale Prices</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
              aria-label="Add a new sale price"
            >
              <Plus className="h-5 w-5 mr-2" /> Add Sale Price
            </button>
          </div>
        </div>
        <div className={`${isFilterOpen ? 'block' : 'hidden'} sm:block transition-all duration-300`}>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] z-50">
              <label className="block text-sm font-medium text-gray-800 mb-1">Date Range</label>
              <div className="flex gap-2 z-50">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setCurrentPage(1);
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date"
                  className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                  aria-label="Select start date for filtering sale prices"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setCurrentPage(1);
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="End Date"
                  className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                  aria-label="Select end date for filtering sale prices"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="fuel-type-filter" className="block text-sm font-medium text-gray-800 mb-1">Fuel Type</label>
              <div className="relative">
                <select
                  id="fuel-type-filter"
                  value={selectedFuelType}
                  onChange={(e) => {
                    setSelectedFuelType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                    selectedFuelType ? 'border-blue-500' : 'border-gray-400'
                  }`}
                  aria-label="Filter sale prices by fuel type"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((fuelType) => (
                    <option key={fuelType.id} value={fuelType.id}>{fuelType.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
                aria-label="Reset all filters"
              >
                <X className="h-4 w-4 mr-2" /> Reset Filters
              </button>
            </div>
          </div>
          {(startDate || endDate || selectedFuelType) && (
            <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
              <span className="font-medium">Filtered by:</span>
              {(startDate || endDate) && (
                <button
                  onClick={() => removeFilter('date')}
                  className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
                >
                  Date: {startDate ? startDate.toLocaleDateString() : 'Any'} - {endDate ? endDate.toLocaleDateString() : 'Any'} <X className="ml-1 h-4 w-4" />
                </button>
              )}
              {selectedFuelType && (
                <button
                  onClick={() => removeFilter('fuelType')}
                  className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
                >
                  Fuel Type: {fuelTypes.find(fuelType => fuelType.id === parseInt(selectedFuelType))?.name} <X className="ml-1 h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sale Prices Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedSalePrices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No sale prices found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Sale Prices List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('start_date')} className="flex items-center">
                        Start Date
                        {sortConfig.key === 'start_date' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      End Date
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('sale_price')} className="flex items-center">
                        Sale Price
                        {sortConfig.key === 'sale_price' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Fuel Type
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSalePrices.map((salePrice, index) => (
                    <tr
                      key={salePrice.id}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-gray-100 transition-colors duration-150`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{new Date(salePrice.start_date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{salePrice.end_date ? new Date(salePrice.end_date).toLocaleDateString() : "Ongoing"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">${salePrice.sale_price}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{salePrice.fuel_type?.name || "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(salePrice)}
                            aria-label={`Edit sale price for ${salePrice.fuel_type?.name || "N/A"} starting on ${new Date(salePrice.start_date).toLocaleDateString()}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                            onClick={() => openDetailsModal(salePrice)}
                            aria-label={`View details of sale price for ${salePrice.fuel_type?.name || "N/A"} starting on ${new Date(salePrice.start_date).toLocaleDateString()}`}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteSalePrice(salePrice.id)}
                            aria-label={`Delete sale price for ${salePrice.fuel_type?.name || "N/A"} starting on ${new Date(salePrice.start_date).toLocaleDateString()}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button> */}
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card Layout for Smaller Screens */}
            <div className="block md:hidden space-y-4">
              {paginatedSalePrices.map((salePrice) => (
                <div key={salePrice.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{new Date(salePrice.start_date).toLocaleDateString()}</h3>
                      <p className="text-sm text-gray-600">End Date: {salePrice.end_date ? new Date(salePrice.end_date).toLocaleDateString() : "Ongoing"}</p>
                      <p className="text-sm text-gray-600">Sale Price: ${salePrice.sale_price}</p>
                      <p className="text-sm text-gray-600">Fuel Type: {salePrice.fuel_type?.name || "N/A"}</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEditModal(salePrice)}
                          aria-label={`Edit sale price for ${salePrice.fuel_type?.name || "N/A"} starting on ${new Date(salePrice.start_date).toLocaleDateString()}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          onClick={() => openDetailsModal(salePrice)}
                          aria-label={`View details of sale price for ${salePrice.fuel_type?.name || "N/A"} starting on ${new Date(salePrice.start_date).toLocaleDateString()}`}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeleteSalePrice(salePrice.id)}
                          aria-label={`Delete sale price for ${salePrice.fuel_type?.name || "N/A"} starting on ${new Date(salePrice.start_date).toLocaleDateString()}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSalePrices.length)} of {filteredSalePrices.length} sale prices
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
                    aria-label="Go to previous page"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
                    aria-label="Go to next page"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <SalePriceFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingSalePrice ? handleUpdateSalePrice : handleAddSalePrice}
        initialData={editingSalePrice}
      />

      {/* Sale Price Details Modal */}
      {isDetailsModalOpen && selectedSalePrice && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeDetailsModal()}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sale Price Details</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedSalePrice.id}</p>
              <p><strong>Start Date:</strong> {new Date(selectedSalePrice.start_date).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {selectedSalePrice.end_date ? new Date(selectedSalePrice.end_date).toLocaleDateString() : "Ongoing"}</p>
              <p><strong>Sale Price:</strong> ${selectedSalePrice.sale_price}</p>
              <p><strong>Fuel Type:</strong> {selectedSalePrice.fuel_type?.name || "N/A"}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition-colors duration-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SalePriceList;
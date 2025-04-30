// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';

// import StockEntryFormModal from './StockEntryFormModal'; 
// import tankApi from "../../services/api/tank/tankApi";
// import stockEntryApi from "../../services/api/stockEntry/stockEntryApi";

// const StockEntriesList = () => {
//   const [stockEntries, setStockEntries] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingEntry, setEditingEntry] = useState(null);

//   // Fetch stock entries
//   const fetchStockEntries = async () => {
//     setLoading(true);
//     try {
//       const { data } = await stockEntryApi.getAllStockEntries(); 
//       setStockEntries(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load stock entries. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchStockEntries();
//   }, []);

//   // Add new stock entry
//   const handleAddStockEntry = async (entry) => {

//     let {data} = await tankApi.getTank(entry.tank_id);
//     let tank = data.data;
//     tank.current_volume+=parseFloat(entry.quantity);
//     try {
//         await tankApi.updateTank(tank);
//           await stockEntryApi.addNewStockEntry(entry); 
//           fetchStockEntries();
//           toast.success("Stock entry added successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           toast.error(`Failed to add stock entry. ${err.response?.data?.message || "Please try again."}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       };


//   // Update stock entry
//   const handleUpdateStockEntry = async (entry) => {
//     let {data} = await tankApi.getTank(entry.tank_id);
//     let tank = data.data;

//     tank.current_volume= parseFloat(entry.previousVolume) + parseFloat(entry.quantity);
//     try {
//       await tankApi.updateTank(tank);
//       await stockEntryApi.updateStockEntry(entry); 
//       fetchStockEntries();
//       toast.success("Stock entry updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       toast.error(`Failed to update stock entry. ${err.response?.data?.message || "Please try again."}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // Delete stock entry
//   const handleDeleteStockEntry = async (entryId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await stockEntryApi.deleteStockEntry(entryId); 
//           fetchStockEntries();
//           toast.success("Stock entry deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           toast.error(`Failed to delete stock entry. ${err.response?.data?.message || "Please try again."}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   // Open edit modal
//   const openEditModal = (entry = null) => {
//     if(entry != null){
//         entry = {...entry,tank_id:entry.tank.id,fuel_type_id:entry.fuel_type.id,supplier_id:entry.supplier.id}
//     }
//     setEditingEntry(entry);
//     setIsEditModalOpen(true);
//   };

//   // Close edit modal
//   const closeEditModal = () => {
//     setEditingEntry(null);
//     setIsEditModalOpen(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="spinner-border text-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Stock Entries</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Stock Entry
//       </button>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Entry Date
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Quantity (L)
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Purchase Price (per L)
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Tank Name
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Fuel Type
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Supplier
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {stockEntries.map((entry) => (
//                 <tr key={entry.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{entry.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{entry.entry_date}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{entry.quantity}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">${entry.purchase_price}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{entry.tank?.name || "N/A"}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{entry.fuel_type?.name || "N/A"}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{entry.supplier?.name || "N/A"}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       onClick={() => openEditModal(entry)}
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-900"
//                       onClick={() => handleDeleteStockEntry(entry.id)}
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Stock Entry Form Modal */}
//       <StockEntryFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingEntry ? handleUpdateStockEntry : handleAddStockEntry}
//         initialData={editingEntry}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default StockEntriesList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronDown, X, Download, Filter } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tankApi from "../../services/api/tank/tankApi";
import stockEntryApi from "../../services/api/stockEntry/stockEntryApi";
import supplierApi from "../../services/api/supplier/supplierApi";
import StockEntryFormModal from './StockEntryFormModal';
import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";

const StockEntriesList = () => {
  const [stockEntries, setStockEntries] = useState([]);
  const [filteredStockEntries, setFilteredStockEntries] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTank, setSelectedTank] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [tanks, setTanks] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const itemsPerPage = 10;

  const fetchStockEntries = async () => {
    setLoading(true);
    try {
      const { data } = await stockEntryApi.getAllStockEntries();
      setStockEntries(data.data);
      setFilteredStockEntries(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load stock entries. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const fetchTanks = async () => {
    try {
      const { data } = await tankApi.getAllTanks();
      setTanks(data.data);
    } catch (err) {
      toast.error("Failed to load tanks. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

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

  const fetchSuppliers = async () => {
    try {
      const { data } = await supplierApi.getAllSuppliers();
      setSuppliers(data.data);
    } catch (err) {
      toast.error("Failed to load suppliers. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchStockEntries();
    fetchTanks();
    fetchFuelTypes();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    let filtered = stockEntries.filter(entry => {
      const dateMatch =
        (!startDate || new Date(entry.entry_date) >= startDate) &&
        (!endDate || new Date(entry.entry_date) <= endDate);
      const tankMatch = !selectedTank || entry.tank?.id === parseInt(selectedTank);
      const fuelTypeMatch = !selectedFuelType || entry.fuel_type?.id === parseInt(selectedFuelType);
      const supplierMatch = !selectedSupplier || entry.supplier?.id === parseInt(selectedSupplier);
      return dateMatch && tankMatch && fuelTypeMatch && supplierMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === 'entry_date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (sortConfig.key === 'tank') {
          aValue = a.tank?.name || '';
          bValue = b.tank?.name || '';
        } else if (sortConfig.key === 'quantity') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredStockEntries(filtered);
  }, [stockEntries, startDate, endDate, selectedTank, selectedFuelType, selectedSupplier, sortConfig]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredStockEntries.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (filteredStockEntries.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredStockEntries, currentPage, itemsPerPage]);

  const handleAddStockEntry = async (entry) => {
    try {
      const { data } = await tankApi.getTank(entry.tank_id);
      let tank = data.data;
      tank.current_volume += parseFloat(entry.quantity);
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

  const handleUpdateStockEntry = async (entry) => {
    try {
      const { data } = await tankApi.getTank(entry.tank_id);
      let tank = data.data;
      tank.current_volume = parseFloat(entry.previousVolume) + parseFloat(entry.quantity);
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

  const openEditModal = (entry = null) => {
    if (entry != null) {
      entry = { ...entry, tank_id: entry.tank.id, fuel_type_id: entry.fuel_type.id, supplier_id: entry.supplier.id };
    }
    setEditingEntry(entry);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingEntry(null);
    setIsEditModalOpen(false);
  };

  const openDetailsModal = (entry) => {
    setSelectedEntry(entry);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedEntry(null);
    setIsDetailsModalOpen(false);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedTank('');
    setSelectedFuelType('');
    setSelectedSupplier('');
    setCurrentPage(1);
    toast.info("Filters reset", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'date':
        setStartDate(null);
        setEndDate(null);
        break;
      case 'tank':
        setSelectedTank('');
        break;
      case 'fuelType':
        setSelectedFuelType('');
        break;
      case 'supplier':
        setSelectedSupplier('');
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredStockEntries.length / itemsPerPage);
  const paginatedStockEntries = filteredStockEntries.slice(
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
          <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Filter Stock Entries</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
              aria-label="Add a new stock entry"
            >
              <Plus className="h-5 w-5 mr-2" /> Add Stock Entry
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
                  aria-label="Select start date for filtering stock entries"
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
                  aria-label="Select end date for filtering stock entries"
                />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="tank-filter" className="block text-sm font-medium text-gray-800 mb-1">Tank</label>
              <div className="relative">
                <select
                  id="tank-filter"
                  value={selectedTank}
                  onChange={(e) => {
                    setSelectedTank(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                    selectedTank ? 'border-blue-500' : 'border-gray-400'
                  }`}
                  aria-label="Filter stock entries by tank"
                >
                  <option value="">All Tanks</option>
                  {tanks.map((tank) => (
                    <option key={tank.id} value={tank.id}>{tank.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
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
                  aria-label="Filter stock entries by fuel type"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((fuelType) => (
                    <option key={fuelType.id} value={fuelType.id}>{fuelType.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="supplier-filter" className="block text-sm font-medium text-gray-800 mb-1">Supplier</label>
              <div className="relative">
                <select
                  id="supplier-filter"
                  value={selectedSupplier}
                  onChange={(e) => {
                    setSelectedSupplier(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                    selectedSupplier ? 'border-blue-500' : 'border-gray-400'
                  }`}
                  aria-label="Filter stock entries by supplier"
                >
                  <option value="">All Suppliers</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
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
          {(startDate || endDate || selectedTank || selectedFuelType || selectedSupplier) && (
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
              {selectedTank && (
                <button
                  onClick={() => removeFilter('tank')}
                  className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
                >
                  Tank: {tanks.find(tank => tank.id === parseInt(selectedTank))?.name} <X className="ml-1 h-4 w-4" />
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
              {selectedSupplier && (
                <button
                  onClick={() => removeFilter('supplier')}
                  className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
                >
                  Supplier: {suppliers.find(supplier => supplier.id === parseInt(selectedSupplier))?.name} <X className="ml-1 h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedStockEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No stock entries found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Stock Entries List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('entry_date')} className="flex items-center">
                        Entry Date
                        {sortConfig.key === 'entry_date' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('tank')} className="flex items-center">
                        Tank Name
                        {sortConfig.key === 'tank' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Fuel Type
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Supplier
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('quantity')} className="flex items-center">
                        Quantity (L)
                        {sortConfig.key === 'quantity' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Purchase Price (per L)
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedStockEntries.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-gray-100 transition-colors duration-150`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{new Date(entry.entry_date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{entry.tank?.name || "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{entry.fuel_type?.name || "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{entry.supplier?.name || "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{entry.quantity}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">${entry.purchase_price}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(entry)}
                            aria-label={`Edit stock entry for ${entry.tank?.name || "N/A"} on ${new Date(entry.entry_date).toLocaleDateString()}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                            onClick={() => openDetailsModal(entry)}
                            aria-label={`View details of stock entry for ${entry.tank?.name || "N/A"} on ${new Date(entry.entry_date).toLocaleDateString()}`}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteStockEntry(entry.id)}
                            aria-label={`Delete stock entry for ${entry.tank?.name || "N/A"} on ${new Date(entry.entry_date).toLocaleDateString()}`}
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
              {paginatedStockEntries.map((entry) => (
                <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{new Date(entry.entry_date).toLocaleDateString()}</h3>
                      <p className="text-sm text-gray-600">Tank: {entry.tank?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">Fuel Type: {entry.fuel_type?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">Supplier: {entry.supplier?.name || "N/A"}</p>
                      <p className="text-sm text-gray-600">Quantity: {entry.quantity} L</p>
                      <p className="text-sm text-gray-600">Purchase Price: ${entry.purchase_price} per L</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEditModal(entry)}
                          aria-label={`Edit stock entry for ${entry.tank?.name || "N/A"} on ${new Date(entry.entry_date).toLocaleDateString()}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          onClick={() => openDetailsModal(entry)}
                          aria-label={`View details of stock entry for ${entry.tank?.name || "N/A"} on ${new Date(entry.entry_date).toLocaleDateString()}`}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeleteStockEntry(entry.id)}
                          aria-label={`Delete stock entry for ${entry.tank?.name || "N/A"} on ${new Date(entry.entry_date).toLocaleDateString()}`}
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStockEntries.length)} of {filteredStockEntries.length} stock entries
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

      <StockEntryFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingEntry ? handleUpdateStockEntry : handleAddStockEntry}
        initialData={editingEntry}
      />

      {/* Stock Entry Details Modal */}
      {isDetailsModalOpen && selectedEntry && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeDetailsModal()}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Entry Details</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedEntry.id}</p>
              <p><strong>Entry Date:</strong> {new Date(selectedEntry.entry_date).toLocaleDateString()}</p>
              <p><strong>Tank:</strong> {selectedEntry.tank?.name || "N/A"}</p>
              <p><strong>Fuel Type:</strong> {selectedEntry.fuel_type?.name || "N/A"}</p>
              <p><strong>Supplier:</strong> {selectedEntry.supplier?.name || "N/A"}</p>
              <p><strong>Quantity:</strong> {selectedEntry.quantity} L</p>
              <p><strong>Purchase Price:</strong> ${selectedEntry.purchase_price} per L</p>
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

export default StockEntriesList;
// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import meterReadingApi from "../../services/api/meterReading/meterReadingApi";


// const MeterReadingsList = () => {
//   const [meterReadings, setMeterReadings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch meter readings
//   const fetchMeterReadings = async () => {
//     setLoading(true);
//     try {
//       const { data } = await meterReadingApi.getAllMeterReadings(); 
//       setMeterReadings(data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load meter readings. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchMeterReadings();
//   }, []);

//   // Add a new meter reading
//   const handleAddMeterReading = async (meterReading) => {
//     try {
//       await meterReadingApi.addMeterReading(meterReading); 
//       fetchMeterReadings();
//       toast.success("Meter reading added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add meter reading. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // Update a meter reading
//   const handleUpdateMeterReading = async (meterReading) => {
//     try {
//       await meterReadingApi.updateMeterReading(meterReading); 
//       fetchMeterReadings();
//       toast.success("Meter reading updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update meter reading. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // Delete a meter reading
//   const handleDeleteMeterReading = async (meterReadingId) => {
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
//           await meterReadingApi.deleteMeterReading(meterReadingId); 
//           fetchMeterReadings();
//           toast.success("Meter reading deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete meter reading. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="looping-rhombuses-spinner">
//         <div className="rhombus"></div>
//         <div className="rhombus"></div>
//         <div className="rhombus"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {/* <h1 className="text-3xl font-bold mb-6">Meter Readings</h1> */}
   
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Pump Number
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Initial Reading
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Final Reading
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {meterReadings.length === 0 ? (
//           // Empty state
//           <div className="text-center py-12">
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 17v-2m0 0V9m0 8H5m4 0h4m4 0v-2m0 0V9m0 8h4m-4-8V5m0 4V5m0 4h4m-4 4h4"
//               />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No meter readings found</h3>
//             {/* <p className="mt-1 text-sm text-gray-500">
//               Get started by adding a new meter reading.
//             </p>
//             <div className="mt-6">
//               <button
//                 // onClick={() => openEditModal()}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Add Meter Reading
//               </button>
//             </div> */}
//           </div>): (meterReadings.map((meterReading) => (
//                 <tr key={meterReading.id}>
//                           <td className="px-6 py-4 whitespace-nowrap">{meterReading.pump.code}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{meterReading.initial_reading}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{meterReading.final_reading|| "N/A"} </td>
//                 </tr>
//               )))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default MeterReadingsList;

// <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
// <div className="flex justify-between items-center mb-4">
//   <h2 className="text-xl font-semibold text-gray-800">Search Meter Readings</h2>
//   <button
//     onClick={() => {/* Implement openAddModal */}}
//     onKeyDown={(e) => e.key === 'Enter' && {/* Implement openAddModal */}}
//     className='mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
//     aria-label="Add a new meter reading"
//   >
//     <Plus className="h-5 w-5 mr-2" /> Add Meter Reading
//   </button>
// </div>
// <div className="relative max-w-md">
//   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//     <Search className="h-5 w-5 text-gray-400" />
//   </div>
//   <input
//     type="text"
//     // value={searchTerm}
//     // onChange={(e) => setSearchTerm(e.target.value)}
//     placeholder="Search by pump code..."
//     className="pl-10 pr-10 py-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//     aria-label="Search meter readings by pump code"
//   />
//   {/* {searchTerm && (
//     <button
//       onClick={handleSearchClear}
//       // onKeyDown={(e) => e.key === 'Enter' && handleSearchClear()}
//       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
//       aria-label="Clear search"
//     >
//       <X className="h-5 w-5" />
//     </button>
//   )} */}
// </div>
// </div>
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import meterReadingApi from "../../services/api/meterReading/meterReadingApi";

// Constants for error messages
const ERROR_MESSAGES = {
  LOAD_METER_READINGS: "Failed to load meter readings. Please try again.",
  ADD_METER_READING: "Failed to add meter reading.",
  UPDATE_METER_READING: "Failed to update meter reading.",
  DELETE_METER_READING: "Failed to delete meter reading.",
};

const MeterReadingsList = () => {
  const [meterReadings, setMeterReadings] = useState([]);
  const [filteredMeterReadings, setFilteredMeterReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPump, setSelectedPump] = useState(''); // State for pump filter
  const [pumps, setPumps] = useState([]); // State for unique pumps
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch meter readings
  const fetchMeterReadings = async () => {
    setLoading(true);
    try {
      const { data } = await meterReadingApi.getAllMeterReadings();
      const meterReadingsData = data;
      setMeterReadings(meterReadingsData);
      setFilteredMeterReadings(meterReadingsData);

      // Extract unique pumps
      const uniquePumps = [...new Set(meterReadingsData.map(reading => reading.pump?.code).filter(code => code))];
      setPumps(uniquePumps);

      setLoading(false);
    } catch (err) {
      toast.error(ERROR_MESSAGES.LOAD_METER_READINGS, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeterReadings();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let filtered = meterReadings.filter(reading => {
      const pumpMatch = !selectedPump || reading.pump?.code === selectedPump;
      return pumpMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'pump') {
          aValue = a.pump?.code?.toLowerCase() || '';
          bValue = b.pump?.code?.toLowerCase() || '';
        } else if (sortConfig.key === 'initial_reading' || sortConfig.key === 'final_reading') {
          aValue = parseFloat(a[sortConfig.key]) || 0;
          bValue = parseFloat(b[sortConfig.key]) || 0;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredMeterReadings(filtered);
  }, [meterReadings, selectedPump, sortConfig]);

  // Handle pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredMeterReadings.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (filteredMeterReadings.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredMeterReadings, currentPage, itemsPerPage]);

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
      toast.error(`${ERROR_MESSAGES.ADD_METER_READING} ${err.response?.data?.message || "Please try again."}`, {
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
      toast.error(`${ERROR_MESSAGES.UPDATE_METER_READING} ${err.response?.data?.message || "Please try again."}`, {
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
          toast.error(`${ERROR_MESSAGES.DELETE_METER_READING} ${err.response?.data?.message || "Please try again."}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  // Sorting handler
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // Reset filter
  const resetFilters = () => {
    setSelectedPump('');
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'asc' });
    toast.info("Filters reset", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFilter = (filterType) => {
    if (filterType === 'pump') {
      setSelectedPump('');
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredMeterReadings.length / itemsPerPage);
  const paginatedMeterReadings = filteredMeterReadings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div className="container mx-auto p-6">
      {/* Filters and Actions */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Meter Readings</h2>
          {/* Placeholder for Add Meter Reading button (uncomment when modal is implemented) */}
          {/* <button
            onClick={() => openEditModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
            aria-label="Add a new meter reading"
          >
            <Plus className="h-5 w-5 mr-2" /> Add Meter Reading
          </button> */}
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="pump-filter" className="block text-sm font-medium text-gray-800 mb-1">Pump</label>
            <div className="relative">
              <select
                id="pump-filter"
                value={selectedPump}
                onChange={(e) => {
                  setSelectedPump(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedPump ? 'border-blue-500' : 'border-gray-400'
                }`}
                aria-label="Filter meter readings by pump"
              >
                <option value="">All Pumps</option>
                {pumps.map((pump) => (
                  <option key={pump} value={pump}>{pump}</option>
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
        {selectedPump && (
          <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
            <span className="font-medium">Filtered by:</span>
            <button
              onClick={() => removeFilter('pump')}
              className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
            >
              Pump: {selectedPump} <X className="ml-1 h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedMeterReadings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No meter readings found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Meter Readings List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('pump')} className="flex items-center">
                        Pump Number
                        {sortConfig.key === 'pump' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('initial_reading')} className="flex items-center">
                        Initial Reading
                        {sortConfig.key === 'initial_reading' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('final_reading')} className="flex items-center">
                        Final Reading
                        {sortConfig.key === 'final_reading' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedMeterReadings.map((meterReading) => (
                    <tr key={meterReading.id} className="hover:bg-gray-100 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{meterReading.pump?.code || 'N/A'}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{meterReading.initial_reading}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{meterReading.final_reading || "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            // onClick={() => openEditModal(meterReading)}
                            aria-label={`Edit meter reading for pump ${meterReading.pump?.code}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                            // onClick={() => openDetailsModal(meterReading)}
                            aria-label={`View details of meter reading for pump ${meterReading.pump?.code}`}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteMeterReading(meterReading.id)}
                            aria-label={`Delete meter reading for pump ${meterReading.pump?.code}`}
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
              {paginatedMeterReadings.map((meterReading) => (
                <div key={meterReading.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Pump: {meterReading.pump?.code || 'N/A'}</h3>
                      <p className="text-sm text-gray-600">Initial Reading: {meterReading.initial_reading}</p>
                      <p className="text-sm text-gray-600">Final Reading: {meterReading.final_reading || 'N/A'}</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          // onClick={() => openEditModal(meterReading)}
                          aria-label={`Edit meter reading for pump ${meterReading.pump?.code}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          // onClick={() => openDetailsModal(meterReading)}
                          aria-label={`View details of meter reading for pump ${meterReading.pump?.code}`}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeleteMeterReading(meterReading.id)}
                          aria-label={`Delete meter reading for pump ${meterReading.pump?.code}`}
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredMeterReadings.length)} of {filteredMeterReadings.length} meter readings
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

      <ToastContainer />
    </div>
  );
};

export default MeterReadingsList;
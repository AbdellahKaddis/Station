// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import pumpApi from "../../services/api/pump/pumpApi"; 
// import PumpFormModal from "./PumpFormModal"; 
// import PumpDetailsModal from "./PumpDetailsModal";
// import meterReadingApi from "../../services/api/meterReading/meterReadingApi.js";
// const PumpList = () => {
//   const [pumps, setPumps] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
//   const [loading, setLoading] = useState(true);
//   const [editingPump, setEditingPump] = useState(null);
//   const [selectedPump, setSelectedPump] = useState(null); 

//   const fetchPumps = async () => {
//     setLoading(true);
//     try {
//       const { data } = await pumpApi.getAllPumps(); 
//       setPumps(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load pumps list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchPumps();
//   }, []);
//   const addMeterReading = async (meterReading) => {
//     try {
//       await meterReadingApi.addMeterReading(meterReading); 
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
//   const handleAddPump = async (pump) => {
//     try {
//       const {data}=await pumpApi.addNewPump(pump); 
//       fetchPumps();

//       const newMeterReading = {
//         initial_reading:0,
//         final_reading:null,
//         pump_id: data.data.id
//       };
  
//       addMeterReading(newMeterReading);
//       toast.success("Pump added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add pump. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdatePump = async (pump) => {
//     try {
//       await pumpApi.updatePump(pump); 
//       fetchPumps();
//       toast.success("Pump updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update pump. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };


//   const handleDeletePump = async (pumpId) => {
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
//           await pumpApi.deletePump(pumpId); 
//           fetchPumps();
//           toast.success("Pump deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete pump. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };


//   const openEditModal = (pump = null) => {
//     if (pump !== null) {
//       pump = { ...pump, tank_id: pump.tank.id }; 
//     }
//     setEditingPump(pump);
//     setIsEditModalOpen(true);
//   };

//   const openDetailsModal = (station) => {
//     setSelectedPump(station);
//     setIsDetailsModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditingPump(null);
//     setIsEditModalOpen(false);
//   };
//   const closeDetailsModal = () => {
//     setSelectedPump(null);
//     setIsDetailsModalOpen(false);
//   };
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
//       <h1 className="text-3xl font-bold mb-6">Pumps</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Pump
//       </button>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Pump Number
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Flow Rate (L/min)
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Tank Name
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Fuel Type
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Station Name
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {pumps.map((pump) => (
//                 <tr key={pump.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{pump.code}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 ${
//                         pump.statuts === "active"
//                           ? "bg-green-100 text-green-800"
//                           : pump.statuts === "under_maintenance"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-red-100 text-red-800"
//                       } rounded-full text-sm`}
//                     >
//                       {pump.statuts}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{pump.flow} L</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{pump.tank.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{pump.tank.fuel_type.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{pump.tank.station.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       onClick={() => openEditModal(pump)}
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-900"
//                       onClick={() => handleDeletePump(pump.id)}
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                      <button className="text-gray-600 hover:text-orange-900 cursor-pointer">
//                         <Eye className="h-5 w-5" onClick={() => openDetailsModal(pump)} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pump Form Modal */}
//       <PumpFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingPump ? handleUpdatePump : handleAddPump}
//         initialData={editingPump}
//       />

//         <PumpDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={closeDetailsModal}
//         pump={selectedPump}
//         />

//       <ToastContainer />
//     </div>
//   );
// };

// export default PumpList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import pumpApi from "../../services/api/pump/pumpApi";
import PumpFormModal from "./PumpFormModal";
import PumpDetailsModal from "./PumpDetailsModal";
import meterReadingApi from "../../services/api/meterReading/meterReadingApi.js";

const PumpList = () => {
  const [pumps, setPumps] = useState([]);
  const [filteredPumps, setFilteredPumps] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingPump, setEditingPump] = useState(null);
  const [selectedPump, setSelectedPump] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [selectedTank, setSelectedTank] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [stations, setStations] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPumps = async () => {
    setLoading(true);
    try {
      const { data } = await pumpApi.getAllPumps();
      const pumpData = data.data;
      setPumps(pumpData);
      setFilteredPumps(pumpData);

      const uniqueStations = [...new Set(pumpData.map(pump => pump.tank.station.name))];
      const uniqueTanks = [...new Set(pumpData.map(pump => pump.tank.name))];
      const uniqueFuelTypes = [...new Set(pumpData.map(pump => pump.tank.fuel_type.name))];
      const uniqueStatuses = [...new Set(pumpData.map(pump => pump.statuts))];
      setStations(uniqueStations);
      setTanks(uniqueTanks);
      setFuelTypes(uniqueFuelTypes);
      setStatuses(uniqueStatuses);

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

  useEffect(() => {
    let filtered = pumps.filter(pump => {
      const searchMatch =
        !searchQuery ||
        pump.code.toLowerCase().includes(searchQuery.toLowerCase());
      const stationMatch = !selectedStation || pump.tank.station.name === selectedStation;
      const tankMatch = !selectedTank || pump.tank.name === selectedTank;
      const fuelTypeMatch = !selectedFuelType || pump.tank.fuel_type.name === selectedFuelType;
      const statusMatch = !selectedStatus || pump.statuts === selectedStatus;
      return searchMatch && stationMatch && tankMatch && fuelTypeMatch && statusMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'code') {
          aValue = a.code.toLowerCase();
          bValue = b.code.toLowerCase();
        } else if (sortConfig.key === 'station_name') {
          aValue = a.tank.station.name.toLowerCase();
          bValue = b.tank.station.name.toLowerCase();
        } else if (sortConfig.key === 'tank_name') {
          aValue = a.tank.name.toLowerCase();
          bValue = b.tank.name.toLowerCase();
        } else if (sortConfig.key === 'fuel_type') {
          aValue = a.tank.fuel_type.name.toLowerCase();
          bValue = b.tank.fuel_type.name.toLowerCase();
        } else if (sortConfig.key === 'statuts') {
          aValue = a.statuts.toLowerCase();
          bValue = b.statuts.toLowerCase();
        } else if (sortConfig.key === 'flow') {
          aValue = parseFloat(a.flow);
          bValue = parseFloat(b.flow);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredPumps(filtered);
  }, [pumps, searchQuery, selectedStation, selectedTank, selectedFuelType, selectedStatus, sortConfig]);

  const addMeterReading = async (meterReading) => {
    try {
      await meterReadingApi.addMeterReading(meterReading);
      // toast.success("Meter reading added successfully!", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   theme: "colored",
      // });
    } catch (err) {
      console.log(err);
      toast.error(`Failed to add meter reading. ${err.response?.data?.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleAddPump = async (pump) => {
    try {
      const { data } = await pumpApi.addNewPump(pump);
      fetchPumps();

      const newMeterReading = {
        initial_reading: 0,
        final_reading: null,
        pump_id: data.data.id,
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
      toast.error(`Failed to add pump. ${err.response?.data?.message}`, {
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
      toast.error(`Failed to update pump. ${err.response?.data?.message}`, {
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
          toast.error(`Failed to delete pump. ${err.response?.data?.message}`, {
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

  const openDetailsModal = (pump) => {
    setSelectedPump(pump);
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

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStation('');
    setSelectedTank('');
    setSelectedFuelType('');
    setSelectedStatus('');
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'asc' });
    toast.info("Filters reset", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search':
        setSearchQuery('');
        break;
      case 'station':
        setSelectedStation('');
        break;
      case 'tank':
        setSelectedTank('');
        break;
      case 'fuelType':
        setSelectedFuelType('');
        break;
      case 'status':
        setSelectedStatus('');
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPumps.length / itemsPerPage);
  const paginatedPumps = filteredPumps.slice(
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
      {/* Filters and Actions */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Pumps</h2>
          <button
            onClick={() => openEditModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
            aria-label="Add a new pump"
          >
            <Plus className="inline-block mr-2 h-5 w-5" /> Add Pump
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-pump" className="block text-sm font-medium text-gray-800 mb-1">Search Pumps</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-pump"
                type="text"
                placeholder="Search by pump number..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="station-filter" className="block text-sm font-medium text-gray-800 mb-1">Station</label>
            <div className="relative">
              <select
                id="station-filter"
                value={selectedStation}
                onChange={(e) => {
                  setSelectedStation(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedStation ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                <option value="">All Stations</option>
                {stations.map((station) => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
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
              >
                <option value="">All Tanks</option>
                {tanks.map((tank) => (
                  <option key={tank} value={tank}>{tank}</option>
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
              >
                <option value="">All Fuel Types</option>
                {fuelTypes.map((fuelType) => (
                  <option key={fuelType} value={fuelType}>{fuelType}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-800 mb-1">Status</label>
            <div className="relative">
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedStatus ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" /> Reset Filters
            </button>
          </div>
        </div>
        {(searchQuery || selectedStation || selectedTank || selectedFuelType || selectedStatus) && (
          <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
            <span className="font-medium">Filtered by:</span>
            {searchQuery && (
              <button
                onClick={() => removeFilter('search')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Search: "{searchQuery}" <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedStation && (
              <button
                onClick={() => removeFilter('station')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Station: {selectedStation} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedTank && (
              <button
                onClick={() => removeFilter('tank')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Tank: {selectedTank} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedFuelType && (
              <button
                onClick={() => removeFilter('fuelType')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Fuel Type: {selectedFuelType} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedStatus && (
              <button
                onClick={() => removeFilter('status')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Status: {selectedStatus} <X className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedPumps.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pumps found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Pumps List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('code')} className="flex items-center">
                        Pump Number
                        {sortConfig.key === 'code' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('station_name')} className="flex items-center">
                        Station Name
                        {sortConfig.key === 'station_name' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('tank_name')} className="flex items-center">
                        Tank Name
                        {sortConfig.key === 'tank_name' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('fuel_type')} className="flex items-center">
                        Fuel Type
                        {sortConfig.key === 'fuel_type' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('statuts')} className="flex items-center">
                        Status
                        {sortConfig.key === 'statuts' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('flow')} className="flex items-center">
                        Flow Rate (L/min)
                        {sortConfig.key === 'flow' && (
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
                  {paginatedPumps.map((pump) => (
                    <tr key={pump.id} className="hover:bg-gray-100 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{pump.code}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{pump.tank.station.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{pump.tank.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{pump.tank.fuel_type.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="relative group">
                          <span
                            className={`px-2 py-1 ${
                              pump.statuts === "active"
                                ? "bg-green-200 text-green-800"
                                : pump.statuts === "under_maintenance"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                            } rounded-full text-sm font-medium`}
                          >
                            {pump.statuts}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{pump.flow}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(pump)}
                            aria-label={`Edit pump ${pump.code}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeletePump(pump.id)}
                            aria-label={`Delete pump ${pump.code}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button> */}
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                            onClick={() => openDetailsModal(pump)}
                            aria-label={`View details of pump ${pump.code}`}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card Layout for Smaller Screens */}
            <div className="block md:hidden space-y-4">
              {paginatedPumps.map((pump) => (
                <div key={pump.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{pump.code}</h3>
                      <p className="text-sm text-gray-600">Station: {pump.tank.station.name}</p>
                      <p className="text-sm text-gray-600">Tank: {pump.tank.name}</p>
                      <p className="text-sm text-gray-600">Fuel Type: {pump.tank.fuel_type.name}</p>
                      <p className="text-sm text-gray-600">
                        Status: 
                        <span
                          className={`ml-1 ${
                            pump.statuts === "active"
                              ? "text-green-800"
                              : pump.statuts === "under_maintenance"
                              ? "text-yellow-800"
                              : "text-red-800"
                          }`}
                        >
                          {pump.statuts}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">Flow Rate: {pump.flow} L/min</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEditModal(pump)}
                          aria-label={`Edit pump ${pump.code}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeletePump(pump.id)}
                          aria-label={`Delete pump ${pump.code}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          onClick={() => openDetailsModal(pump)}
                          aria-label={`View details of pump ${pump.code}`}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPumps.length)} of {filteredPumps.length} pumps
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
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
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

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
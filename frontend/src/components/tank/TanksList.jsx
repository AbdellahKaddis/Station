// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import tankApi from "../../services/api/tank/tankApi"; 
// import TankFormModal from "./TankFormModal";

// const TanksList = () => {
//   const [tanks, setTanks] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingTank, setEditingTank] = useState(null);

//   const fetchTanks = async () => {
//     setLoading(true);
//     try {
//       const { data } = await tankApi.getAllTanks(); 
//       setTanks(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load tanks list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchTanks();
//   }, []);

//   const handleAddTank = async (tank) => {
//     try {
//       await tankApi.addNewTank(tank); 
//       fetchTanks();
//       toast.success("Tank added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         // hideProgressBar: false,
//         // closeOnClick: true,
//         // pauseOnHover: true,
//         // draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add tank. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdateTank = async (tank) => {
//     try {
//       await tankApi.updateTank(tank); 
//       fetchTanks();
//       toast.success("Tank updated successfully!", {
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
//       toast.error(`Failed to update tank. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeleteTank = async (tankId) => {
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
//           await tankApi.deleteTank(tankId); 
//           fetchTanks();
//           toast.success("Tank deleted successfully!", {
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
//           toast.error(`Failed to delete tank. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (tank = null) => {
//     if(tank !==null)
//     {
//         tank = {...tank,fuel_type_id:tank.fuel_type.id,station_id:tank.station.id}
//     }
//     setEditingTank(tank);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditingTank(null);
//     setIsEditModalOpen(false);
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
//       <h1 className="text-3xl font-bold mb-6">Tanks</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Tank
//       </button>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//         Tank Name
//       </th>
//         <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//         Fuel Type
//       </th>
//       <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//         Capacity (L)
//       </th>
//       <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//         Current Volume (L)
//       </th>
//       <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//         Station Name
//       </th>
//       <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//         Actions
//       </th>

//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {tanks.map((tank) => (

//                   <tr key={tank.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">{tank.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{tank.fuel_type.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{tank.capacity} L</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{tank.current_volume} L</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{tank.station.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                       <button
//                         className="text-indigo-600 hover:text-indigo-900"
//                         onClick={() => openEditModal(tank)}
//                       >
//                         <Edit className="h-5 w-5" />
//                       </button>
//                       <button
//                         className="text-red-600 hover:text-red-900"
//                         onClick={() => handleDeleteTank(tank.id)}
//                       >
//                         <Trash2 className="h-5 w-5" />
//                       </button>
//                      </td>
//                     </tr>
                    
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <TankFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingTank ? handleUpdateTank : handleAddTank}
//         initialData={editingTank}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default TanksList;
import React, { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, Search, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import tankApi from "../../services/api/tank/tankApi";
import TankFormModal from "./TankFormModal";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TanksList = () => {
  const [tanks, setTanks] = useState([]);
  const [filteredTanks, setFilteredTanks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingTank, setEditingTank] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [fuelTypes, setFuelTypes] = useState([]);
  const [stations, setStations] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const itemsPerPage = 10;
  const tableRef = useRef(null);

  // Fetch tanks
  const fetchTanks = async () => {
    setLoading(true);
    try {
      const { data } = await tankApi.getAllTanks();
      const tankData = data.data;
      setTanks(tankData);
      setFilteredTanks(tankData);

      const uniqueFuelTypes = [...new Set(tankData.map(tank => tank.fuel_type.name))];
      const uniqueStations = [...new Set(tankData.map(tank => tank.station.name))];
      setFuelTypes(uniqueFuelTypes);
      setStations(uniqueStations);

      setLoading(false);
    } catch (err) {
      toast.error("Failed to load tanks list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTanks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExportDropdown && !event.target.closest('.export-dropdown')) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showExportDropdown]);

  // Filter and sort tanks
  useEffect(() => {
    let filtered = tanks.filter(tank => {
      const searchMatch =
        !searchQuery ||
        tank.name.toLowerCase().includes(searchQuery.toLowerCase());
      const fuelTypeMatch = !selectedFuelType || tank.fuel_type.name === selectedFuelType;
      const stationMatch = !selectedStation || tank.station.name === selectedStation;
      return searchMatch && fuelTypeMatch && stationMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'station_name') {
          aValue = a.station.name.toLowerCase();
          bValue = b.station.name.toLowerCase();
        } else if (sortConfig.key === 'fuel_type') {
          aValue = a.fuel_type.name.toLowerCase();
          bValue = b.fuel_type.name.toLowerCase();
        } else if (sortConfig.key === 'name') {
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
        } else if (sortConfig.key === 'capacity' || sortConfig.key === 'current_volume') {
          aValue = parseFloat(a[sortConfig.key]);
          bValue = parseFloat(b[sortConfig.key]);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredTanks(filtered);
  }, [tanks, searchQuery, selectedFuelType, selectedStation, sortConfig]);

  const handleAddTank = async (tank) => {
    try {
      await tankApi.addNewTank(tank);
      fetchTanks();
      toast.success("Tank added successfully!", {
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
      toast.error(`Failed to add tank. ${err.response?.data?.message || err.message}`, {
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
      toast.error(`Failed to update tank. ${err.response?.data?.message || err.message}`, {
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
          toast.error(`Failed to delete tank. ${err.response?.data?.message || err.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (tank = null) => {
    if (tank !== null) {
      tank = { ...tank, fuel_type_id: tank.fuel_type.id, station_id: tank.station.id };
    }
    setEditingTank(tank);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingTank(null);
    setIsEditModalOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFuelType('');
    setSelectedStation('');
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
      case 'fuelType':
        setSelectedFuelType('');
        break;
      case 'station':
        setSelectedStation('');
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  // Sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportData = filteredTanks.map(tank => ({
      Tank_Name: tank.name,
      Station_Name: tank.station.name,
      Fuel_Type: tank.fuel_type.name,
      Capacity_L: tank.capacity,
      Current_Volume_L: tank.current_volume,
      Percentage_Full: ((tank.current_volume / tank.capacity) * 100).toFixed(1) + '%',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tanks");
    XLSX.writeFile(wb, "tanks.xlsx");
    toast.success("Exported to Excel successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
    setShowExportDropdown(false);
  };

  // Export to PDF
  const exportToPDF = async () => {
    const table = tableRef.current;
    if (!table) return;

    try {
      const canvas = await html2canvas(table, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('tanks.pdf');
      toast.success("Exported to PDF successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (err) {
      toast.error("Failed to export to PDF.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
    setShowExportDropdown(false);
  };

  // Pagination
  const totalPages = Math.ceil(filteredTanks.length / itemsPerPage);
  const paginatedTanks = filteredTanks.slice(
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
      {/* Filters */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Tanks</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => openEditModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
              aria-label="Add a new tank"
            >
              <Plus className="inline-block mr-2 h-5 w-5" /> Add Tank
            </button>
            <div className="relative export-dropdown">
              <button
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
                aria-label="Export options"
                aria-expanded={showExportDropdown}
              >
                <Download className="h-5 w-5 mr-2" /> Export
              </button>
              {showExportDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <button
                    onClick={exportToExcel}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    Export to Excel
                  </button>
                  <button
                    onClick={exportToPDF}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    Export to PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-tank" className="block text-sm font-medium text-gray-800 mb-1">Search Tanks</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-tank"
                type="text"
                placeholder="Search by tank name..."
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
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" /> Reset Filters
            </button>
          </div>
        </div>
        {(searchQuery || selectedFuelType || selectedStation) && (
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
            {selectedFuelType && (
              <button
                onClick={() => removeFilter('fuelType')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Fuel Type: {selectedFuelType} <X className="ml-1 h-4 w-4" />
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
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedTanks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tanks found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full" ref={tableRef}>
                <caption className="sr-only">Tanks List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('name')} className="flex items-center">
                        Tank Name
                        {sortConfig.key === 'name' && (
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
                      <button onClick={() => handleSort('fuel_type')} className="flex items-center">
                        Fuel Type
                        {sortConfig.key === 'fuel_type' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('capacity')} className="flex items-center">
                        Capacity (L)
                        {sortConfig.key === 'capacity' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('current_volume')} className="flex items-center">
                        Current Volume (L)
                        {sortConfig.key === 'current_volume' && (
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
                  {paginatedTanks.map((tank) => {
                    const percentage = (tank.current_volume / tank.capacity) * 100;
                    const isLow = percentage < 10;
                    return (
                      <tr key={tank.id} className="hover:bg-gray-100 transition-colors duration-150">
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{tank.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{tank.station.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{tank.fuel_type.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{tank.capacity}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <span className={isLow ? 'text-red-600 font-semibold' : 'text-gray-800'}>
                              {tank.current_volume} ({percentage.toFixed(1)}%)
                            </span>
                            <div className="w-24 bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${isLow ? 'bg-red-600' : 'bg-blue-500'}`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                          <div className="relative group">
                            <button
                              className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                              onClick={() => openEditModal(tank)}
                              aria-label={`Edit tank ${tank.name}`}
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                          </div>
                          <div className="relative group">
                            {/* <button
                              className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                              onClick={() => handleDeleteTank(tank.id)}
                              aria-label={`Delete tank ${tank.name}`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button> */}
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Card Layout for Smaller Screens */}
            <div className="block md:hidden space-y-4">
              {paginatedTanks.map((tank) => {
                const percentage = (tank.current_volume / tank.capacity) * 100;
                const isLow = percentage < 10;
                return (
                  <div key={tank.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{tank.name}</h3>
                        <p className="text-sm text-gray-600">Station: {tank.station.name}</p>
                        <p className="text-sm text-gray-600">Fuel Type: {tank.fuel_type.name}</p>
                        <p className="text-sm text-gray-600">Capacity: {tank.capacity} L</p>
                        <div className="text-sm text-gray-600">
                          Current Volume: 
                          <span className={isLow ? 'text-red-600 font-semibold' : ''}>
                            {' '}{tank.current_volume} L ({percentage.toFixed(1)}%)
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2.5 mt-1">
                            <div
                              className={`h-2.5 rounded-full ${isLow ? 'bg-red-600' : 'bg-blue-500'}`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(tank)}
                            aria-label={`Edit tank ${tank.name}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteTank(tank.id)}
                            aria-label={`Delete tank ${tank.name}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTanks.length)} of {filteredTanks.length} tanks
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
// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import StationFormModal from "./StationFormModal";
// import StationDetailsModal from "./StationDetailsModal"; 
// import stationApi from "../../services/api/station/stationApi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';

// const StationList = () => {
//   const [stations, setStations] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
//   const [loading, setLoading] = useState(true);
//   const [editingStation, setEditingStation] = useState(null);
//   const [selectedStation, setSelectedStation] = useState(null); 

//   const fetchStations = async () => {
//     setLoading(true);
//     try {
//       const response = await stationApi.getAllStations();
//       setStations(response.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load stations list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchStations();
//   }, []);

//   const handleAddStation = async (station) => {
//     try {
//       await stationApi.addNewStation(station);
//       fetchStations();
//       toast.success("Station added successfully!", {
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
//       toast.error(`Failed to add station. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdateStation = async (station) => {
//     try {
//       await stationApi.updateStation(station);
//       fetchStations();
//       toast.success("Station updated successfully!", {
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
//       toast.error(`Failed to update station. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeleteStation = async (stationId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await stationApi.deleteStation(stationId);
//           fetchStations();
//           toast.success("Station deleted successfully!", {
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
//           toast.error(`Failed to delete station. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openModal = (station = null) => {
//     let formattedStation = null;
//     if (station) {
//       const formatttedOpeningHours = station.opening_hours.map((opening_hour) => {
//         return {
//           ...opening_hour,
//           opening_time: opening_hour.opening_time.slice(0, 5),
//           closing_time: opening_hour.closing_time.slice(0, 5)
//         }
//       });
//       formattedStation = { ...station, opening_hours: formatttedOpeningHours }
//     }
//     setEditingStation(formattedStation);
//     setIsModalOpen(true);
//   };

//   const openDetailsModal = (station) => {
//     setSelectedStation(station);
//     setIsDetailsModalOpen(true);
//   };

//   const closeModal = () => {
//     setEditingStation(null);
//     setIsModalOpen(false);
//   };

//   const closeDetailsModal = () => {
//     setSelectedStation(null);
//     setIsDetailsModalOpen(false);
//   };

//   if (loading) {
//     return <div className="looping-rhombuses-spinner">
//       <div className="rhombus"></div>
//       <div className="rhombus"></div>
//       <div className="rhombus"></div>
//     </div>
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Stations</h1>
//       <button
//         onClick={() => openModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Station
//       </button>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6">Stations</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   City
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {stations.map((station) => (
//                 <tr key={station.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{station.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{station.address}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{station.city}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 py-1  ${station.status === 'active' ? `bg-green-100 text-green-800` : `bg-red-100 text-red-800`} rounded-full text-sm`}>
//                       {station.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button className="text-indigo-600 hover:text-indigo-900">
//                       <Edit className="h-5 w-5" onClick={() => openModal(station)} />
//                     </button>
//                     <button className="text-red-600 hover:text-red-900">
//                       <Trash2 className="h-5 w-5" onClick={() => handleDeleteStation(station.id)} />
//                     </button>
//                     <button className="text-gray-600 hover:text-orange-900 cursor-pointer">
//                       <Eye className="h-5 w-5" onClick={() => openDetailsModal(station)} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <StationFormModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSubmit={editingStation ? handleUpdateStation : handleAddStation}
//         initialData={editingStation}
//       />

//       <StationDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={closeDetailsModal}
//         station={selectedStation}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default StationList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import StationFormModal from "./StationFormModal";
import StationDetailsModal from "./StationDetailsModal";
import stationApi from "../../services/api/station/stationApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

const StationList = () => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingStation, setEditingStation] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [cities, setCities] = useState([]);
  const [statuses] = useState(['active', 'inactive']);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch stations
  const fetchStations = async () => {
    setLoading(true);
    try {
      const response = await stationApi.getAllStations();
      const data = response.data;
      setStations(data);
      setFilteredStations(data);

      const uniqueCities = [...new Set(data.map(station => station.city))];
      setCities(uniqueCities);

      setLoading(false);
    } catch (err) {
      toast.error("Failed to load stations list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  // Filter and sort stations
  useEffect(() => {
    let filtered = stations.filter(station => {
      const searchMatch =
        !searchQuery ||
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.address.toLowerCase().includes(searchQuery.toLowerCase());
      const cityMatch = !selectedCity || station.city === selectedCity;
      const statusMatch = !selectedStatus || station.status === selectedStatus;
      return searchMatch && cityMatch && statusMatch;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'name' || sortConfig.key === 'city' || sortConfig.key === 'status' || sortConfig.key === 'address') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredStations(filtered);
  }, [stations, searchQuery, selectedCity, selectedStatus, sortConfig]);

  const handleAddStation = async (station) => {
    try {
      await stationApi.addNewStation(station);
      fetchStations();
      toast.success("Station added successfully!", {
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
      toast.error(`Failed to add station. ${err.response?.data?.message || err.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdateStation = async (station) => {
    try {
      await stationApi.updateStation(station);
      fetchStations();
      toast.success("Station updated successfully!", {
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
      toast.error(`Failed to update station. ${err.response?.data?.message || err.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeleteStation = async (stationId) => {
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
          await stationApi.deleteStation(stationId);
          fetchStations();
          toast.success("Station deleted successfully!", {
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
          toast.error(`Failed to delete station. ${err.response?.data?.message || err.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openModal = (station = null) => {
    let formattedStation = null;
    if (station) {
      const formatttedOpeningHours = station.opening_hours.map((opening_hour) => {
        return {
          ...opening_hour,
          opening_time: opening_hour.opening_time.slice(0, 5),
          closing_time: opening_hour.closing_time.slice(0, 5)
        }
      });
      formattedStation = { ...station, opening_hours: formatttedOpeningHours };
    }
    setEditingStation(formattedStation);
    setIsModalOpen(true);
  };

  const openDetailsModal = (station) => {
    setSelectedStation(station);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setEditingStation(null);
    setIsModalOpen(false);
  };

  const closeDetailsModal = () => {
    setSelectedStation(null);
    setIsDetailsModalOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
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
      case 'city':
        setSelectedCity('');
        break;
      case 'status':
        setSelectedStatus('');
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

  // Pagination
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);
  const paginatedStations = filteredStations.slice(
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
          <h2 className="text-lg font-semibold text-gray-800">Filter Stations</h2>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
            aria-label="Add a new station"
          >
            <Plus className="inline-block mr-2 h-5 w-5" /> Add Station
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-station" className="block text-sm font-medium text-gray-800 mb-1">Search Stations</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-station"
                type="text"
                placeholder="Search by name or address..."
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
            <label htmlFor="city-filter" className="block text-sm font-medium text-gray-800 mb-1">City</label>
            <div className="relative">
              <select
                id="city-filter"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedCity ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
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
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
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
        {(searchQuery || selectedCity || selectedStatus) && (
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
            {selectedCity && (
              <button
                onClick={() => removeFilter('city')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                City: {selectedCity} <X className="ml-1 h-4 w-4" />
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
        {paginatedStations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No stations found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Stations List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('name')} className="flex items-center">
                        Name
                        {sortConfig.key === 'name' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('status')} className="flex items-center">
                        Status
                        {sortConfig.key === 'status' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('city')} className="flex items-center">
                        City
                        {sortConfig.key === 'city' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('address')} className="flex items-center">
                        Address
                        {sortConfig.key === 'address' && (
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
                  {paginatedStations.map((station) => (
                    <tr key={station.id} className="hover:bg-gray-100 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{station.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex items-center ${station.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full text-sm`}>
                          {station.status === 'active' ? (
                            <svg className="h-4 w-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          ) : (
                            <svg className="h-4 w-4 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          )}
                          {station.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{station.city}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{station.address}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openModal(station)}
                            aria-label={`Edit station ${station.name}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteStation(station.id)}
                            aria-label={`Delete station ${station.name}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button> */}
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                            onClick={() => openDetailsModal(station)}
                            aria-label={`View details of station ${station.name}`}
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
              {paginatedStations.map((station) => (
                <div key={station.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{station.name}</h3>
                      <p className="text-sm text-gray-600">
                        Status: 
                        <span className={`ml-1 inline-flex items-center ${station.status === 'active' ? 'text-green-800' : 'text-red-800'}`}>
                          {station.status === 'active' ? (
                            <svg className="h-4 w-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          ) : (
                            <svg className="h-4 w-4 mr-1 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          )}
                          {station.status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">City: {station.city}</p>
                      <p className="text-sm text-gray-600">Address: {station.address}</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openModal(station)}
                          aria-label={`Edit station ${station.name}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeleteStation(station.id)}
                          aria-label={`Delete station ${station.name}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          onClick={() => openDetailsModal(station)}
                          aria-label={`View details of station ${station.name}`}
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStations.length)} of {filteredStations.length} stations
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

      <StationFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={editingStation ? handleUpdateStation : handleAddStation}
        initialData={editingStation}
      />

      <StationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        station={selectedStation}
      />

      <ToastContainer />
    </div>
  );
};

export default StationList;
// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";
// import FuelTypeFormModal from './FuelTypeFormModal';

// const FuelTypesList = () => {
//   const [fuelTypes, setFuelTypes] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingFuelType, setEditingFuelType] = useState(null);

//   const fetchFuelTypes = async () => {
//     setLoading(true);
//     try {
//       const response = await fuelTypeApi.getAllFuelTypes();
//       setFuelTypes(response.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load fuel types list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchFuelTypes();
//   }, []);

//   const handleAddFuelType = async (fuelType) => {
//     try {
//       await fuelTypeApi.addNewFuelType(fuelType);
//       fetchFuelTypes();
//       toast.("fuel type added fully!", {
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
//       toast.error(`Failed to add fuel type. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdateFuelType = async (fuelType) => {
//     try {
//       await fuelTypeApi.updateFuelType(fuelType);
//       fetchFuelTypes();
//       toast.("Fuel type updated fully!", {
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
//       toast.error(`Failed to update fuel Type. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeleteFuelType = async (fuelTypeId) => {
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
//           await fuelTypeApi.deleteFuelType(fuelTypeId);
//           fetchFuelTypes();
//           toast.("Fuel type deleted fully!", {
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
//           toast.error(`Failed to delete fuel type. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (fuelType = null) => {
//     setEditingFuelType(fuelType);
//     setIsEditModalOpen(true);
//   };

//   const closeModal = () => {
//     setEditingFuelType(null);
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
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Fuel Types</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Fuel Type
//       </button>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Id
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {fuelTypes.map((fuelType) => (
//                 <tr key={fuelType.id}>
//                         <td className="px-6 py-4 whitespace-nowrap">{fuelType.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{fuelType.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button className="text-indigo-600 hover:text-indigo-900">
//                       <Edit className="h-5 w-5" onClick={() => openEditModal(fuelType)} />
//                     </button>
//                     <button className="text-red-600 hover:text-red-900">
//                       <Trash2 className="h-5 w-5" onClick={() => handleDeleteFuelType(fuelType.id)} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <FuelTypeFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeModal}
//         onSubmit={editingFuelType ? handleUpdateFuelType : handleAddFuelType}
//         initialData={editingFuelType}
//       />


//       <ToastContainer />
//     </div>
//   );
// };

// export default FuelTypesList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";
import FuelTypeFormModal from './FuelTypeFormModal';

const FuelTypesList = () => {
  const [fuelTypes, setFuelTypes] = useState([]);
  const [filteredFuelTypes, setFilteredFuelTypes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingFuelType, setEditingFuelType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchFuelTypes = async () => {
    setLoading(true);
    try {
      const response = await fuelTypeApi.getAllFuelTypes();
      setFuelTypes(response.data);
      setFilteredFuelTypes(response.data);
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

  useEffect(() => {
    let filtered = fuelTypes.filter(fuelType =>
      !searchQuery || fuelType.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key].toLowerCase();
        const bValue = b[sortConfig.key].toLowerCase();
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredFuelTypes(filtered);
  }, [fuelTypes, searchQuery, sortConfig]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredFuelTypes.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (filteredFuelTypes.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredFuelTypes, currentPage, itemsPerPage]);

  const handleAddFuelType = async (fuelType) => {
    try {
      await fuelTypeApi.addNewFuelType(fuelType);
      fetchFuelTypes();
      toast.success("Fuel type added fully!", {
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
      toast.error(`Failed to add fuel type. ${err.response?.data?.message}`, {
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
      toast.success("Fuel type updated fully!", {
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
      toast.error(`Failed to update fuel type. ${err.response?.data?.message}`, {
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
          toast.success("Fuel type deleted fully!", {
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
          toast.error(`Failed to delete fuel type. ${err.response?.data?.message}`, {
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    toast.info("Search reset", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const totalPages = Math.ceil(filteredFuelTypes.length / itemsPerPage);
  const paginatedFuelTypes = filteredFuelTypes.slice(
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
      {/* <h1 className="text-3xl font-bold text-gray-900 mb-6">Fuel Types</h1> */}

      {/* Search Section */}
      {/* <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm"> */}
        <div className="flex justify-between items-center mb-4">
          {/* <h2 className="text-lg font-semibold text-gray-800">Search Fuel Types</h2> */}
          <button
            onClick={() => openEditModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
            aria-label="Add a new fuel type"
          >
            <Plus className="inline-block mr-2 h-5 w-5" /> Add Fuel Type
          </button>
        </div>
        
      {/* </div> */}

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedFuelTypes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No fuel types found. Try adjusting your search.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Fuel Types List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('name')} className="flex items-center">
                        Name
                        {sortConfig.key === 'name' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedFuelTypes.map((fuelType) => (
                    <tr key={fuelType.id} className="hover:bg-gray-100 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">{fuelType.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(fuelType)}
                            aria-label={`Edit fuel type ${fuelType.name}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteFuelType(fuelType.id)}
                            aria-label={`Delete fuel type ${fuelType.name}`}
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

  
          </>
        )}
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
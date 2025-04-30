// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import supplierApi from "../../services/api/supplier/supplierApi"; 
// import SupplierFormModal from './SupplierFormModal'; 

// const SuppliersList = () => {
//   const [suppliers, setSuppliers] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingSupplier, setEditingSupplier] = useState(null);


//   const fetchSuppliers = async () => {
//     setLoading(true);
//     try {
//       const { data } = await supplierApi.getAllSuppliers(); 
//       setSuppliers(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load suppliers list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchSuppliers();
//   }, []);

//   // Handle adding a new supplier
//   const handleAddSupplier = async (supplier) => {
//     try {
//       await supplierApi.addNewSupplier(supplier); 
//       fetchSuppliers();
//       toast.success("Supplier added successfully!", {
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
//       toast.error(`Failed to add supplier. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // Handle updating a supplier
//   const handleUpdateSupplier = async (supplier) => {
//     try {
//       await supplierApi.updateSupplier(supplier); 
//       fetchSuppliers();
//       toast.success("Supplier updated successfully!", {
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
//       toast.error(`Failed to update supplier. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // Handle deleting a supplier
//   const handleDeleteSupplier = async (supplierId) => {
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
//           await supplierApi.deleteSupplier(supplierId); 
//           fetchSuppliers();
//           toast.success("Supplier deleted successfully!", {
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
//           toast.error(`Failed to delete supplier. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   // Open edit modal
//   const openEditModal = (supplier = null) => {
//     setEditingSupplier(supplier);
//     setIsEditModalOpen(true);
//   };

//   // Close edit modal
//   const closeEditModal = () => {
//     setEditingSupplier(null);
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
//       <h1 className="text-3xl font-bold mb-6">Suppliers</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Supplier
//       </button>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   City
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Telephone
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {suppliers.map((supplier) => (
//                 <tr key={supplier.id}>
// <td className="px-6 py-4 whitespace-nowrap">{supplier.name}</td>
// <td className="px-6 py-4 whitespace-nowrap">{supplier.city ?? "N/A"}</td>
// <td className="px-6 py-4 whitespace-nowrap">{supplier.address ?? "N/A"}</td>
// <td className="px-6 py-4 whitespace-nowrap">{supplier.telephone}</td>
// <td className="px-6 py-4 whitespace-nowrap">{supplier.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       onClick={() => openEditModal(supplier)}
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-900"
//                       onClick={() => handleDeleteSupplier(supplier.id)}
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

//       {/* Supplier Form Modal */}
//       <SupplierFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingSupplier ? handleUpdateSupplier : handleAddSupplier}
//         initialData={editingSupplier}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default SuppliersList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronDown, X, Download, Filter } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import supplierApi from "../../services/api/supplier/supplierApi";
import SupplierFormModal from './SupplierFormModal';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const itemsPerPage = 10;

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const { data } = await supplierApi.getAllSuppliers();
      setSuppliers(data.data);
      setFilteredSuppliers(data.data);

      const uniqueCities = [...new Set(data.data.map(supplier => supplier.city).filter(city => city))];
      setCities(uniqueCities);

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

  useEffect(() => {
    let filtered = suppliers.filter(supplier => {
      const searchMatch =
        !searchQuery ||
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
      const cityMatch = !selectedCity || supplier.city === selectedCity;
      return searchMatch && cityMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        if (sortConfig.key === 'name' || sortConfig.key === 'city') {
          aValue = (aValue || '').toLowerCase();
          bValue = (bValue || '').toLowerCase();
        }
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredSuppliers(filtered);
  }, [suppliers, searchQuery, selectedCity, sortConfig]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (filteredSuppliers.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredSuppliers, currentPage, itemsPerPage]);

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
      toast.error(`Failed to add supplier. ${err.response?.data?.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

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
      toast.error(`Failed to update supplier. ${err.response?.data?.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

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
          toast.error(`Failed to delete supplier. ${err.response?.data?.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (supplier = null) => {
    setEditingSupplier(supplier);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingSupplier(null);
    setIsEditModalOpen(false);
  };

  const openDetailsModal = (supplier) => {
    setSelectedSupplier(supplier);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedSupplier(null);
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
    setSearchQuery('');
    setSelectedCity('');
    setCurrentPage(1);
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
      default:
        break;
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(
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
          <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Filter Suppliers</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => openEditModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
              aria-label="Add a new supplier"
            >
              <Plus className="h-5 w-5 mr-2" /> Add Supplier
            </button>
          </div>
        </div>
        <div className={`${isFilterOpen ? 'block' : 'hidden'} sm:block transition-all duration-300`}>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="search-supplier" className="block text-sm font-medium text-gray-800 mb-1">Search Suppliers</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="search-supplier"
                  type="text"
                  placeholder="Search by supplier name..."
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
                  aria-label="Filter suppliers by city"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
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
          {(searchQuery || selectedCity) && (
            <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
              <span className="font-medium">Filtered by:</span>
              {searchQuery && (
                <button
                  onClick={() => removeFilter('search')}
                  className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center animate-in fade-in"
                >
                  Search: "{searchQuery}" <X className="ml-1 h-4 w-4" />
                </button>
              )}
              {selectedCity && (
                <button
                  onClick={() => removeFilter('city')}
                  className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center animate-in fade-in"
                >
                  City: {selectedCity} <X className="ml-1 h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedSuppliers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No suppliers found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Suppliers List</caption>
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
                      <button onClick={() => handleSort('city')} className="flex items-center">
                        City
                        {sortConfig.key === 'city' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Address
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Telephone
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSuppliers.map((supplier, index) => (
                    <tr
                      key={supplier.id}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-gray-100 transition-colors duration-150`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{supplier.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{supplier.city ?? "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{supplier.address ?? "N/A"}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{supplier.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{supplier.telephone}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(supplier)}
                            aria-label={`Edit supplier ${supplier.name}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                            onClick={() => openDetailsModal(supplier)}
                            aria-label={`View details of supplier ${supplier.name}`}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteSupplier(supplier.id)}
                            aria-label={`Delete supplier ${supplier.name}`}
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
              {paginatedSuppliers.map((supplier) => (
                <div key={supplier.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{supplier.name}</h3>
                      <p className="text-sm text-gray-600">City: {supplier.city ?? "N/A"}</p>
                      <p className="text-sm text-gray-600">Address: {supplier.address ?? "N/A"}</p>
                      <p className="text-sm text-gray-600">Email: {supplier.email}</p>
                      <p className="text-sm text-gray-600">Telephone: {supplier.telephone}</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEditModal(supplier)}
                          aria-label={`Edit supplier ${supplier.name}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          onClick={() => openDetailsModal(supplier)}
                          aria-label={`View details of supplier ${supplier.name}`}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeleteSupplier(supplier.id)}
                          aria-label={`Delete supplier ${supplier.name}`}
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSuppliers.length)} of {filteredSuppliers.length} suppliers
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

      <SupplierFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingSupplier ? handleUpdateSupplier : handleAddSupplier}
        initialData={editingSupplier}
      />

      {/* Supplier Details Modal */}
      {isDetailsModalOpen && selectedSupplier && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeDetailsModal()}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Supplier Details</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedSupplier.id}</p>
              <p><strong>Name:</strong> {selectedSupplier.name}</p>
              <p><strong>City:</strong> {selectedSupplier.city ?? "N/A"}</p>
              <p><strong>Address:</strong> {selectedSupplier.address ?? "N/A"}</p>
              <p><strong>Email:</strong> {selectedSupplier.email}</p>
              <p><strong>Telephone:</strong> {selectedSupplier.telephone}</p>
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

export default SuppliersList;
import axiosClient from '../../../api/axios';
const supplierApi = {
    addNewSupplier:async(data)=> await axiosClient.post('/suppliers',data),
    getSupplier:async(supplierId)=> await axiosClient.get(`/suppliers/${supplierId}`),
    getAllSuppliers:async()=> await axiosClient.get('/suppliers'),
    updateSupplier:async(supplier)=> await axiosClient.put(`/suppliers/${supplier.id}`,supplier),
    deleteSupplier:async(supplierId)=> await axiosClient.delete(`/suppliers/${supplierId}`),
};
export default supplierApi;
import axiosClient from "../../../api/axios";

const saleApi = {
    addNewSale: async (data) => await axiosClient.post('/sales', data),
    getSale: async (id) => await axiosClient.get(`/sales/${id}`),
    getAllSales: async () => await axiosClient.get('/sales'),
    updateSale: async (sale) => await axiosClient.put(`/sales/${sale.id}`, sale),
    deleteSale: async (id) => await axiosClient.delete(`/sales/${id}`),
};

export default saleApi;

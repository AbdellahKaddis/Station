import axiosClient from '../../../api/axios';

const stockEntryApi = {
    addNewStockEntry: async (data) => await axiosClient.post('/stock-entries', data),
    getStockEntry: async (stockEntryId) => await axiosClient.get(`/stock-entries/${stockEntryId}`),
    getAllStockEntries: async () => await axiosClient.get('/stock-entries'),
    updateStockEntry: async (stockEntry) => await axiosClient.put(`/stock-entries/${stockEntry.id}`, stockEntry),
    deleteStockEntry: async (stockEntryId) => await axiosClient.delete(`/stock-entries/${stockEntryId}`),
};

export default stockEntryApi;

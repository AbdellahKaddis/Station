import axiosClient from "../../../api/axios";

const salePriceHistoryApi = {
    addNewSalePrice: async (data) => await axiosClient.post('/sale-price-history', data),
    getSalePrice: async (id) => await axiosClient.get(`/sale-price-history/${id}`),
    getCurrentSalePriceByFuelType: async (fuelTypeId) => await axiosClient.get(`/sale-price/current/${fuelTypeId}`),
    getAllSalePrices: async () => await axiosClient.get('/sale-price-history'),
    updateSalePrice: async (salePrice) => await axiosClient.put(`/sale-price-history/${salePrice.id}`, salePrice),
    deleteSalePrice: async (id) => await axiosClient.delete(`/sale-price-history/${id}`),
};

export default salePriceHistoryApi;

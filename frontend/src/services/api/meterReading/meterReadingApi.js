import axiosClient from "../../../api/axios";

const meterReadingApi = {
    addMeterReading: async (data) => await axiosClient.post('/meter-readings', data),

    getMeterReading: async (id) => await axiosClient.get(`/meter-readings/${id}`),
    getMeterReadingByPumpId:async (pumpId) => await axiosClient.get(`/meter-reading-by-pump-id/${pumpId}`),
    getAllMeterReadings: async () => await axiosClient.get('/meter-readings'),

    updateMeterReading: async (meterReading) => await axiosClient.put(`/meter-readings/${meterReading.id}`, meterReading),

    deleteMeterReading: async (id) => await axiosClient.delete(`/meter-readings/${id}`),
};

export default meterReadingApi;
import axiosClient from "../../../api/axios";

const planningApi = {
    addNewPlanning: async (data) => await axiosClient.post('/plannings', data),
    getPlanning: async (planningId) => await axiosClient.get(`/plannings/${planningId}`),
    getAllPlannings: async () => await axiosClient.get('/plannings'),
    updatePlanning: async (planning) => await axiosClient.put(`/plannings/${planning.id}`, planning),
    deletePlanning: async (planningId) => await axiosClient.delete(`/plannings/${planningId}`),
};

export default planningApi;
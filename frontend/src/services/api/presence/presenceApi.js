import axiosClient from "../../../api/axios";

const presenceApi = {
    addNewPresence: async (data) => await axiosClient.post('/presences', data),
    getPresence: async (presenceId) => await axiosClient.get(`/presences/${presenceId}`),
    getAllPresences: async () => await axiosClient.get('/presences'),
    updatePresence: async (presence) => await axiosClient.put(`/presences/${presence.id}`, presence),
    deletePresence: async (presenceId) => await axiosClient.delete(`/presences/${presenceId}`),
};

export default presenceApi;
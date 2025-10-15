const API_BASE_URL = 'http://localhost:5000';

export const apiService = {
    async getAllData() {
        const response = await fetch(`${API_BASE_URL}/allData`);
        return await response.json();
    },

    async getItemById(id) {
        const response = await fetch(`${API_BASE_URL}/dataInfo/item/${id}`);
        return await response.json();
    },

    async getItemsByStatus(status) {
        const response = await fetch(`${API_BASE_URL}/dataInfo/status/${status}`);
        return await response.json();
    },

    async getItemsByQuery(status) {
        const response = await fetch(`${API_BASE_URL}/dataInfoQuery?status=${status}`);
        return await response.json();
    }
};
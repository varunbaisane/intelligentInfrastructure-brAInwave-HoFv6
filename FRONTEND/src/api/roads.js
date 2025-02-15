const API_URL = 'http://localhost:8000/api';

export const roadsAPI = {
    async uploadRoad(formData) {
        const response = await fetch(`${API_URL}/roads/analyze`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload road data');
        }
        return response.json();
    },

    async getRoads() {
        const response = await fetch(`${API_URL}/roads`);
        if (!response.ok) {
            throw new Error('Failed to fetch roads');
        }
        return response.json();
    },

    async getCriticalRoads() {
        const response = await fetch(`${API_URL}/roads/critical`);
        if (!response.ok) {
            throw new Error('Failed to fetch critical roads');
        }
        return response.json();
    }
};
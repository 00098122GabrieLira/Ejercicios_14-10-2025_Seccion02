const API_BASE_URL = "http://localhost:5000";

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
    const response = await fetch(
      `${API_BASE_URL}/dataInfoQuery?status=${status}`
    );
    return await response.json();
  },

  async getItemsByMultiQuery(params) {
    try {
      const queryParams = new URLSearchParams();

      if (params.status !== undefined && params.status !== "") {
        queryParams.append("status", params.status);
      }
      if (params.gender && params.gender !== "") {
        queryParams.append("gender", params.gender);
      }
      if (params.datePublish && params.datePublish !== "") {
        queryParams.append("datePublish", params.datePublish);
      }
      if (params.nameBook && params.nameBook !== "") {
        queryParams.append("nameBook", params.nameBook);
      }

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/dataInfoQueryMulti${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error en getItemsByMultiQuery:", error);
      return {
        Status: false,
        message: error.message,
        data: [],
      };
    }
  },
};

import api from "./api";

export const getBatches = async () => {
  try {
    const response = await api.get("/Batch");
    console.log("Fetched Batches:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching batches:", error.response?.data || error.message);
    return [];
  }
};

export const addBatch = async (batchData) => {
  try {
    console.log("Sending Batch Data:", batchData);
    const response = await api.post("/Batch", batchData);
    return response.data;
  } catch (error) {
    console.error("Error adding batch:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBatch = async (batchId) => {
  try {
    await api.delete(`/Batch/${batchId}`);
  } catch (error) {
    console.error("Error deleting batch:", error);
    throw error;
  }
};

export const updateBatch = async (batchId, updatedData) => {
  try {
    const response = await api.put(`/Batch/${batchId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating batch:", error);
    throw error;
  }
};
import { api } from "./client";

const uploadMaterialApi = async (formData) => {
  const res = await api.post("studyMaterials/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const getAllMaterialsApi = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString(); // Convert filters object to query string
  const res = await api.get(`studyMaterials?${query}`);
  return res.data;
};

const getMaterialApi = async (materialID) => {
  const res = await api.get(`studyMaterials/getMaterial/${materialID}`);
  return res.data;
};

const updateMaterialApi = async (materialID, formData) => {
  const res = await api.patch(`studyMaterials/update/${materialID}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const deleteMaterialApi = async (materialID) => {
  const res = await api.delete(`studyMaterials/delete/${materialID}`);
  return res.data;
};

export {
  uploadMaterialApi,
  getAllMaterialsApi,
  getMaterialApi,
  updateMaterialApi,
  deleteMaterialApi,
};

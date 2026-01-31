import { api } from  "./client.js"

const loginApi = async ({email, password}) => {
  const res = await api.post("users/login", {email, password});
  return res.data;
}

const signupApi = async (data) => {
  const res = await api.post("users/register", data);
  return res.data
}

const logoutApi = async (data) => {
  const res = await api.post("users/logout", data);
  return res.data
}
const currentUserApi = async (data) => {
  const res = await api.get("users/current-user");
  return res.data
}

const deleteUserApi = async (data) => {
  const res = await api.delete("users/delete");
  return res.data
}

const forgotPasswordApi = async (email) => {
  const res = await api.post("users/forgot-password", email);
  return res.data;
}

const resetPasswordApi = async (data) => {
  const res = await api.patch("users/reset-password", data);
  return res.data;
}

export  { loginApi,  signupApi, logoutApi, currentUserApi, deleteUserApi, forgotPasswordApi, resetPasswordApi}
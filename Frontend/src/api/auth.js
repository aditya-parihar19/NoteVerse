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

export  { loginApi,  signupApi, logoutApi, currentUserApi }
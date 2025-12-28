import { api } from  "./client.js"

const login = async (email, password) => {
  const res = await api.post("/login", {email, password});
  return res.data;
}

export  { login }
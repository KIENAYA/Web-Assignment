import axios from "axios";
import { Person } from "../models/person/Person";

const API_URL = "http://localhost:4000";

export const register = (username: string, password: string,role:string,profile:Person) => {
  return axios.post(API_URL + "/signup", {
  profile,
    username,
    role,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "/login", {
      username,
      password,
    })
    .then((response) => {
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
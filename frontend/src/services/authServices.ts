import axios from "axios";
import { Person } from "../models/person/Person";
import { Account } from '../models/Account';
const API_URL = "http://localhost:4000";

const tokenObject = localStorage.getItem("user");
const tokenInfo = JSON.parse(tokenObject? tokenObject: '');
const token = tokenInfo.token;
console.log(token);

export const register = (username: string, role: string,password:string,profile:Person) => {
  return axios.post(API_URL + "/protected/signup", {
  username,
    password,
    role,
    profile,
  }, {headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }})}

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
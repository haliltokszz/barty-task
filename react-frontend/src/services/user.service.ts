import axios from "axios";
import IUser from "../types/user.type";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/users/";

export const getUsers = async () => {
  return await axios.get(API_URL, { headers: authHeader() });
};

export const getUser = async (id: string) => {
  return await axios.get(API_URL + id, { headers: authHeader() });
}

export const getUsersWithPagination = async (page : number, limit: number) => {
  return await axios.get(API_URL + "pagination/" + page + "/" + limit, { headers: authHeader() });
}

export const addUser = async (user: IUser) => {
  return await axios.post(API_URL, user, { headers: authHeader() });
}

export const updateUser = async (id: string, user: IUser) => {
  return await axios.put(API_URL + id, user ,{ headers: authHeader() });
}

export const deleteUser = async (id: string) => {
  return await axios.delete(API_URL + id, { headers: authHeader() });
}

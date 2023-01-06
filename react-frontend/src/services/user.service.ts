import axios from "axios";
import { UserType } from "../types/user.type";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/users/";

class UserService{
    getUsers = async () => {
        return await axios.get(API_URL, { headers: authHeader() });
    }
    getUser = async (id: string) => {
        return await axios.get(API_URL + "/" + id, { headers: authHeader() });
    }
    
    getUsersWithPagination = async (page : number, limit: number) => {
        return await axios.get(API_URL + "pagination/" + page + "/" + limit, { headers: authHeader() });
    }
    
    addUser = async (user: UserType) => {
        return await axios.post(API_URL, user, { headers: authHeader() });
    }
    
    updateUser = async (id: string, user: UserType) => {
        return await axios.put(API_URL + 'update/'+ id, user ,{ headers: authHeader() });
    }
    
    deleteUser = async (id: string) => {
        return await axios.delete(API_URL + 'delete/'+ id, { headers: authHeader() });
    }
}

export default new UserService();
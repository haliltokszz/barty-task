import axios from "axios";
import { UserType } from "../types/user.type";
import UserService from "./user.service";

const API_URL = "http://localhost:3000/auth/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("token", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(user: UserType) {
    return axios.post(API_URL + "signup", {
      user,
    });
  }

  getCurrentUser(): UserType | undefined{
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(token!);
    console.log(decodedToken);
    if(!decodedToken) return undefined;
    
    UserService.getUser(decodedToken.id).then((response) => {
      return response.data as UserType;
    });
    return undefined;
  };
}

export default new AuthService();

import axios from "axios";
import IUser from "../types/user.type";
import { getUser } from "./user.service";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:3000/";

export const register = (user: IUser) => {
  return axios.post(API_URL + "users/signup", 
    user
  );
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode<IUser>(token!);
  console.log(decodedToken);

  let user : IUser | undefined = undefined;
  await getUser(decodedToken.id).then((response) => {
    console.log(response.data);
    user = response.data as IUser;
  });
  return user;
};

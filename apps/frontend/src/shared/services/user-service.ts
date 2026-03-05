import axios from "axios";
import type { UserType } from "../types/user-type";

export const userService = {
  detail: (userId: number) =>
    axios.get<UserType>(`https://jsonplaceholder.typicode.com/users/${userId}`),
};

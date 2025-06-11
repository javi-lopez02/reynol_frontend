import axios from "./axios";

export const getUsersRequest = () => {
  return axios.get(`/users`);
};

interface UserRequest {
  username: string;
  password: string;
  description: string;
  email: string;
}

export const createUsersRequest = (user: UserRequest) => {
  return axios.post(`/users`, user);
};

export const editUsersRequest = (id: string, user: UserRequest) => {
  return axios.put(`/users/${id}`, user);
};

export const deleteUsersRequest = (id: string) => {
  return axios.delete(`/users/${id}`);
};

// utils
import axios from "../utils/axios";

export const getUser = () => axios.get("/api/users");

export const updateUserProfile = ({ userId, formData }) =>
  axios.post(`/api/users/update_profile/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const loginUser = (user) => axios.post("/api/users/login", user);

export const registerUser = (user) => axios.post("/api/users", user);

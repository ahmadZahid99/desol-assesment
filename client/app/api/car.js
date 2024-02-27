import axios from "../utils/axios";

export const getCar = () => axios.get("/api/cars");

export const createCar = (data) =>
  axios.post("/api/cars/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const addToCart = (data) => axios.post("/car/addtocart", data);

export const getCarById = ({ carId }) => axios.get(`/api/car/${carId}`);

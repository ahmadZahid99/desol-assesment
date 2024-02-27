import * as types from "./index";

// send the request to fetch all car
export const getCarRequest = () => ({
  type: types.GET_CAR_REQUEST,
});
// sending the data to redux store of all car
export const getCarSuccess = ({ items }) => ({
  type: types.GET_CAR_SUCCESS,
  payload: {
    items,
  },
});

// send the request to fetch car by id
export const getCarByIdRequest = (carId) => ({
  type: types.GET_CAR_BY_ID_REQUEST,
  payload: {
    carId,
  },
});

// sending the data to redux store of the car
export const getCarByIdSuccess = ({ carDetails }) => ({
  type: types.GET_CAR_BY_ID_SUCCESS,
  payload: {
    carDetails,
  },
});

export const createCarRequest = (data) => ({
  type: types.CREATE_CAR_REQUEST,
  payload: {
    ...data,
  },
});

export const createCarSuccess = ({ message }) => ({
  type: types.CREATE_CAR_SUCCESS,
  payload: {
    message,
  },
});

export const addToCartRequest = (data) => ({
  type: types.ADD_TO_CART_REQUEST,
  payload: {
    ...data,
  },
});

export const addToCartSuccess = ({ message }) => ({
  type: types.ADD_TO_CART_SUCCESS,
  payload: {
    message,
  },
});

export const carError = ({ error }) => ({
  type: types.CAR_ERROR,
  payload: {
    error,
  },
});

export const clearCarList = () => ({
  type: types.CLEAR_CAR_LIST,
});

export const clearCar = () => ({
  type: types.CLEAR_CAR,
});

export const clearMessage = () => ({
  type: types.CLEAR_MESSAGE,
});

export const clearError = () => ({
  type: types.CLEAR_ERROR,
});

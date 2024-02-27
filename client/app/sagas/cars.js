import { takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/car";
import * as authActions from "../actions/auth";
import * as api from "../api/car";
import * as types from "../actions";
import { setSession } from "../auth/utils";

function* getCar() {
  try {
    const result = yield call(api.getCar);

    yield put(
      actions.getCarSuccess({
        items: result.data,
      })
    );
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.carError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetCarRequest() {
  yield takeEvery(types.GET_CAR_REQUEST, getCar);
}

function* createCar({ payload }) {
  try {
    const { carModel, price, phoneNumber, maxPictures, pictures } = payload;

    const formData = new FormData();
    formData.append("carModel", carModel);
    formData.append("price", price);
    formData.append("phoneNumber", phoneNumber);
    formData.append("maxPictures", maxPictures);

    pictures.forEach((file) => {
      formData.append(`pictures`, file);
    });

    const response = yield call(api.createCar, formData);

    yield put(
      actions.createCarSuccess({
        message: response.data.message,
      })
    );
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.carError({
          error: e.message,
        })
      );
    }
  }
}

function* watchCreateCarRequest() {
  yield takeEvery(types.CREATE_CAR_REQUEST, createCar);
}
function* addToCart({ payload }) {
  try {
    const response = yield call(api.addToCart, payload);

    yield put(
      actions.addToCartSuccess({
        message: response.data.message,
      })
    );

    yield put(actions.getCarByIdRequest(payload.car_id));
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.carError({
          error: e.message,
        })
      );
    }
  }
}

function* watchAddToCartRequest() {
  yield takeEvery(types.ADD_TO_CART_REQUEST, addToCart);
}

function* getCarById({ payload }) {
  try {
    const result = yield call(api.getCarById, payload);

    yield put(
      actions.getCarByIdSuccess({
        carDetails: result.data.cars,
      })
    );
  } catch (e) {
    if (e.message === "Error: Not authorized, no token") {
      setSession(null);
      yield put(authActions.logoutRequest());

      yield put(
        authActions.loginError({
          error: e.message,
        })
      );
    } else {
      yield put(
        actions.carError({
          error: e.message,
        })
      );
    }
  }
}

function* watchGetCarByIdRequest() {
  yield takeEvery(types.GET_CAR_BY_ID_REQUEST, getCarById);
}

const carSagas = [
  fork(watchGetCarRequest),
  fork(watchCreateCarRequest),
  fork(watchGetCarByIdRequest),
  fork(watchAddToCartRequest),
];

export default carSagas;

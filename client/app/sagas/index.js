import { all } from "redux-saga/effects";
import authSagas from "./auth";
import carSagas from "./cars";

export default function* rootSaga() {
  yield all([...authSagas, ...carSagas]);
}

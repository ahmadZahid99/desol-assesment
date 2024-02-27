"use client";
import { createStore, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootSaga from "./sagas";
import reducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default function ReduxStoreProvider({ children }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

import * as types from "../actions";

const INITIAL_STATE = {
  carList: null,
  car: null,
  message: null,
  error: null,
};

export default function car(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_CAR_SUCCESS: {
      return {
        ...state,
        carList: action.payload.items,
        message: null,
        error: null,
      };
    }
    case types.GET_CAR_BY_ID_SUCCESS: {
      return {
        ...state,
        car: action.payload.carDetails,
        message: null,
        error: null,
      };
    }

    case types.CREATE_CAR_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    }
    case types.ADD_TO_CART_SUCCESS: {
      return {
        ...state,
        message: action.payload.message,
        error: null,
      };
    }

    case types.CAR_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case types.CLEAR_CAR_LIST: {
      return {
        ...state,
        carList: null,
      };
    }
    case types.CLEAR_CAR: {
      return {
        ...state,
        car: null,
      };
    }
    case types.CLEAR_MESSAGE: {
      return {
        ...state,
        message: null,
      };
    }
    case types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    default: {
      return state;
    }
  }
}

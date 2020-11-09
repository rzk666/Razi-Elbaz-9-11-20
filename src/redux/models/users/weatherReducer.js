// Initial state
import { INITIAL_STATE } from '../../../common/app-const';
// Types
import {
  WEATHER_HAS_ERROR,
  WEATHER_IS_LOADING,
  WEATHER_GET_DATA,
} from './weatherTypes';

// This is temp and will change soon
const weather = (state = INITIAL_STATE.users, action) => {
  switch (action.type) {
    case WEATHER_IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case WEATHER_GET_DATA: {
      const { data } = action;
      return {
        ...state,
        data,
        hasError: false,
        errorCode: -1,
      };
    }
    case WEATHER_HAS_ERROR: {
      if (!action.data) {
        return {
          ...state,
          hasError: action.data,
          errorCode: -1,
          isLoading: false,
        };
      }
      return {
        ...state,
        hasError: true,
        errorCode: `e${action.data}`,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default weather;

// Initial state
import { INITIAL_STATE } from '../../../common/app-const';
// Types
import {
  WEATHER_HAS_ERROR,
  WEATHER_IS_LOADING,
  WEATHER_GET_DATA,
  FORECAST_GET_DATA,
  FORECAST_IS_LOADING,
} from './weatherTypes';

// This is temp and will change soon
const weather = (state = INITIAL_STATE.weather, action) => {
  switch (action.type) {
    case WEATHER_IS_LOADING: {
      const { isLoading } = action;
      return { ...state, isLoading };
    }
    case FORECAST_IS_LOADING: {
      const { isLoading } = action;
      return {
        ...state,
        forecast: { ...state.forecast, isLoading },
      };
    }
    case FORECAST_GET_DATA: {
      const { data } = action;
      const { Headline, DailyForecasts } = data;
      return {
        ...state,
        forecast: {
          ...state.forecast,
          headline: Headline,
          daily: DailyForecasts,
        },
        hasError: false,
        errorCode: -1,
      };
    }
    case WEATHER_GET_DATA: {
      const { data } = action;
      const currentConditionData = data[0];
      return {
        ...state,
        data: currentConditionData,
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

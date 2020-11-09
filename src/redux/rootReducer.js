import { combineReducers } from 'redux';
import weather from './models/weather/weatherReducer';

export default combineReducers({
  weather,
});

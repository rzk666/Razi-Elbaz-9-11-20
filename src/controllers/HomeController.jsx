import React, { useEffect, useState } from 'react';
// Common

const HomeController = (props) => {
  const {
    // Redux actions
    fetchWeather,
    fetchForecast,
  } = props;

  // ----- State ----- //
  const [currentLocation, setCurrentLocation] = useState({
    city: '',
    country: '',
  });
  const [tempratureType, setTempratureType] = useState('F');

  // ----- useEffects ----- //
  useEffect(() => {
    console.log('MOUNT');
  }, []);

  const fetchWeatherWithForcast = (key) => {
    fetchWeather(key);
    fetchForecast(key);
  };

  const { View } = props;
  return (
    <View
      {...props}
      currentLocation={currentLocation}
      tempratureType={tempratureType}
      setTempratureType={setTempratureType}
      setCurrentLocation={setCurrentLocation}
      fetchWeather={fetchWeatherWithForcast}
    />
  );
};

export default HomeController;

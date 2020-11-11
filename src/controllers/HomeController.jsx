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
      setCurrentLocation={setCurrentLocation}
      fetchWeather={fetchWeatherWithForcast}
    />
  );
};

export default HomeController;

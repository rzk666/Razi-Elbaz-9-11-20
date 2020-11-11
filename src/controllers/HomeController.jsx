import React, { useEffect, useState } from 'react';
// Common

const HomeController = (props) => {
  const {
    // Global state
    weather,
    // Redux actions
    fetchWeather,
    fetchForecast,
  } = props;

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
      fetchWeather={fetchWeatherWithForcast}
    />
  );
};

export default HomeController;

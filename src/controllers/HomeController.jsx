import React, { useEffect, useState } from 'react';
// Utils
import { useHistory } from 'react-router-dom';
import HttpRequest from '../utils/HttpRequest';
// Components
import ErrorToast from '../components/common/ErrorToast';

// ----- Help Functions ----- //
const fetchByGeoLocation = (lat, lng) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/cities/geoposition/search?apikey=${config.credentials.weatherApi}&q=${lat},${lng}`,
  url: 'https://testsh.free.beeceptor.com/getgeo',
});

const HomeController = (props) => {
  const {
    // Global state
    weather,
    // Redux actions
    fetchWeather,
    fetchForecast,
    weatherGetData,
    weatherIsLoading,
    // View Components
    View,
  } = props;

  // History
  const history = useHistory();
  const { location } = history;
  const { currentFavorite, favoriteFullData } = location;

  // Localstorage
  const favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];
  const lastLocationState = JSON.parse(localStorage.getItem('lastLocation'));

  // ----- State ----- //
  const [currentLocation, setCurrentLocation] = useState(lastLocationState || {
    city: '',
    key: '',
    country: '',
    isFavorite: false,
    coords: {},
  });

  // ----- Callbacks ----- //
  const fetchWeatherWithForcast = (key) => {
    fetchWeather(key);
    fetchForecast(key);
  };

  const toggleFavorite = () => {
    const { key, isFavorite } = currentLocation;
    // This means we need to add favorite to the favorites
    if (!isFavorite) {
      localStorage.setItem('favorites', JSON.stringify([...favoritesList, key]));
    } else {
      localStorage.setItem('favorites', JSON.stringify(favoritesList.filter((x) => x !== key)));
    }
    setCurrentLocation({
      ...currentLocation,
      isFavorite: !isFavorite,
    });
  };

  // ----- useEffects ----- //
  useEffect(() => {
    // This means we got here by clicking on a favorite on the favorites page
    if (currentFavorite) {
      const { key } = currentFavorite;
      weatherGetData(favoriteFullData, key);
      fetchForecast(key);
      setCurrentLocation(currentFavorite);
    } else if (!Object.keys(weather.data).length) {
      navigator.geolocation.getCurrentPosition(async (geoLocationData) => {
        if (geoLocationData) {
          const { coords } = geoLocationData;
          const { latitude, longitude } = coords;
          weatherIsLoading(true);
          const { data } = await fetchByGeoLocation(latitude, longitude);
          const { LocalizedName, Key, Country } = data;
          fetchWeatherWithForcast(Key);
          setCurrentLocation({
            key: Key,
            city: LocalizedName,
            country: Country.LocalizedName,
            coords: { latitude, longitude },
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    const { key } = currentLocation;
    if (key) {
      const isFavorite = !!favoritesList.find((x) => x === key);
      setCurrentLocation({
        ...currentLocation,
        isFavorite,
      });
    }
  }, [currentLocation.key]);

  useEffect(() => {
    localStorage.setItem('lastLocation', JSON.stringify(currentLocation));
  }, [currentLocation]);

  return (
    <>
      <View
        {...props}
        toggleFavorite={toggleFavorite}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        fetchWeather={fetchWeatherWithForcast}
      />
      <ErrorToast
        hasError={weather.hasError}
      />
    </>
  );
};

export default HomeController;

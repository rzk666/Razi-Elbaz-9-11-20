/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
// Utils
import HttpRequest from '../utils/HttpRequest';
// Config
import config from '../common/config';
import { sleep } from '../common/libs';

const getWeatherByKey = (key) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/currentconditions/v1/${key}?apikey=${config.credentials.weatherApi}`,
  url: 'https://testsh.free.beeceptor.com/getweather',
});

const getLocationsByKey = (key) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/${key}?apikey=${config.credentials.weatherApi}`,
  url: 'https://testsh.free.beeceptor.com/getlocation',
});

const FavoritesController = (props) => {
  const {
    // Redux actions
    test,
  } = props;

  // ----- state ----- //
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [favoritesData, setFavoritesData] = useState({});

  // ----- Help Functions ----- //
  const getFavoriteData = async (favoriteKey) => {
    try {
      const weatherResponse = await getWeatherByKey(favoriteKey);
      const favoriteData = weatherResponse.data[0];
      const locationResponse = await getLocationsByKey(favoriteKey);
      const locationData = locationResponse.data;
      const { LocalizedName, Country } = locationData;
      setFavoritesData({
        ...favoriteData,
        key: favoriteKey,
        city: LocalizedName,
        country: Country.LocalizedName,
      });
    } catch (e) {
    // Handle error
      console.log('err');
    }
  };

  // ----- useEffects ----- //

  // ----- Mount ----- //
  useEffect(() => {
    favorites.forEach((favoriteKey) => {
      getFavoriteData(favoriteKey);
    });
  }, []);

  // Add new favorite data when its recived from the server
  useEffect(() => {
    if (Object.keys(favoritesData).length) {
      const newFavorites = favorites.filter((key) => favoritesData.key !== key);
      newFavorites.push(favoritesData);
      setFavorites(newFavorites);
    }
  }, [favoritesData]);

  const { View } = props;
  return (
    <View
      favorites={favorites}
      {...props}
    />
  );
};

export default FavoritesController;

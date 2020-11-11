/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
// Utils
import HttpRequest from '../utils/HttpRequest';
// Config
import config from '../common/config';

const getWeatherByKey = (key) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/currentconditions/v1/${key}?apikey=${config.credentials.weatherApi}`,
  url: 'https://testsh.free.beeceptor.com/getweather',
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
      const favoriteData = await getWeatherByKey(favoriteKey);
      setFavoritesData({ ...favoriteData, key: favoriteKey });
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

  useEffect(() => {
    if (Object.keys(favoritesData)) {
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

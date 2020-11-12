/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
// Components
import ErrorToast from '../components/common/ErrorToast';
// API
import { getWeatherByKey, getLocationInfo } from '../common/api-requests';

const FavoritesController = (props) => {
  // ----- state ----- //
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [favoritesData, setFavoritesData] = useState({});
  const [hasError, setError] = useState(false);

  // ----- Help Functions ----- //
  const getFavoriteData = async (favoriteKey) => {
    try {
      const weatherResponse = await getWeatherByKey(favoriteKey);
      const favoriteData = weatherResponse.data[0];
      const locationResponse = await getLocationInfo(favoriteKey);
      const locationData = locationResponse.data;
      const { LocalizedName, Country, GeoPosition } = locationData;
      const { Latitude, Longitude } = GeoPosition;
      setFavoritesData({
        ...favoriteData,
        key: favoriteKey,
        city: LocalizedName,
        country: Country.LocalizedName,
        coords: { latitude: Latitude, longitude: Longitude },
      });
    } catch (e) {
      setError(true);
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
    <>
      <View
        favorites={favorites}
        {...props}
      />
      <ErrorToast
        hasError={hasError}
        onClose={() => setError(false)}
      />
    </>
  );
};

export default FavoritesController;

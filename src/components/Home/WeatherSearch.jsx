import React, { useCallback, useEffect, useState } from 'react';
// Components
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
// Utils
import HttpRequest from '../../utils/HttpRequest';
import { throttle } from 'underscore';
// Config
import config from '../../common/config';

// ----- Help Functions ----- //
const getLocationInfo = (key) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/${key}?apikey=${config.credentials.weatherApi}`,
  url: 'https://testsh.free.beeceptor.com/getlocation',
});

const searchCities = (query) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/cities/autocomplete?apikey=${config.credentials.weatherApi}&q=${query}`,
  url: 'https://testsh.free.beeceptor.com/getcities',
});

// ----- Main Component ----- //
const WeatherSearch = ({ fetchWeather, setCurrentLocation }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  // This is throttling
  const getCities = useCallback(throttle(async (query) => {
    setLoading(true);
    try {
      const { data } = await searchCities(query);
      setOptions(data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, 250), []);

  // ----- Use Effects ----- //
  useEffect(() => {
    if (!searchValue) {
      setOptions([]);
    } else {
      const wasCitySelected = options.find((option) => option.LocalizedName === searchValue);
      if (!wasCitySelected) {
        getCities(searchValue);
      }
    }
  }, [searchValue]);

  return (
    <Autocomplete
      style={{ width: '40%', marginBottom: '30px' }}
      filterOptions={(x) => x}
      options={options}
      getOptionLabel={(option) => option.LocalizedName || ''}
      onInputChange={(e, newValue) => setSearchValue(newValue)}
      onChange={async (e, selectedValue) => {
        if (selectedValue) {
          const { Key, LocalizedName, Country } = selectedValue;
          const { data } = await getLocationInfo(Key);
          const { GeoPosition } = data;
          const { Latitude, Longitude } = GeoPosition;
          fetchWeather(Key);
          setCurrentLocation({
            city: LocalizedName,
            country: Country.LocalizedName,
            key: Key,
            coords: { latitude: Latitude, longitude: Longitude },
          });
        }
      }}
      freeSolo
      renderInput={(props) => (
        <TextField
          {...props}
          label="Search location"
          InputProps={{
            ...props.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {props.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default WeatherSearch;

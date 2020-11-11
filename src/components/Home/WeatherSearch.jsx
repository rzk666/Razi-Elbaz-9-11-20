import React, { useCallback, useEffect, useState } from 'react';
// Components
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
// Utils
import HttpRequest from '../../utils/HttpRequest';
import { throttle } from 'underscore';
// Config
import config from '../../common/config';

const searchCities = (query) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/cities/autocomplete?apikey=${config.credentials.weatherApi}&q=${query}`,
  url: 'https://testsh.free.beeceptor.com/getcities',
});

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
      onChange={(e, selectedValue) => {
        if (selectedValue) {
          const { Key, LocalizedName, Country } = selectedValue;
          fetchWeather(Key);
          setCurrentLocation({
            city: LocalizedName,
            country: Country.LocalizedName,
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

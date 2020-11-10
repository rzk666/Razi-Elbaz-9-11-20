import React, { useCallback, useEffect, useState } from 'react';
// Components
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
// Utils
import HttpRequest from '../../utils/HttpRequest';
import { throttle } from 'underscore';
// Config
import config from '../../common/config';
// Styles
import styles from './WeatherSearch.module.scss';

const searchCities = (query) => HttpRequest()({
  method: 'get',
  // This is the url for production
  // url: `${config.api.url}/locations/v1/cities/autocomplete?apikey=${config.credentials.weatherApi}&q=${query}`,
  url: 'https://testsh.free.beeceptor.com/getcities',
});

const WeatherSearch = ({ prop }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // This is throttling
  const getCities = useCallback(throttle(async (searchValue) => {
    setLoading(true);
    const { data } = await searchCities(searchValue);
    setOptions(data);
    setLoading(false);
  }, 250), []);

  // ----- Use Effects ----- //
  useEffect(() => {
    if (!searchValue) {
      setOptions([]);
    } else {
      getCities(searchValue);
    }
  }, [searchValue]);

  return (
    <Autocomplete
      filterOptions={(x) => x}
      fullWidth
      variant="error"
      options={options}
      getOptionLabel={(option) => option.LocalizedName || ''}
      onInputChange={(e, newValue) => setSearchValue(newValue)}
      onChange={(e, newValue) => {
        // Call server here getNewOptions(newValue);
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

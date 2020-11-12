import React, { useCallback, useEffect, useState } from 'react';
// Components
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
import ErrorToast from '../common/ErrorToast';
// APIs
import { getLocationInfo, searchCities } from '../../common/api-requests';
// Utils
import { throttle } from 'underscore';

// ----- Main Component ----- //
const WeatherSearch = ({ fetchWeather, setCurrentLocation }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [hasError, setError] = useState(false);
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
    <>
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
      <ErrorToast hasError={hasError} onClose={() => setError(false)} />
    </>
  );
};

export default WeatherSearch;

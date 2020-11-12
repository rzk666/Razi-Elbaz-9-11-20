import React from 'react';
// Components
import { Card, withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
// Libs
import { getCelcious } from '../../common/libs';
// Animations
import { AnimateOpacityHover, AnimateScaleClick } from '../common/Animations';
// Styles
import styles from './Favorite.module.scss';

// ----- Help Components ----- //
const FavoriteContainer = withStyles({
  root: {
    borderRadius: 5,
    border: 0,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})(Card);

// ----- Main Component ----- //
const Favorite = ({
  data, tempratureType, style,
}) => {
  const {
    WeatherIcon, WeatherText, Temperature, key, city, country, coords,
  } = data;
  const { Imperial } = Temperature;
  const { Value } = Imperial;
  const formattedTemperature = tempratureType === 'F' ? Value : getCelcious(Value);
  const iconId = WeatherIcon / 10 >= 1 ? WeatherIcon : `0${WeatherIcon}`;
  return (
    <Link to={{
      pathname: '/',
      currentFavorite: {
        key,
        city,
        country,
        isFavorite: true,
        coords,
      },
      favoriteFullData: data,
    }}
    >
      <AnimateOpacityHover>
        <AnimateScaleClick>
          <FavoriteContainer className={styles.container} style={style}>
            <h2 className={styles.title}>{city}</h2>
            <div className={styles.details_container}>
              <img src={`https://developer.accuweather.com/sites/default/files/${iconId}-s.png`} alt="" />
              <p>{WeatherText}</p>
            </div>
            <div className={styles.temprature}>
              {`${formattedTemperature}°${tempratureType}`}
            </div>
          </FavoriteContainer>
        </AnimateScaleClick>
      </AnimateOpacityHover>
    </Link>
  );
};

export default Favorite;

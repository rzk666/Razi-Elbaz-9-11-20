import React from 'react';
// Components
import { Skeleton } from '@material-ui/lab';
import Favorite from '../components/Favorites/Favorite';
// styles
import styles from './FavoritesView.module.scss';

// ----- Consts & Dicts ----- //
const CARD_STYLES = {
  height: '250px',
  width: '180px',
  marginRight: '20px',
  marginBottom: '20px',
};

const FavoritesView = ({
  favorites,
  tempratureType,
}) => (
  <div className={styles.wrapper}>
    {!favorites.length && 'You haven\'t selected any favorite cities'}
    {favorites.map((favorite) => {
      if (typeof favorite === 'string') {
        return (
          <Skeleton
            variant="rect"
            style={CARD_STYLES}
            animation="wave"
          />
        );
      }
      return (
        <Favorite
          style={CARD_STYLES}
          tempratureType={tempratureType}
          data={favorite}
        />
      );
    })}
  </div>
);

export default FavoritesView;

import React from 'react';
// styles
import styles from './FavoritesView.module.scss';

const FavoritesView = ({
  favorites,
}) => (
  <div className={styles.wrapper}>
    {favorites.map((favorite) => {
      if (typeof favorite === 'string') {
        return <div>LOADING</div>;
      }
      return <div>DONE</div>;
    })}
  </div>
);

export default FavoritesView;

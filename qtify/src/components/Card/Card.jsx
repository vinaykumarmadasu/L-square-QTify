import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import styles from './Card.module.css';

function Card({ album }) {
  return (
    <div className={styles.card}>
      <img src={album.image || 'https://via.placeholder.com/200'} alt={album.title || 'Album Image'} className={styles.image} />
      <div className={styles.footer}>
        <Chip label={`${album.follows || 0} Follows`} className={styles.chip} />
      </div>
      <h3 className={styles.title}>{album.title || 'No Title Available'}</h3>
    </div>
  );
}

Card.propTypes = {
  album: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    follows: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
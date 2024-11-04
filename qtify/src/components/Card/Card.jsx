import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import styles from './Card.module.css';

function Card({ album }) {
  return (
    <div className={styles.card}>
      <img src={album.image} alt={album.title} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.title}>{album.title}</h3>
        <Chip label={`${album.follows} Follows`} className={styles.chip} />
        <p className={styles.description}>New English Songs</p>
      </div>
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
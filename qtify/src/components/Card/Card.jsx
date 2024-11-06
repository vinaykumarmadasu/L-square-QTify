import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
import styles from './Card.module.css';

function Card({ album }) {
  return (
    <div className={styles.card}>
      <img
        src={album.image || 'https://via.placeholder.com/200'}
        alt={album.title || 'Album Image'}
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.title}>{album.title || 'No Title Available'}</h3>
        <Chip
          label={`${album.follows || 0} Follows`}
          aria-label={`${album.follows || 0} followers`}
          className={styles.chip}
          sx={{
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            fontSize: '0.75rem',
            padding: '5px',
            marginTop: '4px',
          }}
        />
        <p className={styles.description}>New English Songs</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  album: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    follows: PropTypes.number,
  }).isRequired,
};

Card.defaultProps = {
  album: {
    image: 'https://via.placeholder.com/200',
    title: 'No Title Available',
    follows: 0,
  },
};

export default Card;

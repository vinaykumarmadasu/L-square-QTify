import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';

function Section({ title, isTopAlbums }) {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const endpoint = isTopAlbums
          ? 'https://qtify-backend-labs.crio.do/albums/top'
          : 'https://qtify-backend-labs.crio.do/albums/new';

        const response = await axios.get(endpoint);

        if (response.data && Array.isArray(response.data)) {
          if (isTopAlbums) {
            setTopAlbums(response.data);
          } else {
            setNewAlbums(response.data);
          }
        }
      } catch (error) {
        console.log(`Error fetching ${title}`, error);
      }
    };

    fetchAlbums();
  }, [isTopAlbums, title]);

  const albums = isTopAlbums ? topAlbums : newAlbums;

 // Display exactly 7 albums starting from currentIndex
const displayedAlbums = showAll ? albums : albums.slice(currentIndex, currentIndex + 7);

const scrollContainerId = isTopAlbums ? 'topAlbumsScrollContainer' : 'newAlbumsScrollContainer';

  const handleNext = () => {
    // Move forward by 1 card if there are more than 7 cards remaining after current index
    if (currentIndex + 7 < albums.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    // Move back by 1 card but ensure index doesn't go below 0
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const container = document.getElementById(scrollContainerId);
    if (container) {
      const cardWidth = container.scrollWidth / (showAll ? albums.length : 7);
      container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
    }
  }, [currentIndex, scrollContainerId, albums, showAll]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.showAllButton} onClick={() => {
            setShowAll(prev => !prev);
            if (!showAll) setCurrentIndex(0);
          }}>
            {showAll ? 'Collapse' : 'Show All'}
          </button>
        </div>

        <div className={styles.carouselContainer}>
          {!showAll && (
            <button
              className={styles.carouselControl}
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <span className={styles.carouselIcon}>&lt;</span>
            </button>
          )}

          <div className={styles.scrollContainer} id={scrollContainerId}>
            <div className={showAll ? styles.gridCardContainer : styles.cardContainer}>
              {displayedAlbums.map(album => (
                <Card key={album.id} album={album} />
              ))}
            </div>
          </div>

          {!showAll && (
            <button
              className={styles.carouselControl}
              type="button"
              onClick={handleNext}
              disabled={currentIndex + 7 >= albums.length} // Disable Next if fewer than 7 cards remain
            >
              <span className={styles.carouselIcon}>&gt;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Section;

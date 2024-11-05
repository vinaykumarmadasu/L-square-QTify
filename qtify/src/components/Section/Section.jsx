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

  // Determine the displayed albums based on showAll state and currentIndex
  const displayedAlbums = showAll
    ? (isTopAlbums ? topAlbums : newAlbums)
    : (isTopAlbums ? topAlbums.slice(currentIndex, currentIndex + 6) : newAlbums.slice(currentIndex, currentIndex + 6));

  const scrollContainerId = isTopAlbums ? 'topAlbumsScrollContainer' : 'newAlbumsScrollContainer';

  const handleNext = () => {
    const totalAlbums = isTopAlbums ? topAlbums.length : newAlbums.length;
    if (currentIndex + 1 < totalAlbums) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

   // Effect to scroll the container based on the current index
   useEffect(() => {
    const container = document.getElementById(scrollContainerId);
    if (container) {
      const cardWidth = container.scrollWidth / ( showAll ? displayedAlbums.length : 6); // Calculate the width of one card
      container.scrollTo({ left: cardWidth * currentIndex, behavior: 'smooth' });
    }
  }, [currentIndex, scrollContainerId, displayedAlbums, showAll]);
  
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.showAllButton} onClick={() => {
            setShowAll(prev => !prev);
            // Reset the current index when toggling Show All
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
              disabled={currentIndex === 0} // Disable button when at the start
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
              disabled={(isTopAlbums ? topAlbums.length : newAlbums.length) - currentIndex <= 1} // Disable button when at the end
            >
              <span className={styles.carouselIcon}>&gt;</span>
            </button>
          )}
        </div>
      </div>
      {/* <p>Total Albums: {isTopAlbums ? topAlbums.length : newAlbums.length}</p> */}
    </div>
  );
}

export default Section;

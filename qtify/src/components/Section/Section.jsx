import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';

function Section({ title, isTopAlbums }) {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const endpoint = isTopAlbums
          ? 'https://qtify-backend-labs.crio.do/albums/top'
          : 'https://qtify-backend-labs.crio.do/albums/new';
        
        const response = await axios.get(endpoint);
        
        // Check if the expected album exists in the response
        if (response.data && Array.isArray(response.data)) {
          console.log('Fetched albums:', response.data);
          
          // Set the appropriate state based on isTopAlbums
          if (isTopAlbums) {
            setTopAlbums(response.data);
          } else {
            setNewAlbums(response.data);
          }
        } else {
          console.log('Unexpected response format', response);
        }
      } catch (error) {
        console.log(`Error fetching ${title}`, error);
      }
    };

    fetchAlbums();
  }, [isTopAlbums, title]);

  // Determine the displayed albums based on the isTopAlbums prop
  const displayedAlbums = showAll ? (isTopAlbums ? topAlbums : newAlbums) : (isTopAlbums ? topAlbums.slice(0, 7) : newAlbums.slice(0, 7));
  
  const scrollContainerId = isTopAlbums ? 'topAlbumsScrollContainer' : 'newAlbumsScrollContainer';

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.showAllButton} onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Collapse' : 'Show All'}
          </button>
        </div>

        <div className={styles.carouselContainer}>
          <button
            className={styles.carouselControl}
            type="button"
            onClick={() => document.getElementById(scrollContainerId).scrollBy({ left: -300, behavior: 'smooth' })}
          >
            <span className={styles.carouselIcon}>&lt;</span> {/* Left arrow */}
          </button>

          <div className={styles.scrollContainer} id={scrollContainerId}>
            <div className={styles.cardContainer}>
              {displayedAlbums.map(album => (
                <Card key={album.id} album={album} />
              ))}
            </div>
          </div>

          <button
            className={styles.carouselControl}
            type="button"
            onClick={() => document.getElementById(scrollContainerId).scrollBy({ left: 300, behavior: 'smooth' })}
          >
            <span className={styles.carouselIcon}>&gt;</span> {/* Right arrow */}
          </button>
        </div>
      </div>
      <p>Total Albums: {isTopAlbums ? topAlbums.length : newAlbums.length}</p>
    </div>
  );
}

export default Section;
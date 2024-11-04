import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Section.module.css';

function Section({ title, isTopAlbums }) {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchTopAlbums() {
      try {
        const response = await axios.get('https://qtify-backend-labs.crio.do/albums/top');
        console.log(response.data);
        setTopAlbums(response.data);
      } catch (error) {
        console.error('Error fetching top albums:', error);
      }
    }

    async function fetchNewAlbums() {
      try {
        const response = await axios.get('https://qtify-backend-labs.crio.do/albums/new');
        console.log(response.data);
        setNewAlbums(response.data);
      } catch (error) {
        console.error('Error fetching new albums:', error);
      }
    }

    if (isTopAlbums) {
      fetchTopAlbums();
    } else {
      fetchNewAlbums();
    }
  }, [isTopAlbums]);

  // Determine which albums to display based on the `isTopAlbums` prop
  const albumsToDisplay = isTopAlbums ? topAlbums : newAlbums;
  const displayedAlbums = showAll ? albumsToDisplay : albumsToDisplay.slice(0, 7);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.titleContainer}>
          <h2 className={isTopAlbums ? styles.topTitle : styles.newTitle}>{title}</h2>
          <button className={styles.showAllButton} onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Collapse' : 'Show All'}
          </button>
        </div>
        <div className={styles.scrollContainer} ref={scrollContainerRef}>
          <button className={styles.scrollButton} onClick={scrollLeft}>{"<"}</button>
          {displayedAlbums.map(album => (
            <Card key={album.id} album={album} />
          ))}
          <button className={styles.scrollButton} onClick={scrollRight}>{">"}</button>
        </div>
      </div>
      <p>Total Albums: {albumsToDisplay.length}</p> {/* Optional: Display total count for verification */}
    </div>
  );
}

export default Section;
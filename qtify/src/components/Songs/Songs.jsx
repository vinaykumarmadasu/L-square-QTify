import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import styles from './Songs.module.css';

const Songs = () => {
    const [genres, setGenres] = useState([]);
    const [songs, setSongs] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [scrollIndex, setScrollIndex] = useState(0);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://qtify-backend-labs.crio.do/genres');
                const data = response.data;
                if (Array.isArray(data.data)) {
                    const genreList = [{ key: 'All', label: 'All' }, ...data.data];
                    setGenres(genreList);
                } else {
                    console.log('Unexpected data format received for genres:', data);
                }
            } catch (error) {
                console.log('Error fetching genres:', error);
            }
        };

        const fetchSongs = async () => {
            try {
                const response = await axios.get('https://qtify-backend-labs.crio.do/songs');
                const data = response.data;
                if (Array.isArray(data)) {
                    setSongs(data);
                    console.log('Fetched songs:', data);
                } else {
                    console.log('Unexpected data format received for songs:', data);
                }
            } catch (error) {
                console.log('Error fetching songs:', error);
            }
        };

        fetchGenres();
        fetchSongs();
    }, []);

    const handleTabChange = (genreKey) => {
        setSelectedGenre(genreKey);
        setScrollIndex(0);
        console.log('Selected Genre:', genreKey);
    };

    // Updated filteredSongs with debug output
    const filteredSongs = selectedGenre === 'All'
        ? songs
        : songs.filter(song => {
            console.log(`Song Title: ${song.title}, Song Genre: ${song.genre}, Selected Genre: ${selectedGenre}`);
            return song.genre === selectedGenre;
        });

    const handleScrollLeft = () => {
        setScrollIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleScrollRight = () => {
        setScrollIndex((prevIndex) => Math.min(prevIndex + 1, Math.ceil(filteredSongs.length / 7) - 1));
    };

    const visibleSongs = filteredSongs.slice(scrollIndex * 7, (scrollIndex + 1) * 7);

    return (
        <section className={styles.songsSection}>
            <h2 className={styles.songsTitle}>Songs</h2>
            <div className={styles.genreTabs}>
                {genres.map((genre) => (
                    <button
                        key={genre.key}
                        className={`${styles.genreTab} ${selectedGenre === genre.key ? styles.activeTab : ''}`}
                        onClick={() => handleTabChange(genre.key)}
                    >
                        {genre.label}
                    </button>
                ))}
            </div>
            <div className={styles.carouselContainer}>
                <button className={styles.carouselControl} onClick={handleScrollLeft} disabled={scrollIndex === 0}>
                    &#8249;
                </button>
                <div className={styles.cardsContainer}>
                    {visibleSongs.length > 0 ? (
                        visibleSongs.map((song) => (
                            <Card key={song.id} album={song} />
                        ))
                    ) : (
                        <p className={styles.noSongsMessage}>No songs available for this genre.</p>
                    )}
                </div>
                <button className={styles.carouselControl} onClick={handleScrollRight} disabled={scrollIndex >= Math.ceil(filteredSongs.length / 7) - 1}>
                    &#8250;
                </button>
            </div>
        </section>
    );
};

export default Songs;

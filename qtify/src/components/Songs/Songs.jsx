import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Tabs, Tab, Box } from '@mui/material';
import Carousel from '../Carousel/Carousel';
import styles from './Songs.module.css'; // Import CSS module

const Songs = () => {
    const [genres, setGenres] = useState([]);
    const [songs, setSongs] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('All');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://qtify-backend-labs.crio.do/genres');
                const data = response.data;
                console.log('Genres data:', data); // Log the data for debugging
                if (Array.isArray(data)) {
                    setGenres(data);
                } else {
                    console.log('Expected an array but got:', data);
                    setGenres([]); // Fallback to an empty array if not an array
                }
            } catch (error) {
                console.log('Error fetching genres:', error);
            }
        };

        const fetchSongs = async () => {
            try {
                const response = await axios.get('https://qtify-backend-labs.crio.do/songs');
                const data = response.data;
                console.log('Songs data:', data); // Log the data for debugging
                setSongs(data);
            } catch (error) {
                console.log('Error fetching songs:', error);
            }
        };

        fetchGenres();
        fetchSongs();
    }, []);

    const handleTabChange = (event, newValue) => {
        setSelectedGenre(newValue);
    };

    const filteredSongs = selectedGenre === 'All' 
        ? songs 
        : songs.filter(song => song.genre === selectedGenre);

    return (
        <section className={styles.songsSection}>
            <h2 className={styles.songsTitle}>Songs</h2>
            <Tabs 
                value={selectedGenre} 
                onChange={handleTabChange} 
                indicatorColor="primary" 
                textColor="primary"
                className={styles.tabs}
            >
                <Tab label="All" value="All" />
                {genres.length > 0 ? (
                    genres.map(genre => (
                        <Tab key={genre} label={genre} value={genre} />
                    ))
                ) : (
                    <Tab label="No genres available" value="" disabled />
                )}
            </Tabs>
            <Box>
                <Carousel albums={filteredSongs} />
            </Box>
        </section>
    );
};

export default Songs;

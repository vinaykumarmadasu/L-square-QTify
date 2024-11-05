
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, Tab, Box } from '@mui/material';
import Carousel from '../Carousel/Carousel';
import styles from './Songs.module.css';

const Songs = () => {
    const [genres, setGenres] = useState([]);
    const [songs, setSongs] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('All');

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('https://qtify-backend-labs.crio.do/genres');
                const data = response.data;
                console.log('Genres response:', data); // Log the entire response for debugging
                
                if (Array.isArray(data.data)) {
                    const genreList = data.data.map((genre) => genre.key); // Use `key` as the genre value
                    setGenres(genreList);
                } else {
                    console.log('Expected an array but got:', data);
                    setGenres([]); // Fallback to an empty array if the format is unexpected
                }
            } catch (error) {
                console.log('Error fetching genres:', error);
            }
        };

        const fetchSongs = async () => {
            try {
                const response = await axios.get('https://qtify-backend-labs.crio.do/songs');
                const data = response.data;
                console.log('Songs response:', data); // Log the entire response for debugging
                if (Array.isArray(data)) {
                    setSongs(data); // Ensure data is an array before setting it
                } else {
                    console.log('Expected an array but got:', data);
                }
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

    // Log all songs and the selected genre for better debugging
    console.log('Selected Genre:', selectedGenre);
    console.log('All Songs:', songs);

    // Filter songs based on the selected genre
    const filteredSongs = selectedGenre === 'All' 
        ? songs 
        : songs.filter(song => song.genre === selectedGenre);

    console.log('Filtered Songs:', filteredSongs); // Log filtered songs to verify the output

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
                    genres.map((genre) => (
                        <Tab key={genre} label={genre} value={genre} />
                    ))
                ) : (
                    <Tab label="No genres available" value="" disabled />
                )}
            </Tabs>
            <Box>
                {/* Check if filteredSongs is not empty before passing to Carousel */}
                {filteredSongs.length > 0 ? (
                    <Carousel albums={filteredSongs} />
                ) : (
                    <p className={styles.noSongsMessage}>No songs available for this genre.</p>
                )}
            </Box>
        </section>
    );
};

export default Songs;

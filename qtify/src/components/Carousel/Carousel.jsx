
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import styles from './Carousel.module.css';

const Carousel = ({ albums }) => {
  console.log('Albums data in Carousel:', albums); // Log to verify data in Carousel

  if (albums.length === 0) {
    return <p>No albums available.</p>; // Handle empty array case
  }

  return (
    <div className={styles.carouselContainer}>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {albums.map((album) => (
          <SwiperSlide key={album.id} className={styles.swiperSlide}>
            <div className={styles.albumCard}>
              <img src={album.coverImage || album.imageUrl} alt={album.title || album.name} />
              <h3>{album.title || album.name}</h3>
              <p>{album.artist || album.artistName}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

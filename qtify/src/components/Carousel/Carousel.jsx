import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Carousel.module.css'; // Import the CSS module

const Carousel = ({ albums }) => {
    return (
        <div className="carousel-container">
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
                    <SwiperSlide key={album.id} className="swiper-slide">
                        <div className="album-card">
                            <img src={album.coverImage} alt={album.title} />
                            <h3>{album.title}</h3>
                            <p>{album.artist}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Carousel;

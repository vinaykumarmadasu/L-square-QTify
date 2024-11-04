import React from "react";
import styles from "./Hero.module.css";
import headphonesImage from "../../assets/vibrating-headphone 1.png";

function Hero() {
  return (
    <div className={styles.hero}>
      <div>
        <h2>100 Thousand Songs, ad-free</h2>
        <h2>Over thousands podcast episodes</h2>
      </div>
      <div>
        <img src={headphonesImage} alt="Headphones" />
      </div>
   </div>
  );
}

export default Hero;
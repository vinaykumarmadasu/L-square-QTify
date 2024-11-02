import React from "react";
import styles from "./Hero.module.css";
import headphonesImage from "../../assets/hero_headphones.png";

function Hero() {
  return (
    <div className={styles.hero}>
      {/* <div>
        <h1>100 Thousand Songs, ad-free</h1>
        <h1>Over thousands podcast episodes</h1>
      </div> */}
      <div>
        <img
          src={headphonesImage}//{require("../../assets/hero_headphones.png")}
         // width={212}
          alt="Headphones"
        />
      </div>
    </div>
  );
}

export default Hero;

import React from "react";
import LogoImage from "../../assets/logo.png";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={LogoImage} alt="logo" width={67} />
      <span className={styles.logoText}></span>
    </div>
  );
}

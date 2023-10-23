import React, { useState } from "react";
import "../../styling/Home.css";
import mercedesImage from "../../images/home-mercedes-side.png";
import LogoDark from "../../images/LogoDark.png";
import LoginIcon from "@mui/icons-material/Login";
import GlobeImage from "../../images/globe.png";
import { ExpandLess } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const toCarsPath = () => {
    navigate("/cars");
  };
  const toLogin = () => {
    navigate("/signin");
  };

  const scrolltoIntro = () => {
    let introSection = document.querySelector(".sectionintro");
    introSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-body">
      <div className="section sectionintro">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="home-banner"
        >
          <div className="home-banner-text-wrapper">
            <h1>Renting is easy</h1>
            <p className="rent-now-button">Rent now</p>
          </div>
          <div className="home-banner-glass-wrapper">
            <div>20+ Cars</div>
            <div>200+ Customers</div>
          </div>
        </motion.div>
        <div className="home-navigation-bar">
          <img src={LogoDark} onClick={scrolltoIntro} />
          <div className="home-navigation-buttons-container">
            <p className="home-navigation-button" onClick={toCarsPath}>
              Cars
            </p>
            <p className="home-navigation-button">Contact us</p>
            <p className="home-navigation-button dark-button" onClick={toLogin}>
              <LoginIcon sx={{ fontSize: "15px" }}></LoginIcon> Log in
            </p>
          </div>
        </div>
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          src={mercedesImage}
          className="mercedes-home-background"
          transition={{ duration: 1 }}
        />
      </div>
      <div className="section sectionservice">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="home-services-container"
        >
          <div className="home-services-text-wrapper">
            <h1>Rent from anywhere, anytime.</h1>
            <p>
              Thanks to our online system, now you can order from anywhere in
              anytime, without stressing about the time of reservations. Our
              quality cars ensure you a good expierience with 24/h support.
            </p>
          </div>
          <div className="home-services-image">
            <img src={GlobeImage} className="globe-image" />
          </div>
        </motion.div>
      </div>
      <div className="section sectionaboutus">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="about-us-container"
        >
          <h1>About us</h1>
          <div className="horizontal-line"></div>
          <p>
            The year 2018 was the year that <b>Aviero</b> was born. Since then
            we are providing clients in Kosovo with high quality services in the
            rental field. Thanks to our online system, we have been a unique
            choice in this market.
          </p>
        </motion.div>
      </div>
      <div className="footer">
        <img src={LogoDark} />
        <p>
          All rights reserved <b>Aviero</b> {currentYear}.
        </p>
        <button onClick={scrolltoIntro}>
          <ExpandLess></ExpandLess>
          Go to the top
        </button>
      </div>
    </div>
  );
};

export default HomeView;

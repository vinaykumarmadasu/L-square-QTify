import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from './components/Section/Section';
import Songs from './components/Songs/Songs';
import Carousel from './components/Carousel/Carousel';
import './App.css';

function App() {
  const searchData = [];
  return (
    <Router>
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Navbar searchData={searchData} />
      <div className="hero-wrapper">
          <Hero />
        </div>
        <div className="album-sections">
        <Section title="Top Albums" isTopAlbums={true}>
        <Carousel />
        </Section>
        <Section title="New Albums" isTopAlbums={false}>
        <Carousel />
        </Section>
        <Songs />
        </div>
    </div>
    </Router>
  );
}

export default App;

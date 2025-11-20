import React, { useState } from "react";
import "./style.scss";
import { useHttp } from "./hooks/http";

const API_KEY = "b8c1572d189de60f5480324c6b53d9ab";
const KELVIN_TO_CELSIUS = 273;

function WeatherApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=${API_KEY}`;
  const [isLoading, fetchedData] = useHttp(apiUrl, [isSubmit], isSubmit);

  const { name, sys, weather = [], main } = fetchedData || {};

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmit(!isSubmit);
  };

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - KELVIN_TO_CELSIUS).toFixed(2);
  };

  const renderHeader = () => (
    <div id="header-container">
      <div id="header">
        <h3 id="header-name">Weather</h3>
        <small>
          <span>R</span> the whole world comes to you
        </small>
        <nav>
          <li>Home</li>
          <li>News</li>
          <li>Forecast</li>
          <li>Aboutus</li>
          <li>Contactus</li>
        </nav>
      </div>
      <div id="square-boxes">
        <div />
        <div />
      </div>
      <div id="title">
        <h1>
          Hello<span>.</span>
          <br /> I am
          <br />
          Patrick
        </h1>
      </div>
      <div id="cover">
        Des
        <br />
        <span>-</span>ign
      </div>
    </div>
  );

  const renderLoader = () => (
    <div id="loader">
      <div id="circle"></div>
      <div id="circle"></div>
      <div id="circle"></div>
    </div>
  );

  const renderWeatherData = () => {
    if (!fetchedData) return null;

    const weatherMain = weather[0]?.main || "";
    const weatherDescription = weather[0]?.description || "";

    return (
      <>
        <h2 id="city-name">
          {name}, {sys?.country}
        </h2>
        <span id="balloon"></span>
        <h2 id="weather-state">{weatherMain}</h2>
        <div id="temprature">
          <div id="main-temprature">{convertKelvinToCelsius(main.temp)}</div>
          <div id="secondary-temprature">
            <div>{convertKelvinToCelsius(main.temp_min)}</div>
            <div>{convertKelvinToCelsius(main.temp_max)}</div>
          </div>
        </div>
        <small>{weatherDescription}</small>
        <div id="weather-tag">Weather</div>
      </>
    );
  };

  return (
    <div id="weather-app">
      {renderHeader()}
      <div id="body-wrapper">
        <strong>Just Type The City's Name</strong>
        <small>You Must Spell Correctly</small>
        <form id="search-bar" onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            name="city"
            type="text"
            placeholder="Enter The Name Here"
            onChange={handleSearchChange}
          />
          <button id="search-btn" type="submit">
            Find
          </button>
        </form>
        <ul>
          <li>Home</li>
          <li>Weather</li>
        </ul>
        {isLoading && renderLoader()}
        {renderWeatherData()}
      </div>
    </div>
  );
}

export default WeatherApp;

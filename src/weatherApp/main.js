import React, { useState, useEffect } from 'react';
import './style.scss';
import { useHttp } from "./hooks/http";
function WeatherApp() {

    // initialized the input to an empty string
    const [searchTerm, setSearchTerm] = useState('');

    // Initialize the state of submit to false 
    const [isSubmit, setIsSubmit] = useState(false);

    // Use array destruction to get isLoading and fetchedData from the imported userHttp hook
    const [isLoading, fetchedData] = useHttp(`http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}
    &APPID=b8c1572d189de60f5480324c6b53d9ab`, [isSubmit], isSubmit);

    // Use object destruction to get the desired properties out of the fetched data
    const { name, sys, weather, main } = fetchedData ? fetchedData : '';

    // Get the user input in the search bar to pass it to submitInput function
    const getSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    // Submit the userinput and call the custom hook to fetch the data matched with the input
    const submitInput = (event) => {
        // Prevent the form from actually submitting
        event.preventDefault();
        // Change the state of isSubmit so that useEffect can be re-called
        setIsSubmit(!isSubmit);
    }

    return (
        <div id="weather-app">
            <div id="header-container">
                <div id="header">
                    <h3 id="header-name">Weather</h3>
                    <small><span>R</span> the whole world comes to you</small>
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
                    <h1>Hello<span>.</span><br /> I am<br />Patrick</h1>
                </div>
                <div id="cover">Des<br /><span>-</span>ign</div>
            </div>
            <div id="body-wrapper">
                <strong>Just Type The City's Name</strong>
                <small>You Must Spell Correctly</small>
                <form id="search-bar" onSubmit={submitInput}>
                    <input value={searchTerm} name="city" type="text" placeholder="Enter The Name Here" onChange={getSearchTerm}></input>
                    <button id="search-btn" type="submit">Find</button>
                </form>
                <ul>
                    <li>Home</li>
                    <li>Weather</li>
                </ul>
                {isLoading &&
                    <div id="loader">
                        <div id="circle"></div>
                        <div id="circle"></div>
                        <div id="circle"></div>
                    </div>
                }
                {fetchedData &&
                    <>
                        <h2 id="city-name">{name}, {sys.country}</h2>
                        <span id="balloon"></span>
                        <h2 id="weather-state">{weather.map(i => i.main)}</h2>
                        <div id="temprature">
                            <div id="main-temprature">{(main.temp - 272).toFixed(2)}</div>
                            <div id="secondary-temprature">
                                <div>{(main.temp_min - 272).toFixed(2)}</div>
                                <div>{(main.temp_max - 272).toFixed(2)}</div>
                            </div>
                        </div>
                        <small>{weather.map(i => i.description)}</small>
                        <div id="weather-tag" >Weather</div>
                    </>
                }
            </div>
        </div >
    )
}

export default WeatherApp; 
import { useState, useEffect } from 'react';

/*Create a custom hook to handle requests from any api and not just 
be limited to one endpoint*/
export const useHttp = (baseURL, dependancies, isSubmit) => {

    // Inizialize isLoading to false 
    const [isLoading, setLoading] = useState(false);

    // Initialize the fetched data to an empty string
    const [fetchedData, setFetchedData] = useState(null);

    useEffect(() => {
        /*Check if isSubmit is true before fetching the corresponding 
        data*/

        // set isLoading to true until we get the data
        setLoading(true);

        // Start fetching the data from the url received
        fetch(baseURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch. ');
                }
                return response.json();
            })
            // Return the data when fetched successfully
            .then(data => {
                setLoading(false);
                setFetchedData(data);
            })
            /*Show an alert when fetching encounters an error and stop the 
            loader accordingly*/
            .catch(err => {
                alert("Please insert a valid name")
                setLoading(false);
            })
    }, dependancies)
    // Returning the data to use them later in displaying the weather
    return [isLoading, fetchedData];
};


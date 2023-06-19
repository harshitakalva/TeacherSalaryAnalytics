import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios'


const Visualisation = () => {

    const [responseData, setResponseData] = useState([]);

    // Fetch data from MongoDB

    /* useEffect(() => {
        // Fetch data from MongoDB
        fetch('http://localhost:3001/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then(data => {

                console.log(data)
                setResponseData(data);
                // Store data in setResponseData
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error
            });
    }, []); */



    /* useEffect(() => {

        fetch('http://localhost:3001/analytics', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                console.log(data.result); // Print the result in the console
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle the error
            });
    }, []); */


    /* useEffect(() => {
        fetch('http://localhost:3001/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not OK');
            }
            return response.json();
          })
          .then(data => {
            console.log(data.result); // Print the result in the console
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle the error
          });
      }, []); */


      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/analytics');
                console.log(response.data)
                //setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);




    return (
        <div>
            <h1>Visualisation Page </h1>
        </div>

    )




}


export default Visualisation;
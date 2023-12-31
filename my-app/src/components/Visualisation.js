import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios'
import SalaryGraph from './BarGraph';


const Visualisation = () => {

    const [responseData, setResponseData] = useState([]);
      
        useEffect(() => {
        fetch("http://localhost:3001/analytics", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response)
            .then(data => {
                console.log(data); // Process the response from the server
            })
            .catch(error => {
                console.error('Error:', error);
                //console.log(response)
                // Handle the error
            });
        },[]
      ) 




    return (
        <div>
            <strong><h1 style={{'text-align': 'center',
    'padding': '20px',
    'font-family': 'sans-serif'}}>Data Analytics Visualisation</h1></strong>
            <SalaryGraph/>
        </div>

    )


}


export default Visualisation;
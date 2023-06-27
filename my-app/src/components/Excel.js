import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import './Form.css'
import *as xlsx from 'xlsx';
import { read, utils } from 'xlsx';




//Creating a basic form UI which handles file type (only excel) and then post the data
const MyExcel = () => {
    const navigate = useNavigate()
    const [excelData, setExcelData] = useState({

        file: null
    });
    const [count, setCount] = useState(0);
    const [displayData, setDisplayData] = useState([]);

    const handleVisual = (event) => {
        navigate('/visualisation')
    }


    const handleChange = (event) => {

        setExcelData(() => ({
            ...excelData,
            [event.target.name]: event.target.value
        }))


    };


    // Make a POST request to Flask backend
    const handleSubmit = (event) => {

        event.preventDefault();
        //console.log(excelData)
        const form = document.getElementById('myExcel');
        const excelData = new FormData(form);

        setCount((prevCount) => prevCount + 1);
        const reader = new FileReader(); // Create a FileReader object

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' }); // Read the uploaded file as an array
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelJson = utils.sheet_to_json(sheet);

            console.log(excelJson);
            setDisplayData(excelJson)

        
            // ... Further processing of the excelJson data
        };

        reader.readAsArrayBuffer(excelData.get('file'));

        fetch('http://localhost:3001/excel', {
            method: 'POST',
            body: excelData,
        })
            /* .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not OK');
              }
              return response.json();
            }) */

            .then((data) => {
                console.log('Data inserted successfully:', data);

                // Perform any desired actions after successful data insertion
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle any errors that occurred during the data insertion process
            });
    };




    return (
        <>
            <head>
                <link rel='stylesheet' href='Form.css' />
            </head>
            <div>
                <div className='fade-in'>
                    <div>
                        <h3 >Upload only .xlsx format excel sheet. Upload how many ever excel sheets you want<br></br>
                            Click Show Analytics to get visualisation.<br></br>
                        </h3>

                    </div>

                    <form id='myExcel' className='register' onSubmit={handleSubmit} method='POST' encType="multipart/form-data">
                        <br></br>
                        <div>

                            <div className="form-group">
                                <label className="custom-file-label">Upload Excel Sheet:</label>
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    name="file"
                                    accept='.xlsx'
                                    onChange={handleChange}
                                />

                            </div>

                            <br></br>
                        </div>
                        <button type="submit" onClick={handleSubmit}>({count}) Upload</button>
                        <button onClick={handleVisual}>Show Analytics</button>
                    </form>
                </div>
                <br></br>
                <p>Most recently uploaded data will be displayed here for reference. </p> 
                <div className='table-container'>
                    

                    {displayData.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(displayData[0]).map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {displayData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}

export default MyExcel

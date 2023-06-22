import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import './Form.css'

//Creating a basic form UI and then post the data into mongoDB


//Creating a basic form UI which handles file type (only excel) and then post the data
const MyExcel = () => {
    const navigate = useNavigate()
    const [excelData, setExcelData] = useState({

        file: null
    });
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isAnalyticsClicked, setIsAnalyticsClicked] = useState(false);

  const handleSubmitClicked = () => {
    setIsSubmitClicked(true);
  };

  const handleAnalyticsClicked = () => {
    setIsAnalyticsClicked(true);
  };

    const styles = {
        input: {
            width: 400
        },
        h1: {
            color: 'red',
            justifyContent: 'center',
            display: 'flex'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

        },
    };

    const handleVisual = (event) => {
        navigate('/visualisation')
    }


    const handleChange = (event) => {
        //const { name, value } = event.target;
        //setFormData({
        //...formData,
        //[name]: value,
        //});


        setExcelData(() => ({
            ...excelData,
            [event.target.name]: event.target.value
        }))

    };
    // Only excel sheets can be uploaded
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            setExcelData({
                ...excelData,
                file,
            });
        } else {
            // Invalid file type, display an error alert
            setExcelData({
                file: null,
            });
            alert('Invalid file type. Please upload an Excel sheet.');

            setExcelData({
                file: null,
            });

        }
    };

    // Make a POST request to Flask backend
    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(excelData)
        const form = document.getElementById('myExcel');
        const excelData = new FormData(form);

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
                <div class='fade-in'>
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
                    <button type="submit" onClick={handleSubmit}>Upload</button>
                    
                    <button onClick={handleVisual}>Show Analytics</button>
                </form>
            </div>
        </>
    )
}

export default MyExcel

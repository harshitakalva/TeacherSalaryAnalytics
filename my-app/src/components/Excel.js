import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'

//Creating a basic form UI and then post the data into mongoDB

    
//Creating a basic form UI which handles file type (only excel) and then post the data
const MyExcel = () => {
    const navigate = useNavigate()
    const [excelData, setExcelData] = useState({
        
        file: null
    });

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
      
            

    return(
        <div style={styles.container}>
            <form id='myExcel' onSubmit={handleSubmit} method = 'POST' encType="multipart/form-data">
                <br></br>
                <div className="form-group">
                    <label>Upload Excel Sheet:</label><br></br>
                    <input
                        type="file"
                        className="form-control-file"
                        name="file"
                        accept = '.xlsx'
                        onChange={handleChange}
                    />
                    <br></br>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <br></br>
                <br></br>
                <button className="btn btn-primary" onClick={handleVisual}>Show Analytics</button>
            </form>
        </div>
    )
}

export default MyExcel

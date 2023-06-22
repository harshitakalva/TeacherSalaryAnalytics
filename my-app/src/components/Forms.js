import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css'

//Creating a basic form UI which handles file type (only excel) and then post the data
const MyForm = () => {
    const [formData, setFormData] = useState({
        degree: '',
        fte: '',
        years: '',
        baseIncome: '',
        ficaPayment: '',
        retirementPayment: '',
        totalSalary: '',
        feedback: '',
    });

    


    const handleChange = (event) => {
        //const { name, value } = event.target;
        //setFormData({
        //...formData,
        //[name]: value,
        //});


        setFormData(() => ({
            ...formData,
            [event.target.name]: event.target.value
        }))

    };
    // Only excel sheets can be uploaded
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            setFormData({
                ...formData,
                file,
            });
        } else {
            // Invalid file type, display an error alert
            setFormData({
                file: null,
            });
            alert('Invalid file type. Please upload an Excel sheet.');

            setFormData({
                file: null,
            });

        }
    };

    // Make a POST request to Flask backend
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)

        fetch("http://localhost:3001/submit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //alert("Data submitted! Click Show Analytics for visualisation.")
                showAlert('Data submitted! Click Show Analytics for visualization.'); // Process the response from the server
            })
            .catch(error => {
                console.error('Error:', error);
                //console.log(response)
                // Handle the error
            });
    };


    const showAlert = (message) => {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        const closeButton = document.querySelector('.alert .close');

        alertMessage.textContent = message;
        alertBox.style.display = 'block';

        closeButton.addEventListener('click', () => {
            alertBox.style.display = 'none';
        });
    };



    // HTML part of form and excel sheet upload
    return (
        <>
            <head>
                <link rel='stylesheet' href='Form.css' />
            </head>

            <div class='Background'>
                <div class='fade-in'>
                    <h3 >Fill the form and submit as many times as you want<br></br>
                        Click Show Analytics to get visualisation.<br></br>
                    </h3>
                    <p><strong>Note:</strong> Data will be visualised based on the data you provide along with historical data.</p>

                </div>

                <div>
                    <form onSubmit={handleSubmit} action='/submit' id='MyForm' className='register'>
                        <div className="form-group">
                            <label>Degree:</label>
                            <select
                                className="form-control"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select degree</option>
                                <option value="MA">MA</option>
                                <option value="BA">BA</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>FTE:</label>
                            <select
                                className="form-control"
                                name="fte"
                                value={formData.fte}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select FTE</option>
                                <option value="1">Full time</option>
                                <option value="0.5">Part time</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>How many years?:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="years"
                                value={formData.years}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Base Annual Income:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="baseIncome"
                                value={formData.baseIncome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount paid through FICA:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="ficaPayment"
                                value={formData.ficaPayment}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Retirement Payment:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="retirementPayment"
                                value={formData.retirementPayment}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Total Salary:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="totalSalary"
                                value={formData.totalSalary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Feedback:</label>
                            <select
                                className="form-control"
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select feedback</option>
                                <option value="Satisfied">Satisfied</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Dissatisfied">Dissatisfied</option>
                            </select>
                        </div>
                        <br></br>
                        <div>
                            <button type="submit" onClick={handleSubmit} className='FormButton'>
                                <span></span>
                                Submit
                                </button>
                            <button type="submit" className='FormButton'><span></span>Show Analytics</button>
                        </div>

                    </form>
                </div>


            </div>

        </>
    );
};

export default MyForm;


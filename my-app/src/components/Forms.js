import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css'
import { useNavigate } from 'react-router-dom'

//Creating a basic form UI which handles file type (only excel) and then post the data
const MyForm = () => {
    const [formData, setFormData] = useState({
        degree: '',
        fte: '',
        years: '',
        base: '',
        fica: '',
        retirement: '',
        total: '',
        feedback: '',
    });
    const [inputarr,
        setInputarr] = useState([])

    const [submitted, setSubmitted] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate()




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


    // Make a POST request to Flask backend
    let { degree,
        fte,
        years,
        base,
        fica,
        retirement,
        total,
        feedback } = formData;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData)
        setSubmitted(true);
        setCount((prevCount) => prevCount + 1);

        setInputarr([
            ...inputarr, {
                degree,
                fte,
                years,
                base,
                fica,
                retirement,
                total,
                feedback
            }
        ])


        fetch("http://localhost:3001/submit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response)
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

    const handleVisualForm = (event) => {
        navigate('/visualisationform')
    }


    // HTML part of form and excel sheet upload
    return (
        <>
            <head>
                <link rel='stylesheet' href='Form.css' />
            </head>

            <div class='Background'>
                <div>
                    <div class='fade-in'>
                        <h3 >Fill the form and submit as many times as you want<br></br>
                            Click Show Analytics to get visualisation.<br></br>
                        </h3>
                        <p><strong>Note:</strong> Data will be visualised based on the data you provide along with historical data.</p>

                    </div>
                    <br></br>

                    <div className='fade-in'>
                        <form action='/submit' id='MyForm' className='register'>
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
                                    name="base"
                                    value={formData.base}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Amount paid through FICA:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="fica"
                                    value={formData.fica}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Retirement Payment:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="retirement"
                                    value={formData.retirement}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Total Salary:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="total"
                                    value={formData.total}
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
                                <button type="submit" onClick={handleSubmit} >
                                    <span></span>
                                    ({count}) Submit
                                </button>
                                <button type="submit" onClick={handleVisualForm} ><span></span>Show Analytics</button>
                            </div>

                        </form>
                        <br></br>
                        <br></br>
                        <div className='table-container'>
                            <table border={1} width="30%" cellPadding={10}>
                                <tbody>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Degree </th>
                                        <th>FTE</th>
                                        <th>Years</th>
                                        <th>Base Income</th>
                                        <th>FICA Payment</th>
                                        <th>Retirement Payment</th>
                                        <th>Total Salary</th>
                                        <th>Feedback</th>
                                    </tr>
                                    {inputarr.length < 1 ?
                                        <tr>
                                            <td colSpan={9}>The data you submit appears here.</td>
                                        </tr> :
                                        inputarr.map((info, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <td>{ind + 1}</td>
                                                    <td>{info.degree}</td>
                                                    <td>{info.fte}</td>
                                                    <td>{info.years}</td>
                                                    <td>{info.base}</td>
                                                    <td>{info.fica}</td>
                                                    <td>{info.retirement}</td>
                                                    <td>{info.total}</td>
                                                    <td>{info.feedback}</td>

                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                </div>




            </div>

        </>
    );
};

export default MyForm;


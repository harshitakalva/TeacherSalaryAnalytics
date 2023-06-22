//import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import './Home.css'

//Home page that consists of two options form or excel sheet for data upload


const HomePage = () => {
    const navigate = useNavigate()

    const handleForm = (event) => {
        navigate('/form')
    }

    const handleExcel = (event) => {
        navigate('/excel')
    }
    return (
        <>
            <head>
    <link rel='stylesheet' href='Home.css'/>
</head>
<body>
    <div class='banner'>
        <div class='content'>
            <h1>Teacher Salary Analysis</h1>
            <p>We visualise the data regarding teacher salaries given by you. 
                <br></br> You can either provide the data using a form or by uploading an excel sheet.
            </p>
            <div>
            <button onClick={handleForm} className='HomeButton'><span></span>Fill Form</button>
            <button onClick={handleExcel} className='HomeButton'><span></span>Upload Excel Sheet</button>
            </div>
            
        </div>

        
    </div>
</body>



        </>


    )

}

export default HomePage;


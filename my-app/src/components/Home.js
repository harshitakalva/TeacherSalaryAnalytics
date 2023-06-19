import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'

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

        <div>
            <div>
                <br></br>
                <div class='container'>
                    <h1 class="text-center">Michigan Teachers analysis</h1>
                    <p>
                        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Link with href
                        </a>
                    </p>

                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                        </div>
                    </div>
                    <br></br>
                    <h3 >Add data in the following ways:</h3>
                </div>
                <br></br>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-6">
                            <div class="card text mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Fill Form</h5>
                                    <p class="card-text">Input the data through a form</p>
                                    <a href="/form" class="btn btn-primary">Go to form</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="card text mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Upload Excel Sheet</h5>
                                    <p class="card-text">Input data through excel sheet</p>
                                    <a href="/excel" class="btn btn-primary">Go to upload</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





            </div>



        </div>

    )

}

export default HomePage;


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//Creating a basic form UI which handles file type (only excel) and store the data in formData
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
    file: null,
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
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    // Reset the form
    setFormData({
      degree: '',
      fte: '',
      years: '',
      baseIncome: '',
      ficaPayment: '',
      retirementPayment: '',
      totalSalary: '',
      feedback: '',
      file: null,
    });
  };

  return (
    <div style={styles.container} className="container-fluid">
        <br></br>
        <h3 style={styles.h1}>Analytics on Teacher Salaries in St. Louis, Michigan</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Degree:</label>
        <select
          className="form-control"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
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
        >
          <option value="">Select FTE</option>
          <option value="full time">Full time</option>
          <option value="part time">Part time</option>
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
        />
      </div>
      <div className="form-group">
        <label>Feedback:</label>
        <select
          className="form-control"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
        >
          <option value="">Select feedback</option>
          <option value="Satisfied">Satisfied</option>
          <option value="Neutral">Neutral</option>
          <option value="Dissatisfied">Dissatisfied</option>
        </select>
      </div>
      <br></br>
      <label>OR</label><br></br>
      <div className="form-group">
        <label>Upload Excel Sheet:</label><br></br>
        <input
          type="file"
          className="form-control-file"
          name="file"
          onChange={handleFileChange}
        />
        <br></br>
      </div>
      <br></br>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
};

export default MyForm;



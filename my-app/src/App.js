import logo from './logo.svg';
import './App.css';
import MyForm from './components/Forms';
import MyExcel from './components/Excel';
import HomePage from './components/Home';
import Visualisation from './components/Visualisation';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (

    //<MyForm />
    //<MyExcel />

    <Router>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/form' element={<MyForm />} />
        <Route exact path='/excel' element={<MyExcel />} />
        <Route exact path='/visualisation' element={<Visualisation />} />
      </Routes>
    </Router>

  );
}

export default App;

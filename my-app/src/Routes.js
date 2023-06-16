import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import MyForm from './components/Forms';

// Import other components for additional routes

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/form" component={MyForm} />
        {/* Add more routes for other pages */}
      </Switch>
    </Router>
  );
};

export default Routes;

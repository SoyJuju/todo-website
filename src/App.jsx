import './App.css';
import Login from './Login';
import Signup from './Signup';
import List from './List';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/list">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

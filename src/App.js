import { Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import Admin from './Admin'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Admin />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

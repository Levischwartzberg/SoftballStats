import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header.jsx';
import Home from './pages/home.jsx';
import PlayerPage from './pages/playerPage.jsx';
import SeasonPage from './pages/seasonPage';
import ResultPage from './pages/resultPage';
import AdminHome from './pages/admin';
import Players from './pages/players';
import Seasons from './pages/seasons';
import AddPlayer from './pages/addPlayer';
import AddGame from './pages/addGame';
import EditPlayer from './pages/editPlayer';
import EditPlayerPage from './pages/editPlayerPage';
import EditGame from './pages/editGame';
import EditGamePage from './pages/editGamePage';
import { useState, useEffect, useContext } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("user") !== null && localStorage.getItem("user") !== "");

  function logout() {
    setIsAuthenticated(false);
  }

  useEffect(() => {
    console.log(isAuthenticated);
  },[isAuthenticated])

  return (
    <div className="App">
      <Router>
        <Header auth={isAuthenticated}></Header>
        <Switch>
            <Route exact path="/admin" >
              <AdminHome logout={logout}></AdminHome>
            </Route>
        </Switch>

        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home setIsAuthenticated={setIsAuthenticated}/>
            </Route>
          </Switch>
          <Switch>
            <Route path="/players" component={Players} />
          </Switch>
          <Switch>
            <Route path="/seasons" component={Seasons} />
          </Switch>
          <Switch>
            <Route path="/playerPage/:id" component={PlayerPage} />
          </Switch>
          <Switch>
            <Route path="/seasonPage/:id" component={SeasonPage} />
          </Switch>
          <Switch>
            <Route path="/boxscore/:id" component={ResultPage} />
          </Switch>
          <Switch>
            <Route path="/admin/addPlayer" component={AddPlayer} />
          </Switch>
          <Switch>
            <Route path="/admin/addGame" component={AddGame} />
          </Switch>
          <Switch>
            <Route path="/admin/editPlayer" component={EditPlayer} />
          </Switch>
          <Switch>
            <Route path="/admin/playerEditPage/:id" component={EditPlayerPage} />
          </Switch>
          <Switch>
            <Route path="/admin/editGame" component={EditGame} />
          </Switch>
          <Switch>
            <Route path="/admin/editOneGame/:id" component={EditGamePage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

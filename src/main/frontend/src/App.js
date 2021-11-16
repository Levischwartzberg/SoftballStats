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

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>

        <Switch>
          <Route exact path="/" component={Home} />
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
          <Route path="/admin" component={AdminHome} />
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
          <Route path="/playerEditPage/:id" component={EditPlayerPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import Header from './components/header.jsx';
import Home from './pages/home.jsx';
import PlayerPage from './pages/playerPage.jsx';
import SeasonPage from './pages/seasonPage';
import ResultPage from './pages/resultPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Players from './pages/players';
import Seasons from './pages/seasons';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      </Router>
    </div>
  );
}

export default App;

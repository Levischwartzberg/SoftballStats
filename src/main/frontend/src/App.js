import './App.css';
import Header from './components/header';
import Home from './pages/home';
import PlayerPage from './pages/playerPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>

        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Switch>
          <Route path="/playerPage/:id" component={PlayerPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import Header from './components/header.jsx';
import Home from './pages/home.jsx';
import PlayerPage from './pages/playerPage.jsx';
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

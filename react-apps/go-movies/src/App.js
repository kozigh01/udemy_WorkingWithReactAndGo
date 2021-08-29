import {BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from 'react-router-dom';

import Admin from './components/Admin';
import Genre from './components/Genre';
import Home from './components/Home';
import Movie from './components/Movie';
import Movies from './components/Movies';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">Go Watch a Movie!</h1>
          <hr className="mb-3" />
        </div>

        <div className="row">
          <div className="col-md-3">
            <nav>
              <ul className="list-group">
                <li className="list-group-item"><Link to="/">Home</Link></li>
                <li className="list-group-item"><Link to="/movies">Movies</Link></li>
                <li className="list-group-item"><Link to="/genres">Genres</Link></li>
                <li className="list-group-item"><Link to="/admin">Manage Catalogue</Link></li>
              </ul>
            </nav>
          </div>

          <div className="col-md-9">
            <Switch>
              <Route path="/movies/:id" component={Movie} />
              {/* <Route path="/movies/:id"><Movie /></Route>               */}
              <Route path="/movies"><Movies /></Route>
              <Route exact path="/genres"><Genres /></Route>
              <Route exact 
                path="/genres/drama" 
                render={(props) => <Genre {...props} title={`Drama`} />}>
              </Route>
              <Route exact 
                path="/genres/comedy" 
                render={(props) => <Genre {...props} title={`Comedy`} />}>
              </Route>
              <Route path="/admin"><Admin /></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


// function Movie() {
//   let { id } = useParams();
//   return  (
//     <h2>Movie id {id}</h2>
//   );
// }

function Genres() {
  let { path, url } = useRouteMatch();

  return (
    <>
      <h2>Genres</h2>
      <p>Path: {path}</p>
      <p>Url: {url}</p>

      <ul>
        <li><Link to={`${path}/drama`}>Drama</Link></li>
        <li><Link to={`${path}/comedy`}>Comedy</Link></li>
      </ul>
    </>
  );  
}
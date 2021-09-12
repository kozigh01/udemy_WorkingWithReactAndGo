import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Movies extends Component {

  state = { 
    movies: [],
    isLoaded: false,
    error: null,
  }

  componentDidMount() {
    fetch("http://localhost:4050/v1/movies")
      .then((resp) => {
        console.log("Status code is", resp.status);
        if (resp.status !== 200) {
          let err = Error();
          err.message = "Invalid response code: " + resp.status;
          this.setState({error: err});
          throw err;
        }
        return resp.json();
      })
      .then(
        (json) => this.setState({
          movies: json.movies,
          isLoaded: true
        }),
        (error) => this.setState({
          isLoaded: true,
          error
        })
      );
  }

  render() {
    const { movies, isLoaded, error } = this.state;

    if (error) {
      return (
        <div>
          Error: {error.message}
        </div>
      )  
    } else if (isLoaded) {
      return (
        <>
          <h2>Choose a movie</h2>

          <ul>
            { movies.map(m => (
                <li key={m.id}>
                  <Link to={`movies/${m.id}`}>{m.title}</Link>
                </li>
              ))
            }
          </ul>
        </>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}
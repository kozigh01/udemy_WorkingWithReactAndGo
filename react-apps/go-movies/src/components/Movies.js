import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Movies extends Component {

  state = { movies: [] }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        movies: [
          { id: 1, title: "Movie 1", runtime: 142 },
          { id: 2, title: "Movie 2", runtime: 143 },
          { id: 3, title: "Movie 3", runtime: 144 },
        ]
      })
    }, 500);
  }

  render() {
    return (
      <>
        <h2>Choose a movie</h2>

        { this.state.movies.length > 0
            ? <ul>
                { this.state.movies.map(m => (
                    <li key={m.id}>
                      <Link to={`movies/${m.id}`}>{m.title}</Link>
                    </li>
                  ))
                }
              </ul>
            : <div>Loading...</div>
        }

      </>
    );
  }
}
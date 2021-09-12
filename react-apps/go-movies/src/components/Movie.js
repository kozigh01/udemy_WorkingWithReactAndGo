import React, { Component } from 'react'

class Movie extends Component {
  state = { movie: {}, isLoaded: false, error: null };

  componentDidMount() {
    fetch("http://localhost:4050/v1/movie/" + this.props.match.params.id)
      .then((resp) => {
        console.log("Status code is", resp.status);
        if (resp.status !== 200) {
          let err = Error();
          err.message = "Invalid response code: " + resp.status;
          this.setState({ error: err });
          throw err;
        }
        return resp.json();
      })
      .then(
        (json) => this.setState({
          movie: json.movie,
          isLoaded: true
        }),
        (error) => this.setState({
          isLoaded: true,
          error
        })
      );
  }

  render() {
    const { movie, isLoaded, error } = this.state;
    movie.movie_genres = movie.movie_genres ? Object.values(movie.movie_genres) : [];

    if (error) {
      return (
        <div>
          Error: {error.message}
        </div>
      )
    } else if (isLoaded) {
      return (
        <>
          <h2>Movie: {movie.title} ({movie.year})</h2>
          <div className="float-start">
            <small>Rating: "{movie.mpaa_rating}"</small>            
          </div>

          <div className="float-end">
            {
              movie.movie_genres.map((g, indx) => (
                <span className="badge bg-secondary me-1" key={indx}>
                  {g.genre.genre_name}
                </span>
              ))
            }
          </div>
          <div className="clearfix"></div>
          <hr />


          <table className="table table-compact table-striped">
            <thead></thead>
            <tbody>
              <tr>
                <td><strong>Title:</strong></td>
                <td>{movie.title}</td>
              </tr>
              <tr>
                <td><strong>Desciption</strong></td>
                <td>{movie.description}</td>
              </tr>
              <tr>
                <td><strong>Runtime:</strong></td>
                <td>{movie.runtime} minutes</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    } else {
      return <div>Loading...</div>
    }
  }
}

export default Movie;
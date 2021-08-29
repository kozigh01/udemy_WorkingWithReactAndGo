import React, { Component } from 'react'

class Movie extends Component {
  state = { movie: {} };

  componentDidMount() {
    this.setState({
      movie: { id: this.props.match.params.id, title: 'Movie Fake Title', runtime: 150 }
    });
  }

  render() {
    return (
      <>
        <h2>Movie: {this.state.movie.title} (id: {this.state.movie.id})</h2>
        <p>Match: {JSON.stringify(this.props.match)}</p>

        <table className="table table-compact table-striped">
          <thead></thead>
          <tbody>
            <tr>
              <td><strong>Title:</strong></td>
              <td>{this.state.movie.title}</td>
            </tr>
            <tr>
              <td><strong>Runtime:</strong></td>
              <td>{this.state.movie.runtime} minutes</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Movie;
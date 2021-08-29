import { Component } from 'react';


class Genre extends Component {
  render() {
    return (
      <>
        <h1>Genre: {this.props.title}</h1>
        {/* <p>Path: {path}</p>
        <p>Url: {url}</p> */}
      </>
    );
  }
}

export default Genre;
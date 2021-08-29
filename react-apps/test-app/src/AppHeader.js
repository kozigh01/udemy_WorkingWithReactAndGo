import React, { Component } from 'react';

export default class AppHeader extends Component {
  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        <p>Posts {this.props.posts.length} items long.</p>
      </>
    );
  }
}
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';
import AppHeader from './AppHeader';
// import AppFooter from './AppFooter';
import AppFooterFunc from './AppFooterFunc';
import AppContent from './AppContent';

class App extends Component {

  constructor(props) {
    super(props);

    this.handlePostChange = this.handlePostChange.bind(this);
    this.state = {posts: []};
  }

  handlePostChange(posts) {
    this.setState({posts});
  }

  render() {
    const myProps = {
      title: "Awesome App",
      subject: "My subject",
      favourite_color: "red",
    }

    return (
      <div className="app">
        <AppHeader {...myProps} posts={this.state.posts}/>
        <AppContent posts={this.state.posts} onPostChange={this.handlePostChange}/>
        {/* <AppFooter /> */}
        <AppFooterFunc />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
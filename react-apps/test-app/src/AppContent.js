import React, { Component } from 'react';

export default class AppContent extends Component {

  // state = {posts: []};

  constructor(props) {
    super(props)

    // this.listRef = React.createRef();
  }

  anotherFunction = () => {
    console.log('in another function');
  }

  mouseIsOut = () => {
    console.log('mouse is out - PEACE!');
  }

  fetchList = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(resp => resp.json())
      .then(json => {
        // this.setState({posts: json});
        this.props.onPostChange(json);
      });
  };

  clickedItem = (id) => {
    console.log(`you clicked ${id}`);
  }

  render() {
    return (
      <div>
        This is the content
        <br />
        <hr />
        <p 
          onMouseEnter={this.anotherFunction}
          onMouseLeave={this.mouseIsOut}
        >
          This is some text
        </p>

        <button 
          className="btn btn-primary"
          onClick={this.fetchList}
        >Fetch Data</button>
        <hr />
        <p>Posts {this.props.posts.length} items long.</p>
        <ul>
          {this.props.posts.map(c => (
            <li key={c.id}>
              <a href="#!" onClick={() => this.clickedItem(c.id)}>{c.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
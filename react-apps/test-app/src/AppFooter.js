import React, { Component } from 'react';

import './AppFooter.css';

export default class AppFooter extends Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <div className="footer">
        <hr />
        <p>Copyright &copy; {currentYear} Acme Ltd.</p>
      </div>
    );
  }
}
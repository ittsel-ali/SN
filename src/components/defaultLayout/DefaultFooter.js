import React, { Component } from 'react';

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span><a href="https://github.com/hongshuidang/linkup">LinkUp</a> &copy; 2019</span>
        <span className="ml-auto">Powered by <a href="https://coreui.io/react">YOU</a></span>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;

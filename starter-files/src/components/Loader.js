import React from 'react';

const Loader = React.createClass({
    propTypes: {
      loadingMessage: React.PropTypes.string.isRequired
    },

  render() {
    return (
      <div className="loader">
        <img src="/images/ball.svg" alt="loading ball" />
        <h2>{this.props.loadingMessage}</h2>
      </div>
    )
  }
});

export default Loader;

import React from 'react';

const Search = React.createClass({
  // need real time? bind to keyUp event on input
  handleSubmit(e) {
    e.preventDefault();

    const searchTerm = this.refs.q.value;

    // change the url to /search/searchTerm
    this.context.router.transitionTo(`/search/${searchTerm}`);
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search..." ref="q" />
          <input type="submit" value="Search" />
        </form>
      </div>
    )
  }
});

export default Search;

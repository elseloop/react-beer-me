import React from 'react';
import Header from './Header';
// import Loader from './Loader';
import Search from './Search';
import Results from './Results';
// import Beer from './Beer';
// import Single from './Single';

/*
  <Loader loadingMessage="Breath in. Breath out. Repeat."></Loader>
  <Search></Search>
  <Beer></Beer>
  <Single></Single>
*/

const Main = React.createClass({
  getInitialState() {
    return {
      numBeers: 10,
      beers: [],
      loading: true
    }
  },

  componentWillMount() {
    const params = this.props.params || {};
    const searchTerm = params.searchTerm || undefined;

    this.loadBeers(searchTerm);
  },

  componentWillReceiveProps(nextProps) {
    this.loadBeers(nextProps.params.searchTerm);
  },

  incrementBeers(howMany) {
    const beerAmount = this.state.numBeers + 1;
    this.setState({
      numBeers: beerAmount
    });
  },

  loadBeers(searchTerm = 'hops') {
    this.setState({ loading: true });

    // first check if we can pull from localstorage
    const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);
    if ( localStorageBeers ) {
      const localBeers = JSON.parse(localStorageBeers);

      this.setState({
        beers: localBeers,
        loading: false
      });

      return;
    }

    fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
      // fetch returns a promise
      // when it returns convert it first to json
      .then(data => data.json())
      // then convert it to state
      .then(beers => {
        const filteredBeers = beers.data.filter(beer => !!beer.labels);

        this.setState({
          beers: filteredBeers,
          loading: false
        });

        localStorage.setItem(`search-${searchTerm}`, JSON.stringify(filteredBeers));
      })
      .catch(err => console.log(err));
  },

  render() {
    return (
      <div className="wrapper">
        <Header siteName="Boop Me!" />
        <Search />
        <p style={{marginTop: '2rem'}}><button onClick={this.incrementBeers}>{this.state.numBeers} 🍺</button></p>
        <Results {...this.state}></Results>
      </div>
    )
  }
});

export default Main;

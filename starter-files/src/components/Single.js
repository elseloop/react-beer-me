import React from 'react';
import Header from './Header';
import Loader from './Loader';

const Single = React.createClass({
  getInitialState() {
    return {
      beer: {},
      loading: true
    }
  },

  componentWillMount() {
    this.loadBeer(this.props.params.beerId);
  },

  loadBeer(beerId) {
    fetch(`http://api.react.beer/v2/beer/${beerId}`)
      // fetch returns a promise
      // when it returns convert it first to json
      .then(data => data.json())
      // then convert it to state
      .then(beer => {
        this.setState({
          beer: beer.data,
          loading: false
        });

        localStorage.setItem(`beer-${beerId}`, JSON.stringify(beer.data));
        // console.log(JSON.stringify(beer.data));
      })
      .catch(err => console.log(err));
  },

  renderGlass(beer) {
    if ( !beer.glass ) return;

    return (
      <div className="glass">
        <img src={`/images/glass-${beer.glass.id}`} alt={beer.glass.name} />
        <h3>{beer.glass.name}</h3>
      </div>
    );
  },

  renderAbv(beer) {
    if ( !beer.abv ) return;

    return (
      <div className="abv">ABV: {beer.abv}%</div>
    );
  },

  render() {
    const { beer } = this.state;

    if ( this.state.loading ) {
        return <Loader loadingMessage="Pouring a cold one!" />
    }

    return (
        <div>
            <Header siteName="Boop Me!" />
            <div className="single-beer">
              <div className="desc">
                <h2>{beer.nameDisplay}</h2>
                <p>{beer.description}</p>
              </div>

              <img className="label" src={beer.labels.large} alt={beer.name} />

              <div className="deets">
                {this.renderGlass(beer)}
                {this.renderAbv(beer)}
              </div>

              <div className="style">
                <h3>More info on {beer.style.name}</h3>
                <p>{beer.style.description}</p>
              </div>
            </div>
        </div>
    )
  }
});

export default Single;

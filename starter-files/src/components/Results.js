import React from 'react';
import Beer from './Beer';
import Loader from './Loader';

const Results = React.createClass({
    render() {
        if ( this.props.loading ) {
            return <Loader loadingMessage="Heading to the freezer." />
        }

        return (
            <div className="beers">
                {this.props.beers.map((details, i) => <Beer key={details.id} details={details} />)}
            </div>
        )
    }
});

export default Results;

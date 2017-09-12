import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import './style.css';

import Main from './components/Main';
import Single from './components/Single';

const Root = function() {
  return(
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={Main} />
        <Match pattern="/search/:searchTerm" component={Main} />
        <Match pattern="/beer/:beerId/:beerSlug" component={Single} />
      </div>
    </BrowserRouter>
  )
}

render( <Root />, document.querySelector('#root') );

import React, { Component } from 'react';
import { BrowserRouter as BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import HomePage from './Home';
import AboutPage from './About';
import NewCardsPage from './NewCards';
import MyCardsPage from './MyCards';
import 'bootstrap/dist/css/bootstrap.min.css';


export class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          {/* if currentUrl == '/', render <HomePage> */}
          <Route path='/' component={HomePage} />

          {/* if currentUrl == '/home', render <HomePage> */}
          <Route path='/home' component={HomePage} />

          {/* if currentUrl == '/about', render <AboutPage> */}
          <Route path='/about' component={AboutPage} />

          {/* if currentUrl == '/tools', render <NewCardsPage> */}
          <Route path='/new-cards' component={NewCardsPage} />

          {/* if currentUrl == '/tools', render <NewCardsPage> */}
          <Route path='/my-cards' component={MyCardsPage} />
        </Switch>

      </BrowserRouter>
    );    
  }
}

export class Header extends Component {
  render() {
    return (
        <div className="container">
        <Link className="home-link" to="/home">
          <h1 className="display-4">Smart Card</h1>
        </Link>
        <nav>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link new-cards-link-nav" to="/new-cards">New Cards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active my-cards-link" to="/my-cards">My Cards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link about-link" to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

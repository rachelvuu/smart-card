import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import HomePage from './Home';
import AboutPage from './About';
import NewCardsPage from './NewCards';
import MyCardsPage from './MyCards';

/* An array of card objects
cards: [
  {
    front: "front of card",
    back: "back of card"
  }
]
*/
export class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    };
    this.addCard = this.addCard.bind(this);
    this.clearCards = this.clearCards.bind(this);
  }

  addCard(newCard) {
    let cards = this.state.cards;
    cards.push(newCard);
    this.setState({
      cards: cards
    });
  }

  clearCards() {
    this.setState({
      cards: []
    })
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          {/* if currentUrl == '/home', render <HomePage> */}
          <Route path='/home' component={HomePage} />

          {/* if currentUrl == '/about', render <AboutPage> */}
          <Route path='/about' component={AboutPage} />

          {/* if currentUrl == '/tools', render <NewCardsPage> */}
          <Route path='/new-cards' render={(routerProps) => (
            <NewCardsPage {...routerProps} addCard={this.addCard}/>
          )}/>

          
          {/* if currentUrl == '/tools', render <NewCardsPage> */}
          <Route path='/my-cards' render={(routerProps) => (
            <MyCardsPage {...routerProps} cards={this.state.cards}/>
          )}/>
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

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
      cards: [
        {
          front: "Card1 front",
          back: "card1 back"
        },
        {
          front: "card2 front",
          back: "card2 back"
        }
      ]
    };
    this.addCard = this.addCard.bind(this);
    this.clearCards = this.clearCards.bind(this);
    this.updateCard = this.updateCard.bind(this);
  }

  addCard(newCard) {
    let cards = this.state.cards;
    cards.push(newCard);
    this.setState({
      cards: cards
    });
  }

  updateCard(card) {
    let cards = this.state.cards;
    cards[card.key] = {
      front: card.front,
      back: card.back
    }
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
          <Route path="/home" component={HomePage}/>
          {/* if currentUrl == '/about', render <AboutPage> */}
          <Route path='/about' component={AboutPage} />

          {/* if currentUrl == '/new-cards', render <NewCardsPage> */}
          <Route path='/new-cards' render={(routerProps) => (
            <NewCardsPage {...routerProps} addCard={this.addCard}/>
          )}/>

          
          {/* if currentUrl == '/tools', render <NewCardsPage> */}
          <Route path='/tools' render={(routerProps) => (
            <MyCardsPage {...routerProps} cards={this.state.cards} clearCards={this.clearCards} updateCard={this.updateCard}/>
          )}/>
          <Route path="*" component={HomePage}/>
        </Switch>

      </BrowserRouter>
      
    );
  }
}

export class Header extends Component {
  render() {
    return (
        <header className="menu d-flex justify-content-between align-items-center">
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
      </header>
    );
  }
}

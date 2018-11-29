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
          front: "Example Card",
          back: "Back of example card"
        },
        {
          front: "We worked really hard on this project",
          back: "I hope you can tell"
        }
      ]
    };
    this.addCard = this.addCard.bind(this);
    this.clearCards = this.clearCards.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
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

  deleteCard(index) {
    let cards = this.state.cards;
    cards.splice(index, 1);
    this.setState({
      cards: cards
    });
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

          
          {/* if currentUrl == '/my-caards', render <MyCardsPage> */}
          <Route path='/my-cards' render={(routerProps) => (
            <MyCardsPage {...routerProps} cards={this.state.cards} clearCards={this.clearCards} updateCard={this.updateCard} deleteCard={this.deleteCard}/>
          )}/>
          <Route path="*" component={HomePage}/>
        </Switch>

      </BrowserRouter>
      
    );
  }
}

export class Footer extends Component {
  render() {
    return (
      <footer>If you have any questions please contact
        <a href="mailto:ashull@uw.edu"> Amelia Shull</a> or
        <a href="mailto:cvitalis@uw.edu"> Christopher Vitalis. </a>
        Key phrases in notecards are from Microsoft's Text Analytics API.
      </footer>
    )
  }
}

export class Header extends Component {
  render() {
    return (
        <header className="menu d-flex justify-content-between align-items-center">
        <Link className="home-link" to="/home">
          <h1 className="display-4 title">Smart Card</h1>
          <img className="icon" alt="Graphic of a notepad icon" src="https://img.icons8.com/metro/52/b7a57a/note.png"></img>
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

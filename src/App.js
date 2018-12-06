import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import HomePage from './Home';
import AboutPage from './About';
import NewCardsPage from './NewCards';
import MyCardsPage from './MyCards';
import FirebaseApp from './Firebase';
import firebase from 'firebase/app';
import 'firebase/database';


/* An array of card objects
cards: [
  {
    front: "front of card",
    back: "back of card",
    ref: [reference to db]
  },
  {
    front: "front",
    back: "back",
    ref: [ref to db]
  }
]
*/
export class App extends Component {
  constructor() {
    let cards =  [
      {
        front: "Example Card",
        back: "Back of example card"
      },
      {
        front: "We worked really hard on this project",
        back: "I hope you can tell"
      }
    ];
    super();
    this.state = {
      cards: cards,
      currentUser: null
    };
    this.addCard = this.addCard.bind(this);
    this.clearCards = this.clearCards.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.saveToDataBase = this.saveToDataBase.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // is someone logged in
        let cards = this.state.cards;
        if (firebase.database().ref(user.uid) === null) {
          console.log("test");
          cards = firebase.database().ref(this.state.currentUser.uid);
        }
        this.setState({
          cards: cards,
          currentUser: user
        });
      }
    })
  }

  saveToDataBase(cards) {
    let db = firebase.database().ref(this.state.currentUser.uid);
    db.set({});
    cards.forEach((card) => {
      db.push(card);
    });
  }

  addCard(newCard) {
    let cards = this.state.cards;
    cards.push(newCard);
    if (this.state.currentUser != null) {
      this.saveToDataBase(cards);
    }
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
    if (this.state.currentUser != null) {
      this.saveToDataBase(cards);
    }
    this.setState({
      cards: cards
    });
  }

  clearCards() {
    if (this.state.currentUser != null) {
      this.saveToDataBase([]);
    }
    this.setState({
      cards: []
    })
  }

  deleteCard(index) {
    let cards = this.state.cards;
    for (let i = index; i < cards.length - 1; i++) {
      cards[i] = cards[i + 1];
    }
    cards.pop();
    if (this.state.currentUser != null) {
      this.saveToDataBase(cards);
    }
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
            <MyCardsPage {...routerProps} currentUser={this.state.currentUser} cards={this.state.cards} clearCards={this.clearCards} updateCard={this.updateCard} deleteCard={this.deleteCard}/>
          )}/>

          <Route path='/login' component={FirebaseApp}/>

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
        Key phrases in notecards are from Microsoft's Text Analytics and Computer Vision API's.
      </footer>
    )
  }
}

export class Header extends Component {
  render() {
    return (
        <header className="menu d-flex justify-content-between align-items-center">
        <Link className="home-link" to="/home">
          <h1 className="title">Smart Card</h1>
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
            <li className="nav-item">
              <UserNav></UserNav>
            </li>
            <li>

            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

class UserNav extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    firebase.auth().signOut()
    .catch((err) => {
      this.setState({errorMessage: err.message});
    })

    this.setState({
      user: null
    });
  }

  render() {
    if(this.state.user != null) {
      return(<Link className="nav-link log-out" to="/login" onClick={this.signOut}>Log Out</Link>);
    } else {
      return(<Link className="nav-link" to="/login">Login/Sign Up</Link>);
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user: user});
      }
    });
  }
}

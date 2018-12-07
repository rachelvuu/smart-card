import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import HomePage from './Home';
import AboutPage from './About';
import NewCardsPage from './NewCards';
import MyCardsPage from './MyCards';
import FirebaseApp from './Firebase';
import firebase from 'firebase/app';
import { Modal } from 'react-bootstrap';
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
    let cards =  [];
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
        let ref = firebase.database().ref(user.uid);
        ref.on('value', (snapshot) => {
          if (snapshot.val() != null) {
            this.setState({
              cards: snapshot.val(),
              currentUser: user
            });
          } else {
            this.setState({
              cards: [],
              currentUser: user
            });
          }
        });
      } else {
        this.setState({
          cards: [],
          currentUser: null
        })
      }
    })
  }

  componentWillUnmount() {
    firebase.database().ref(this.state.currentUser.uid).off();
  }


  // Takes in an array of cards
  saveToDataBase(cards) {
    let db = firebase.database().ref(this.state.currentUser.uid);
    db.set({});
    cards.forEach((card) => {
      db.push(card);
    });
  }

  addCard(newCard) {
    let cards = this.state.cards;
    let key = this.state.cards.length;
    newCard.key = key;
    cards.push(newCard);
    firebase.database().ref(this.state.currentUser.uid + "/" + key).set(newCard);
    this.setState({
      cards: cards
    });
  }

  updateCard(card) {
    let cards = this.state.cards;
    cards[card.key] = {
      front: card.front,
      back: card.back,
      key: card.key
    }
    if (this.state.currentUser != null) {
      firebase.database().ref(this.state.currentUser.uid + "/" + card.key).set(card);
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
          <Route path='/my-cards:username' render={(routerProps) => (
            <MyCardsPage {...routerProps} currentUser={this.state.currentUser} cards={this.state.cards} clearCards={this.clearCards} updateCard={this.updateCard} deleteCard={this.deleteCard}/>
          )}/>

          <Route path='/signin' component={FirebaseApp}/>

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
        <a className="link" href="mailto:info.340.smart.card@gmail.com"> Smart Card's creators</a>.
        Key phrases in notecards are from Microsoft's Text Analytics and Computer Vision API's.
      </footer>
    )
  }
}
//"/new-cards" + (this.props.currentUser == null ? "" : currentUser.displayName)

export class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
          <Link className="home-link" to="/home">
            <h1 className="title">Smart Card</h1>
            <img className="icon" alt="Graphic of a notepad icon" src="https://img.icons8.com/metro/52/a24bcf/note.png"></img>
          </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="nav-item">
                <Link className="nav-link" to="/new-cards">New Cards</Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" to="/my-cards">My Cards</Link>
              </NavItem>
              <NavItem className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </NavItem>
              <NavItem>
                <UserNav />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
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
      return(<Link className="nav-link log-out" to="/signin" onClick={this.signOut}>Log Out</Link>);
    } else {
      return(<Link className="nav-link sign-in" to="/signin">Sign In</Link>);
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

export class ErrorModal extends Component {
  render() {
    return (
        <div className="static-modal">
          <Modal.Dialog>
              <Modal.Header>
                  <Modal.Title>Error</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <p>{this.props.errorMessage}</p>
              </Modal.Body>

              <Modal.Footer>
                  <button className="btn btn-p" onClick={this.props.resolveError}>Okay</button>
              </Modal.Footer>
          </Modal.Dialog>
        </div>
    );
  }
}


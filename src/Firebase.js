import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Link} from 'react-router-dom';
import {Header, Footer, ErrorModal} from './App.js';



class FirebaseApp extends Component {
  constructor(props) {
    super(props);
    this.state={toggle: false, errorMessage: null};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          loading: false,
          errorMessage: null
        });
      } else {
        this.setState( { user: null, loading:false } );
      }
    });

    this.authUnregFunc = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        //console.log('logged in');
        this.setState({user: user})
      }
      else {
        //console.log('logged out');
      }});
    }
    
    componentWillUnmount() {
      this.authUnregFunc();
    }
    

    handleSignUp(email, password, handle) {
      this.setState({errorMessage:null});

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          let profilePromise = firebase.auth().currentUser.updateProfile({
            displayName: handle
          });
          return profilePromise;
        })
        .catch((err) => {
          this.setState({errorMessage: err.message});
      });
    }

    resolveError() {
      this.setState({
        errorMessage: null
      });
    }
    
    handleSignIn(email, password) {
      this.setState({errorMessage:null});

      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((err) => {
          this.setState({errorMessage: err.message});
        })
    }

    handleSignOut(){
      this.setState({errorMessage:null}); 

      firebase.auth().signOut()
        .catch((err) => {
          this.setState({errorMessage: err.message});
        })
    }
    
    toggleState() {
      let cToggle = this.state.toggle;
      this.setState({toggle:!cToggle});
    }

    render() {
      let modal;
      if (this.state.errorMessage !== null) {
        modal = <ErrorModal resolveError={() => this.resolveError()} errorMessage={this.state.errorMessage}></ErrorModal>;
      }

      let content=null;
      if (this.state.user != null) {
        content = (
        <div className="sign-in-page">
          <h2 className="display-4">Welcome {this.state.user.displayName}!</h2>
        </div>);
      } else if (this.state.toggle === false) {
        content = (
          <div className="sign-in-page">
              <SignInForm signInCallback={(e,p) => this.handleSignIn(e,p)}/>
              <p className="form-text">Don't have an account? <Link className="link" to="/signin" onClick={() => this.toggleState()}>Sign up.</Link></p>
          </div>
        );
      } else {
        content = (
          <div className="sign-in-page">
            <SignUpForm signUpCallback={(e,p,h) => this.handleSignUp(e,p,h)}/>
            <p className="form-text">Already have an account? <Link className="link" to="/signin" onClick={() => this.toggleState()}>Sign in.</Link></p>
          </div>
        );
      }
        return (
          <div>
              {modal}
              <Header/>
              {content}
              <Footer/>
          </div>
        );

        //user stuff: <SignupForm/>
        //render homepage
        //if not signed in: navbar shows about, login/signup, homepage get started button: redirect to signup/in page
        //if signed in: navbar shows newcards,addcards,about,signout, home get started button: redirect to new cards page
        
        //database stuff:
        //security rules
        //data- (user.cards) list of cards(object of cards- need to convert array), card={front,back}
        //new cards page:
        //submit button- push cards to ref in db
        //my cards page:
        //clear all button- get ref cards set to null
        //edit- get ref cards, map to array of card objects,
        //get card clicked's key (delete-set card = null, save changes-cardRef.set(cardVar) card front/back)
        //page shows cards based on firebase's cards ref (this.state.cards=ref)
    }
}

class SignUpForm extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        'email': undefined,
        'password': undefined,
        'handle': undefined
      }; 
    }
  
    //update state for specific field
    handleChange(event) {
      let field = event.target.name; //which input
      let value = event.target.value; //what value
  
      let changes = {}; //object to hold changes
      changes[field] = value; //change this field
      this.setState(changes); //update state
    }
  
    //handle signUp button
    handleSignUp(event) {
      event.preventDefault(); //don't submit
      this.props.signUpCallback(this.state.email, this.state.password, this.state.handle);
    }
  
    render() {
      return (
        <div>
          <form>
            <h2 className="display-4">Sign Up</h2>
            <div className="forms">
              {/* email */}
              <div className="form-group">
                <input className="form-control" placeholder="Email"
                  id="email" 
                  type="email" 
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                  />
              </div>
              
              {/* password */}
              <div className="form-group">
                <input className="form-control" placeholder="Password"
                  id="password" 
                  type="password"
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                  />
              </div>

              {/* handle */}
              <div className="form-group">
                <input className="form-control" placeholder="Handle"
                  id="handle" 
                  name="handle"
                  onChange={(e) => this.handleChange(e)}
                  />
              </div>
      
              {/* buttons */}
              <div className="form-group">
                <Link to="/">
                  <button className="btn  mr-2 get-started-button btn-p" onClick={(e) => this.handleSignUp(e)}>
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }

  class SignInForm extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        'email': undefined,
        'password': undefined,
      }; 
    }
  
    //update state for specific field
    handleChange(event) {
      let field = event.target.name; //which input
      let value = event.target.value; //what value
  
      let changes = {}; //object to hold changes
      changes[field] = value; //change this field
      this.setState(changes); //update state
    }
  
    //handle signIn button
    handleSignIn(event) {
      event.preventDefault(); //don't submit
      this.props.signInCallback(this.state.email, this.state.password);
    }
  
    render() {
      return (
        <div>
          <form>
            <h2 className="display-4">Sign In</h2>
            <div className="forms">
              {/* email */}
              <div className="form-group">
                <input className="form-control" placeholder="Email" 
                  id="email" 
                  type="email" 
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              
              {/* password */}
              <div className="form-group">
                <input className="form-control" placeholder="Password"
                  id="password" 
                  type="password"
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
      
              {/* buttons */}
              <div className="form-group">
                <Link to="/home">
                  <button className="btn get-started-button btn-p" onClick={(e) => this.handleSignIn(e)}>Log in</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )
    }
  }

  export default FirebaseApp;
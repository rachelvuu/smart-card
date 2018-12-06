import React , {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Link} from 'react-router-dom';

class FirebaseApp extends Component {
  constructor(props) {
    super(props);
    this.state={toggle: false};
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.setState({
              user: user,
              loading: false
          });
      } else {
          this.setState( { user: null, loading:false } );
      }
    })

    this.authUnregFunc = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('logged in');
        this.setState({user: user})
      }
      else {
        console.log('logged out');
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
      let content=null;
      if (this.state.toggle === false) {
        content = (
          <div>
              <SignInForm signInCallback={(e,p) => this.handleSignIn(e,p)}/>
              <p>Don't have an account? <Link to="/login" onClick={() => this.toggleState()}>Sign up.</Link></p>
          </div>
        );
      } else {
        content = (
          <div>
            <SignUpForm signUpCallback={(e,p,h) => this.handleSignUp(e,p,h)}/>
            <p>Already have an account? <Link to="/login" onClick={() => this.toggleState()}>Sign in.</Link></p>
          </div>
        );
      }
        return (
          <div>
              {content}
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
        <form>
          {/* email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" 
              id="email" 
              type="email" 
              name="email"
              onChange={(e) => this.handleChange(e)}
              />
          </div>
          
          {/* password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" 
              id="password" 
              type="password"
              name="password"
              onChange={(e) => this.handleChange(e)}
              />
          </div>

          {/* handle */}
          <div className="form-group">
            <label htmlFor="handle">Handle</label>
            <input className="form-control" 
              id="handle" 
              name="handle"
              onChange={(e) => this.handleChange(e)}
              />
          </div>
  
          {/* buttons */}
          <div className="form-group">
            <button className="btn btn-primary mr-2" 
              onClick={(e) => this.handleSignUp(e)}
            >
              Sign-up
            </button>
          </div>
        </form>
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
        <form>
          {/* email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control" 
              id="email" 
              type="email" 
              name="email"
              onChange={(e) => this.handleChange(e)}
              />
          </div>
          
          {/* password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" 
              id="password" 
              type="password"
              name="password"
              onChange={(e) => this.handleChange(e)}
              />
          </div>
  
          {/* buttons */}
          <div className="form-group">
            <button className="btn btn-primary"
              onClick={(e) => this.handleSignIn(e)}
            >
              Sign-in
            </button>
          </div>
        </form>
      )
    }
  }

  export default FirebaseApp;
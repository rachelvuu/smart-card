import React, { Component } from 'react';
import { Header, Footer, ErrorModal } from './App';
import { Link } from 'react-router-dom'
import 'whatwg-fetch';
import firebase from 'firebase/app';
import 'firebase/storage';
import spinner from './img/processing.gif';


class NewCardsPage extends Component {
  constructor() {
    super();
    this.state = {currentUser: null, submit: false};
  }
  render () {
    let modal;
    if (this.state.currentUser === null && this.state.submit) {
      let message = "You must be logged in to create new cards."
      modal = <ErrorModal errorMessage={message} resolveError={() => this.resolveError()}></ErrorModal>
    }
    return(
      <div>
        {modal}
        <Header/>
        <AddCardForm checkLoggedIn={() => this.checkLoggedIn()} addCard={this.props.addCard}/>
        <Footer/>
      </div>
    )
  }

  checkLoggedIn() {
    this.setState({
      currentUser: this.state.currentUser,
      submit: true
    })
    return this.state.currentUser;
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // is someone logged in
        this.setState({
            currentUser: user
        })
      } else {
        this.setState({
            currentUser: null
        })
      }
    })
}

  resolveError() {
    this.setState({
      currentUser: this.state.currentUser,
      submit: false
    })
  }
}

class AddCardForm extends Component {
  constructor() {
    super();
    this.state = {smartMode: true};
    this.toggleSmartMode = this.toggleSmartMode.bind(this);
    this.toggleClassicMode = this.toggleClassicMode.bind(this);
  }

  render() {
    return(
      <div className="form-group new-cards">
        <h2 className="display-4">New Cards</h2>
        <label>
          Get started with Smart Card by typing or pasting your notes below. Next, hit submit to create
          your cards. To view your cards click the 'View Cards' button. Smart Cards has two modes for 
          creating notecards. Toggle which mode you want below. <em>Smart mode</em> will chose which terms to
          add into notecards for you. <em>Classic mode</em> will turn each individual entry into its own card.
        </label>
        <div className="btn-group" role="group" aria-label="Note card mode">
          <button type="button" className="btn btn-sm btn-secondary smart-mode" onClick={this.toggleSmartMode}>Smart Mode</button>
          <button type="button" className="btn btn-sm btn-secondary classic-mode" onClick={this.toggleClassicMode}>Classic Mode</button>
        </div>
        <Form checkLoggedIn={this.props.checkLoggedIn} smartMode={this.state.smartMode} addCard={this.props.addCard}></Form>
      </div>
    )
  }

  toggleSmartMode() {
    this.setState({
      smartMode: true
    });
  }

  toggleClassicMode() {
    this.setState({
      smartMode: false
    });
  }
}

class Form extends Component {
  render() {
    if (this.props.smartMode) {
      return (<SmartModeForm checkLoggedIn={this.props.checkLoggedIn} addCard={this.props.addCard}/>)
    } else {
      return (<ClassicModeForm checkLoggedIn={this.props.checkLoggedIn} addCard={this.props.addCard}/>)
    }
  }
}

class SmartModeForm extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      img: "",
      currentUser: null,
      loading: false
    }
    this.storeImageInFirebase = this.storeImageInFirebase.bind(this);
    this.updateText = this.updateText.bind(this);
    this.getData = this.getData.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  
  updateText(event) {
    let state = this.state;
    state.text = event.target.value;
    this.setState(state);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({loading:false});
      if (user) { // is someone logged in
        this.setState({
            text: this.state.text,
            img: this.state.img,
            currentUser: user,
        })
      } else {
        this.setState({
            text: this.state.text,
            img: this.state.img,
            currentUser: null,
        })
      }
    })
}

  render() {
    let spinnerRender = null;
    if (this.state.loading) {
      spinnerRender = (
      <div className="spinner">
        <img src={spinner} alt="Processing..."/>
      </div>);
    }
    return (
      <div className="text-input">
        {spinnerRender}
        <form onSubmit={this.uploadFile}>
          <div className="form-group">
            <label>Upload a picture of your notes:</label>
            <input type="file" className="form-control-file" accept="image/*" onChange={this.uploadFile}/>
          </div>
        </form>
        <textarea className="form-control input-card-text" maxLength="5000" rows="4" onChange={this.updateText} readOnly={this.state.loading} value={this.state.text} placeholder="Your notes go here"></textarea>
        <div>
          <button type="submit" className="btn btn-p btn-sm submit-button" onClick={(this.state.img === "") ? () => {this.getData("")} : this.storeImageInFirebase}>Submit</button>
          <Link to={"/my-cards/" + (this.state.currentUser == null ? "Guest" : this.state.currentUser.displayName)} className="my-cards-link">
            <button className="btn btn-sm btn-p submit-button">
             View Cards
            </button>
          </Link>
        </div>
      </div>
    )
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = (e) => {
        let state = this.state;
        state.img = reader.result;
        this.setState(state);
      }
      reader.readAsDataURL(file);
    }
  }

  storeImageInFirebase() {
    if (this.props.checkLoggedIn() != null) {
      this.setState({loading:true}); //console.log("yeet")
      let storage = firebase.storage().ref();
      storage.child("/image").putString(this.state.img, 'data_url');
      storage.child("/image").getDownloadURL().then((promise) => {
        this.getImageData(promise);
      })
      .catch((error) => {
        console.log(error.message);
      })//.then(() => this.setState({loading:false}));
    }
  }

  getImageData(imgURL) {
    //application/json
    //application/octet-stream
    let content = {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "1e00d2a6051b4162bf52c0fbb5424c40"
      },
      method: "post",
      body: JSON.stringify({
        url: imgURL
      })
    };

    let url = "https://westus.api.cognitive.microsoft.com/vision/v2.0/ocr?language=unk&detectOrientation=true"
    window.fetch(url, content)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        return JSON.parse(response);
      })
      .then((response) => {
        let text = "";
        console.log(response);
        response = response.regions.forEach((region) => {
          region.lines.forEach((element) => {
            element.words.forEach((element2) => {
              text += " " + element2.text;
            });
          });
        })
        this.getData(text);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  getData(text) {
    if (this.props.checkLoggedIn() != null) {
      this.setState({loading:true});
      text = this.state.text.replace(/"/g, '\'') + " " + text;

      let content = {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "2796f530ee7443179bf560163b62a158"
        },
        method: "post",
        body: 
          JSON.stringify({
            documents: [
              {
                language: "en",
                id: "1",
                text: text
              }
            ]
          })
      };

      window.fetch("https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases", content)
        .then((response) => {
          return response.text();
        })
        .then((response) => {
          return JSON.parse(response);
        })
        .then((response) => {
          response.documents[0].keyPhrases.forEach((phrase) => {
            this.props.addCard({front: phrase, back: "Back of card."});
          });
          this.setState({text: ""});
        })
        .catch((error) => {
          console.log(error);
        }).then(() => {this.setState({loading:false});});
    }
  }
}

class ClassicModeForm extends Component {
  constructor() {
    super();
    this.addCard = this.addCard.bind(this);
    this.updateFront = this.updateFront.bind(this);
    this.updateBack = this.updateBack.bind(this);

    this.state = {
      front: '',
      back: ''
    };
  }

  updateFront(event) {
    let state = this.state;
    state.front = event.target.value;
    this.setState(state);
  }

  updateBack(event) {
    let state = this.state;
    state.back = event.target.value;
    this.setState(state);
  }

  render() {
    let inputFront = (<textarea className="form-control input-card-front" maxLength="5000" rows="4" placeholder="Front of card" onChange={this.updateFront} value={this.state.front}></textarea>);
    let inputBack = (<textarea className="form-control input-card-back" maxLength="5000" rows="4" placeholder="Back of card" onChange={this.updateBack} value={this.state.back}></textarea>);
    
    return(
      <div className="text-input">
        {inputFront}
        {inputBack}
        <div>
          <button className="btn btn-p btn-sm submit-button" onClick={this.addCard}>Submit</button>
          <Link to={"/my-cards/" + (this.state.currentUser == null ? "Guest" : this.state.currentUser.displayName)} className="btn btn-sm btn-p submit-button">View Cards</Link>
        </div>
      </div>
    )
  }

  addCard() {
    if (this.props.checkLoggedIn() != null) {
      let newCard = {
        front: this.state.front,
        back: this.state.back
      }
      this.props.addCard(newCard);
      this.setState({
        front: '',
        back: ''
      });
    }
  }
}




export default NewCardsPage;

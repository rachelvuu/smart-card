import React, { Component } from 'react';
import { Header, Footer } from './App';
import { Link } from 'react-router-dom'
import 'whatwg-fetch';
import firebase from 'firebase/app';
import 'firebase/storage';


class NewCardsPage extends Component {
  render () {
    return(
      <div>
        <head>
          <title>Smart Card</title>
        </head>
        <Header/>
        <AddCardForm addCard={this.props.addCard}/>
        <Footer/>
      </div>
    )
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
          <button type="button" className="btn btn-sm btn-secondary active smart-mode" onClick={this.toggleSmartMode}>Smart Mode</button>
          <button type="button" className="btn btn-sm btn-secondary classic-mode" onClick={this.toggleClassicMode}>Classic Mode</button>
        </div>
        <Form smartMode={this.state.smartMode} addCard={this.props.addCard}></Form>
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
      return (<SmartModeForm addCard={this.props.addCard}/>)
    } else {
      return (<ClassicModeForm addCard={this.props.addCard}/>)
    }
  }
}

class SmartModeForm extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      img: ""
    }
    this.updateText = this.updateText.bind(this);
    this.getData = this.getData.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  
  updateText(event) {
    let state = this.state;
    state.text = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div className="text-input">
        <form onSubmit={this.uploadFile}>
          <div className="form-group">
            <label>Upload a picture of your notes:</label>
            <input type="file" className="form-control-file" accept="image/*" onChange={this.uploadFile}/>
          </div>
        </form>
        <textarea className="form-control input-card-text" maxLength="5000" rows="4" onChange={this.updateText} value={this.state.text} placeholder="Your notes go here"></textarea>
        <div>
          <button type="submit" className="btn btn-p btn-sm submit-button" onClick={this.getData}>Submit</button>
          <Link to="/my-cards" className="btn btn-secondary btn-sm my-cards-link view-button">View Cards</Link>
        </div>
      </div>
    )
  }

  uploadFile(event) {
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      let file = event.target.files[0];

      let dataURL = "";
      reader.onloadend = (e) => {
        let state = this.state;
        state.img = reader.result;
        this.setState(state);
      }
      reader.readAsDataURL(file);
    }
  }

  getImageData() {
    //application/json
    //application/octet-stream
    firebase.initializeApp();
    let storage = firebase.storage().ref();
    console.log(storage);
    storage.putString(this.state.url, 'data_url').then(function(snapshot) {
      console.log('Uploaded a data_url string!');
    });
    /*
    let url ="";
    let content = {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "1e00d2a6051b4162bf52c0fbb5424c40"
      },
      method: "post",
      body: JSON.stringify({
        url: 
      })
    };

    let url = "https://westus.api.cognitive.microsoft.com/vision/v2.0/ocr" + "?language=unk&detectOrientation=true"
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
      })
      .catch((error) => {
        console.log(error);
      });
      */
  }


  getData() {
    let text = this.state.text.replace(/"/g, '\'');

    if (this.state.img !== "") {
      text += " " + this.getImageData();
    }

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
      });
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
          <Link to="/my-cards" className="btn btn-secondary btn-sm my-cards-link view-button">View Cards</Link>
        </div>
      </div>
    )
  }

  addCard() {
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




export default NewCardsPage;

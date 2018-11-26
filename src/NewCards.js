import React, { Component } from 'react';
import { Header } from './App';
import 'whatwg-fetch';

class NewCardsPage extends Component {
  render () {
    return(
      <div>
        <Header/>
        <AddCardForm addCard={this.props.addCard}/>
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
      text: ""
    }
    this.updateText = this.updateText.bind(this);
    this.getData = this.getData.bind(this);
  }
  
  updateText(event) {
    let state = this.state;
    state.text = event.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div>
        <textarea className="form-control input-card-text" maxLength="5000" rows="4" onChange={this.updateText} placeholder="Your notes go here"></textarea>
        <button className="btn btn-primary btn-sm submit-button" onClick={this.getData}>Submit</button>
        <button className="btn btn-secondary btn-sm my-cards-link view-button disabled" aria-disabled="true">View Cards</button>
      </div>
    )
  }

  getData() {
    let text = this.state.text;
    this.test();
    // call api
    // get data
    // update state of App

    // remove the text from the input by resetting state of this
  }

  test() {
    let text = this.state.text.replace(/"/g, '\'');
    let content = {
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "2796f530ee7443179bf560163b62a158"
      },
      type: "POST",
      data: 
        `{
          "documents": [
            {
              "language": "en",
              "id": "1",
              "text":
            }
          ]
        }`
    };

    window.fetch("https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases", content)
      .then((result) => {
        alert("yay");
      })
      .catch((error) => {
        alert("we suck");
      });
    /*
    ajax({
        url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?" + params,
        beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","2796f530ee7443179bf560163b62a158");
        },
        type: "POST",
        // Request body
        data: 
          `{
            "documents": [
            {
              "language": "en",
              "id": "1",
              "text": ${text}
            }
            ]
          }`,
    })
    .done(function(data) {
        alert("success");
        data.documents[0].keyPhrases.forEach((phrase) => {
          console.log(phrase);
          this.addCard({front:phrase, back:""});
        });
    })
    .fail(function() {
        alert("error");
    });*/

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
    let inputFront = (<textarea className="form-control input-card-text" maxLength="5000" rows="4" placeholder="Front of card" onChange={this.updateFront} value={this.state.front}></textarea>);
    let inputBack = (<textarea className="form-control input-card-back" maxLength="5000" rows="4" placeholder="Back of card" onChange={this.updateBack} value={this.state.back}></textarea>);
    return(
      <div>
        {inputFront}
        {inputBack}
        <button className="btn btn-primary btn-sm submit-button" onClick={this.addCard}>Submit</button>
        <button className="btn btn-secondary btn-sm my-cards-link view-button disabled" aria-disabled="true">View Cards</button>
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

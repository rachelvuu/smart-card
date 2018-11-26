import React, { Component } from 'react';
import { Header } from './App';

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
      return (<SmartModeForm />)
    } else {
      return (<ClassicModeForm addCard={this.props.addCard}/>)
    }
  }
}

class SmartModeForm extends Component {
  render() {
    return (
      <div>
        <textarea className="form-control input-card-text" maxLength="5000" rows="4" placeholder="Your notes go here"></textarea>
        <button className="btn btn-primary btn-sm submit-button">Submit</button>
        <button className="btn btn-secondary btn-sm my-cards-link view-button disabled" aria-disabled="true">View Cards</button>
      </div>
    )
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

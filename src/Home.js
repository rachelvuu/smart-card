import React, { Component } from 'react';
import { Header, Footer } from './App';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    let exampleCards = [
      {
        img: (<img className="icon-front" alt="Person Icon" 
        src="https://img.icons8.com/ios-glyphs/50/a24bcf/help.png"></img>),
        front : (<h1 className="example-font">What is Smart Card?</h1>),
        back: (<p className="example-text back-text-1">Smart Card is a website that can be used to help you study. 
          Just enter in your typed up notes and Smart Card will create 
          personalized note cards!</p> )
      },
      {
        img: (<img className="icon-front" alt="Person Icon" 
          src="https://png.icons8.com/material-rounded/48/a24bcf/user.png"></img>),
        front: (<h1 className="example-font">Who made Smart Card?</h1>),
        back: (<p className="example-text back-text-2">Smart Card was developed by Amelia Shull, Rachel Vuu, Yu Che Lin, and
          Christopher Vitalis in the Informatics major at the University of Washington.</p>)
      },
      {
        img: (<img className="icon-front" alt="Person Icon" 
          src="https://png.icons8.com/ios/50/a24bcf/money-box-filled.png"></img>),
        front: (<h1 className="example-font">Is Smart Card free?</h1>),
        back: (<p className="example-text back-text-3">Yes! Smart Card is 100% free!</p>)
      }
    ];

    let jumbotron = (
      <div className="jumbotron">
        <h2 className="display-4">Smart Card</h2>
          <p className="lead">The 
            <em> new </em>
            way to study.
        </p>
        <hr className="my-4"></hr>
        <div className="wrapper">
        <Link className="get-started-link" to="/new-cards">
          <button className="btn get-started-button">Get Started</button>
        </Link> 
        </div>
      </div>
    );
    return (
      <div className="background-image">
        <Header/>
        <main className="home-page">
          <div className="small-home">
            {jumbotron}
            <div className="card-container">
              <ExampleCard card={exampleCards[0]}></ExampleCard>
              <ExampleCard card={exampleCards[1]}></ExampleCard>
              <ExampleCard card={exampleCards[2]}></ExampleCard>
            </div>
          </div>
          <div className="top-row">
            <ExampleCard card={exampleCards[0]}></ExampleCard>
            <RandomCard></RandomCard>
            <RandomCard></RandomCard>
          </div>

          <div className="middle-row">
            <RandomCard></RandomCard>
            {jumbotron}
            <ExampleCard card={exampleCards[2]}></ExampleCard>
          </div>

          <div className="bottom-row">
            <RandomCard></RandomCard>
            <ExampleCard card={exampleCards[1]}></ExampleCard>
            <RandomCard></RandomCard>
          </div>
        </main>
        <Footer/>
      </div>
    )
  }
}

class ExampleCard extends Component {
  render() {
    return(
      <div className="flip-card example-card">
        <div className="flip-card-inner">
          <div className="flip-card-front example-text">
            {this.props.card.img}
            {this.props.card.front}
          </div>
          <div className="flip-card-back">
            {this.props.card.back}
           </div>
        </div>
      </div>
    );
  }
}

class RandomCard extends Component {
  render() {
    let facts = [
      {front:"What is the largest known prime number?", back: "2^(77,232,917) − 1"},
      {front: "Where is the Sea of Tranquility?", back: "The Moon"},
      {front: "Which actress has won the most Oscars?", back: "Katherine Hepburn"},
      {front: "What colour is a Welsh poppy?", back: "Yellow"},
      {front: "When was William Shakespeare born? ", back: "April 23rd 1564"},
      {front: "When's Zubin's birthday?", back: "March 17th 1997"},
      {front: "Why is Jacob Morris's netID @truama?", back: "Take INFO 340 to find out!"},
      {front: "How fast do Humming Birds flap their wings?", back: "Between 50 and 70 times a second"},
      {front: "How much does the average corgi weigh?", back: "Between 23 and 28lbs"},
      {front: "", back: ""}
    ];
    let number = Math.floor(Math.random() * (facts.length -1) * 3);
    let card = {
      front: facts[Math.min(number, facts.length - 1)].front,
      back:  facts[Math.min(number, facts.length - 1)].back,
    }
    return (
      <div className="flip-card example-card random-card">
        <div className="flip-card-inner">
          <div className="flip-card-front random-text">
            <p>{card.front}</p>
          </div>
          <div className="flip-card-back random-text">
            <p>{card.back}</p>
           </div>
        </div>
      </div>
      );
    }
}

export default HomePage;

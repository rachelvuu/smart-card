import React, { Component } from 'react';
import { Header, Footer } from './App';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    let exampleCards = [
      {
        img: (<img className="icon-front" alt="Person Icon" 
        src="https://img.icons8.com/ios-glyphs/50/000000/help.png"></img>),
        front : (<h1 className="example-font">What is Smart Card?</h1>),
        back: (<p className="example-text back-text-1">Smart Card is a website that can be used to help you study. 
          Just enter in your typed up notes and Smart Card will create 
          personalized note cards!</p> )
      },
      {
        img: (<img className="icon-front" alt="Person Icon" 
          src="https://png.icons8.com/material-rounded/48/000000/user.png"></img>),
        front: (<h1 className="example-font">Who made Smart Card?</h1>),
        back: (<p className="example-text back-text-2">Smart Card was developed by Amelia Shull, Rachel Vuu, Yu Che Lin, and
          Christopher Vitalis in the Informatics major at the University of Washington.</p>)
      },
      {
        img: (<img className="icon-front" alt="Person Icon" 
          src="https://png.icons8.com/ios/50/000000/money-box-filled.png"></img>),
        front: (<h1 className="example-font">Is Smart Card free?</h1>),
        back: (<p className="example-text back-text-3">Yes! Smart Card is 100% free!</p>)
      },
      {
        img: "",
        front: "",
        back: ""
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
            <ExampleCard card={exampleCards[3]}></ExampleCard>
            <ExampleCard card={exampleCards[3]}></ExampleCard>
          </div>

          <div className="middle-row">
            <ExampleCard card={exampleCards[3]}></ExampleCard>
            {jumbotron}
            <ExampleCard card={exampleCards[2]}></ExampleCard>
          </div>

          <div className="bottom-row">
            <ExampleCard card={exampleCards[3]}></ExampleCard>
            <ExampleCard card={exampleCards[1]}></ExampleCard>
            <ExampleCard card={exampleCards[3]}></ExampleCard>
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

export default HomePage;

import React, { Component } from 'react';
import { Header, Footer } from './App';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <div className="background-image">
      <head>
        <title>Smart Card</title>
      </head>
        <Header/>    
        <main>
          <section className="why">
            <div className="jumbotron">
              <h2 className="display-4">Smart Card</h2>
                <p className="lead">The 
                  <em> new </em>
                  way to study.
              </p>
              <hr className="my-4"></hr>
              <div className="wrapper">
              <Link className="get-started-link" to="/new-cards">
                <button className="btn  get-started-button">Get Started</button>
              </Link> 
              </div>
            </div>
            </section>
            <section className="more-info">
                <h2 className="display-4">
                <img className="icon-front" alt="Question mark icon" 
                src="https://png.icons8.com/ios/100/000000/help-filled.png">
                </img>
                What is Smart Card
              </h2>
              <p>
                  Smart Card is a website that can be used to help you study.
                  Just enter in your typed up notes and Smart Card will create 
                  <em> personalized</em> note cards!
              </p>

                <h2 className="display-4">
                <img className="icon-front" alt="Person Icon" 
                src="https://png.icons8.com/material-rounded/48/000000/user.png">
                </img>
                Who Made Smart Card
              </h2>
              <p>
                Smart Card was developed by Amelia Shull and Christopher Vitalis 
                in the Informatics major at the University of Washington. 
              </p>

                <h2 className="display-4">
                <img className="icon-front" alt="Piggy Bank Icon" 
                src="https://png.icons8.com/ios/50/000000/money-box-filled.png">
                </img>
                Is Smart Card Free?
                </h2>
              <p>
                Yes! Smart Card is 100% free for everyone.
              </p>
            </section>
        </main>
        <Footer/>
    </div>
    )
  }
}

export default HomePage;

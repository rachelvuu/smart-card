import React, { Component } from 'react';
import { Header, Footer } from './App';
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <div className="background-image">

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
                <button className="btn get-started-button">Get Started</button>
              </Link> 
              </div>
            </div>
            </section>

            <section className="more-info">
            <div className="card-container">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front example-text">
                  <img className="icon-front" alt="Person Icon" 
                src="https://png.icons8.com/ios/100/000000/help-filled.png">
                </img>
                    <h1 className="example-font">What is Smart Card?</h1>
                  </div>
                    <div className="flip-card-back">
                      <p className="example-text back-text-1">Smart Card is a website that can be used to help you study. 
                      Just enter in your typed up notes and Smart Card will create 
                      personalized note cards!</p> 
                    </div>
                </div>
              </div>

              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front example-text">
                  <img className="icon-front" alt="Person Icon" 
                src="https://png.icons8.com/material-rounded/48/000000/user.png">
                </img>
                    <h1 className="example-font">Who made Smart Card?</h1>
                  </div>
                    <div className="flip-card-back">
                      <p className="example-text back-text-2">Smart Card was developed by Amelia Shull, Rachel Vuu, Yu Che Lin, and
                        Christopher Vitalis in the Informatics major at the University of Washington.</p> 
                    </div>
                </div>
              </div>

              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front example-text">
                  <img className="icon-front" alt="Person Icon" 
                src="https://png.icons8.com/ios/50/000000/money-box-filled.png">
                </img>
                    <h1 className="example-font">Is Smart Card free?</h1>
                  </div>
                    <div className="flip-card-back">
                      <p className="example-text back-text-3">Yes! Smart Card is 100% free!</p> 
                    </div>
                </div>
              </div>
              </div>


            </section>
        </main>
        <Footer/>
      </div>
    )
  }
}

export default HomePage;

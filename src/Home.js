import React, { Component } from 'react';
import { Header } from './App';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'

class HomePage extends Component {
  render () {
    return (
      <div className="background-image">
      <Header/>    
      <main>
        <section className="why">
          <div className="jumbotron">
            <h2 className="display-4">Smart Card</h2>
            <p class="lead">The 
              <em> new </em>
               way to study.
            </p>
            <hr className="my-4"></hr>
            <Link className="get-started-link" to="/new-cards">
            <button class="btn btn-lg get-started-button">Get Started</button>
            </Link> 
          </div>
          
        </section>
      </main>
    </div>
    )
  }
}

export default HomePage;

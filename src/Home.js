import React, { Component } from 'react';
import { Header } from './App';


class HomePage extends Component {
  render () {
    return (
      <div>
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
            <a class="btn btn-lg get-started-button">Get Started</a>
          </div>
          
        </section>
      </main>
    </div>
    )
  }
}

export default HomePage;

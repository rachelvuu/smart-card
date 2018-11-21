import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        {/* if currentUrl == '/home', render <HomePage> */}
        <Route path='/#/home' component={HomePage} />

        {/* if currentUrl == '/about', render <AboutPage> */}
        <Route path='/#/about' component={AboutPage} />

        {/* if currentUrl == '/tools', render <AboutPage> */}
        <Route path='/#/tools' component={ToolsPage} />

      </BrowserRouter>
    );    
  }
}

class Header extends Component {
  render() {
    return (
        <div className="container">
        <a className="home-link" href="#">
          <h1 className="display-4">Smart Card</h1>
        </a>
        <nav>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link new-cards-link-nav" href="#">New Cards</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active my-cards-link" href="#">My Cards</a>
            </li>
            <li className="nav-item">
              <a className="nav-link about-link" href="#">About</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

class HomePage extends Component {
  render () {
    return (
      <Header/>
    )
  }
}

class AboutPage extends Component {
  render () {
    return (
      <Header/>
    )
  }
}

class ToolsPage extends Component {
  render () {
    return(
      <Header/>
    )
  }
}

 
export default App;

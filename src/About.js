import React, { Component } from 'react';
import { Header, Footer } from './App';
import { chrisBio, ameliaBio } from './bios';


class AboutPage extends Component {
  render () {
    return (
      <div  className="about-background">
        <Header/>
        <div className="about-content">
          <h2 className="display-4">About</h2>
          <div className="all-bios">
            <Profile person="amelia" bio={ameliaBio}/>
            <Profile person="chris" bio={chrisBio}/>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

class Profile extends Component {
  let
  render(){
    return (
      <div className="profile">
        <div className="flip-pic">
          <div className="flip-pic-inner">
            <div className={this.props.person + "Icon flip-pic-front"}></div>
            <div className="flip-pic-back"></div>
          </div>
        </div>
        <p className="bio-para">{this.props.bio}</p>
      </div>
    )
  }
}


export default AboutPage;
import React, { Component } from 'react';
import { Header } from './App';
import { chrisBio, ameliaBio } from './bios';


class AboutPage extends Component {
  render () {
    return (
      <div  className="about-background">
        <Header/>
        <div className="all-bios">
        <Profile person="amelia" bio={ameliaBio}/>
        <Profile person="chris" bio={chrisBio}/>
        </div>
      </div>
    )
  }
}

class Profile extends Component {
  let
  render(){
    return (
      <div className="item">
        <div className={this.props.person + "Icon bioPic"}></div>
        <p className="bio-para">{this.props.bio}</p>
      </div>
    )
  }
}


export default AboutPage;
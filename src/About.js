import React, { Component } from 'react';
import { Header } from './App';
import { chrisBio, ameliaBio } from './bios';


class AboutPage extends Component {
  render () {
    return (
      <div>
        <Header/>
        <Profile person="amelia" bio={ameliaBio}/>
        <Profile person="chris" bio={chrisBio}/>
      </div>
    )
  }
}

class Profile extends Component {
  let
  render(){
    console.log(this.props.url);
    return (
      <div>
        <div className={this.props.person + "Icon icon"}></div>
        <p>{this.props.bio}</p>
      </div>
    )
  }
}


export default AboutPage;
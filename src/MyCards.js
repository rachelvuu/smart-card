import React, { Component } from 'react';
import { Header } from './App';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'


class MyCardsPage extends Component {
    render() {
        return(
            <div>
                <Header/>
                <Tools clearCards={this.props.clearCards}/>
                <div className="card-container">
                    {this.props.cards.map((card, i) => {
                        return <Card key={i} card={card}/>
                    })}
                </div>
            </div>
        )
    }
}

class Tools extends Component {
    render() {
        return (
            <div>
                <button className="btn btn-primary btn-sm" onClick={this.props.clearCards}> Clear All</button>
                <Link to="/new-cards" className="btn btn-primary btn-sm">Add Card</Link>
                <button className="btn btn-primary btn-sm">Edit</button>
            </div>
        )
    }
}

class Card extends Component {
    render() {
        return (
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p>{this.props.card.front}</p>
                    </div>
                    <div className="flip-card-back">
                        <p>{this.props.card.back}</p>
                    </div>
                </div>
            </div>
        )
    }
}



export default MyCardsPage;
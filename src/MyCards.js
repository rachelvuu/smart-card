import React, { Component } from 'react';
import { Header } from './App';

class MyCardsPage extends Component {
    render() {
        return(
            <div className="card-container">
                <Header/>
                {this.props.cards.map((card, i) => {
                    return <Card key={i} card={card}/>
                })}
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
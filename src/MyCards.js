import React, { Component } from 'react';
import { Header } from './App';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


class MyCardsPage extends Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            editCard: false
        }
        this.editCard = this.editCard.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.disableEdit = this.disableEdit.bind(this);
    }

    enableEdit() {
        this.setState({
            editMode: true,
            editCard: false
        });
    }

    disableEdit() {
        this.setState({
            editMode: false,
            editCard: false
        });
    }

    editCard() {
        if (this.state.editMode) {
            return <EditModal/>;
        }
        return(<div>test</div>);
    }

    render() {
        let test = this.editCard;
        return(
            <div>
                {test}
                <Header/>
                <Tools clearCards={this.props.clearCards} enableEdit={this.enableEdit} disableEdit={this.disableEdit}/>
                <div className="card-container">
                    {this.props.cards.map((card, i) => {
                        return <Card key={i} card={card} editCard={this.editCard}/>
                    })}
                </div>
            </div>
        )
    }
}

class EditModal extends Component {
    render() {
        return (
            <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>One fine body...</Modal.Body>

                <Modal.Footer>
                <Button>Close</Button>
                <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </div>
        );
    }
}

class Tools extends Component {
    constructor() {
        super();
        this.state = {
            editTools: false
        }
        this.enableEdit = this.enableEdit.bind(this);
        this.disableEdit = this.disableEdit.bind(this);
    }

    enableEdit() {
        this.setState({
            editTools: true
        });
        this.props.enableEdit();
    }

    disableEdit() {
        this.setState({
            editTools: false
        });
        this.props.disableEdit();
    }

    render() {
        if (!this.state.editTools) { // regular mode
            return(
                <div>
                    <button className="btn btn-primary btn-sm" onClick={this.props.clearCards}> Clear All</button>
                    <Link to="/new-cards" className="btn btn-primary btn-sm">Add Card</Link>
                    <button className="btn btn-primary btn-sm" onClick={this.enableEdit}>Edit</button>
                </div>
            )
        } else { // edit mode
            return (
                <div>
                    <button className="btn btn-primary btn-sm" onClick={this.disableEdit}>Done Editing</button>
                </div>
            )
        }
    }
}

class Card extends Component {
    render() {
        return (
            <div className="flip-card" onClick={this.props.editCard}>
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
import React, { Component } from 'react';
import { Header } from './App';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


class MyCardsPage extends Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            cardToEdit: null
        }
        this.editCard = this.editCard.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.disableEdit = this.disableEdit.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    updateCard(card) {
        this.props.updateCard(card);
        this.setState({
            editMode: true,
            cardToEdit: null
        });
    }

    enableEdit() {
        this.setState({
            editMode: true,
            cardToEdit: null
        });
    }

    disableEdit() {
        this.setState({
            editMode: false,
            cardToEdit: null
        });
    }

    editCard(card) {
        if (this.state.editMode) {
            let editMode = this.state.editMode;
            this.setState({
                editMode: editMode,
                cardToEdit: card
            });
        }
    }

    render() {
        let editModal = <div/>;
        if (this.state.cardToEdit != null) {
            editModal = <EditModal num={this.state.cardToEdit.key}front={this.state.cardToEdit.front} back={this.state.cardToEdit.back} updateCard={this.updateCard}></EditModal>
        }
        return(
            <div>
                {editModal}
                <Header/>
                <Tools clearCards={this.props.clearCards} enableEdit={this.enableEdit} disableEdit={this.disableEdit}/>
                <div className="card-container">
                    {this.props.cards.map((card, i) => {
                        return <Card key={i} num={i} card={card} editCard={this.editCard}/>
                    })}
                </div>
            </div>
        )
    }
}

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            front: props.front,
            back: props.back,
            key: props.num
        }
        this.updateBack = this.updateBack.bind(this);
        this.updateFront = this.updateFront.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    render() {
        return (
            <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                <Modal.Title>Edit Card</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <textarea className="form-control edit-card-text" maxLength="5000" rows="4" defaultValue={this.props.front} onChange={this.updateFront}></textarea>
                    <textarea className="form-control edit-card-back" maxLength="5000" rows="4" defaultValue={this.props.back} onChange={this.updateBack}></textarea>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="danger">Delete</Button>
                    <Button bsStyle="primary" onClick={this.updateCard}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </div>
        );
    }

    updateFront(event) {
        this.setState({
            front: event.target.value,
            back: this.state.back
        });
    }

    updateBack(event) {
        this.setState({
            front: this.state.front,
            back: event.target.value
        })
    }

    updateCard() {
        let card = {
            front: this.state.front,
            back: this.state.back,
            key: this.state.key
        }
        this.props.updateCard(card);
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
    constructor(props) {
        super(props);
        this.state = {
            front: props.card.front,
            back: props.card.back,
            key: props.num
        }
    }

    render() {
        return (
            <div className="flip-card" onClick={() => this.props.editCard(this.state)}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <p>{this.state.front}</p>
                    </div>
                    <div className="flip-card-back">
                        <p>{this.state.back}</p>
                    </div>
                </div>
            </div>
        )
    }
}



export default MyCardsPage;
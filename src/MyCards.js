import React, { Component } from 'react';
import { Header, Footer } from './App';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import firebase from 'firebase/app';



class MyCardsPage extends Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            cardToEdit: null,
            currentUser: null
        }
        this.editCard = this.editCard.bind(this);
        this.enableEdit = this.enableEdit.bind(this);
        this.disableEdit = this.disableEdit.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) { // is someone logged in
            this.setState({
                editMode: false,
                cardToEdit: null,
                currentUser: user
            })
          } else {
            this.setState({
                editMode: false,
                cardToEdit: null,
                currentUser: null
            })
          }
        })
    }

    updateCard(card) {
        this.props.updateCard(card);

        this.setState({
            editMode: true,
            cardToEdit: null,
            currentUser: this.state.currentUser
        });
    }

    enableEdit() {
        this.setState({
            editMode: true,
            cardToEdit: null,
            currentUser: this.state.currentUser
        });
    }

    disableEdit() {
        this.setState({
            editMode: false,
            cardToEdit: null,
        });
    }

    editCard(card) {
        if (this.state.editMode) {
            let editMode = this.state.editMode;
            this.setState({
                editMode: editMode,
                cardToEdit: card,
                currentUser: this.state.currentUser
            });
        }
    }

    deleteCard(index) {
        this.setState({
            editMode: true,
            cardToEdit: null,
            currentUser: this.state.currentUser
        });
        this.props.deleteCard(index);
    }

    render() {
        let editModal = <div/>;
        if (this.state.cardToEdit != null) {
            editModal = <EditModal num={this.state.cardToEdit.key} front={this.state.cardToEdit.front} back={this.state.cardToEdit.back} updateCard={this.updateCard} deleteCard={this.deleteCard}></EditModal>
        }

        let cards = this.props.cards;
        let tools = <Tools clearCards={this.props.clearCards} enableEdit={this.enableEdit} disableEdit={this.disableEdit}/>

        if (this.state.currentUser === null) {
            cards = [{
                front: "Sign in to save your cards!",
                back: ":)"
            }];
            tools = <div></div>;
        }

        return(
            <div>
                {editModal}
                <Header/>
                <div className="form-group my-cards">
                    <h2 className="display-4 my-card-title">My Cards</h2>
                    {tools}
                    <div className="card-container">
                        {cards.map((card, i) => {
                            return <Card key={i} num={i} card={card} editCard={this.editCard}/>
                        })}
                    </div>
                </div>
                <Footer/>
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
        this.deleteCard = this.deleteCard.bind(this);
    }

    render() {
        return (
            <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Edit Card</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <textarea className="form-control input-card-front" maxLength="5000" rows="4" defaultValue={this.props.front} onChange={this.updateFront}></textarea>
                    <textarea className="form-control input-card-back" maxLength="5000" rows="4" defaultValue={this.props.back} onChange={this.updateBack}></textarea>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.deleteCard}>Delete</Button>
                    <Button bsStyle="primary" onClick={this.updateCard}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </div>
        );
    }

    updateFront(event) {
        this.setState({
            front: event.target.value,
            back: this.state.back,
        });
    }

    updateBack(event) {
        this.setState({
            front: this.state.front,
            back: event.target.value
        })
    }

    deleteCard(){
        this.props.deleteCard(this.state.key);
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
                <div className="tool-bar">
                    <label className="my-cards-info">Your personalized notecards are displayed below.
                        You can hover over or click them to view the other side of the card.
                        The edit button lets you change or delete either side of the card!
                    </label>
                    <div className="tools">
                        <Link to="/new-cards">
                            <button className="btn btn-p btn-sm tool-btn">Add Cards</button>
                        </Link>
                        <button className="btn btn-p btn-sm tool-btn" onClick={this.props.clearCards}> Clear All</button>
                        <button className="btn btn-p btn-sm tool-btn" onClick={this.enableEdit}>Edit</button>
                    </div>
                </div>
            )
        } else { // edit mode
            return (
                <div className="tool-bar">
                    <label>
                        Click on a card to edit or delete it.
                    </label>
                    <div className="tools">
                        <button className="btn btn-p btn-sm tool-btn" onClick={this.disableEdit}>Done Editing</button>
                    </div>
                </div>
            )
        }
    }
}

class Card extends Component {
    render() {
        let thisCard = {
            front: this.props.card.front,
            back: this.props.card.back,
            key: this.props.num
        }
        return (
            <div className="flip-card" onClick={() => this.props.editCard(thisCard)}>
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
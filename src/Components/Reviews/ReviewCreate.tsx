import React, { Component, useState} from 'react'
import { Form, FormGroup, FormText, Label, Input, Button, InputGroup,  Modal, 
    ModalBody, ModalHeader, InputGroupAddon } from "reactstrap";


type CreateReviewVars = {
    gametitle: string,
    gameimage: any,
    date: string,
    feedback: string,
    rating: number | string,
    owner: number,
    modal: boolean
}

type CreateReviewProps = {
    token: string,
    game: any,
}

class CreateReview extends Component<CreateReviewProps, CreateReviewVars> {
    constructor(props: CreateReviewProps) {
        super(props)
        this.state = {
            gametitle: "",
            gameimage: "",
            date: "",
            feedback: "",
            rating: 0,
            owner: 0,
            modal:  true
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    handleCreate = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/review/create`, {
            method: "POST",
            body:JSON.stringify({
                gametitle: this.props.game.name,
                gameimage: this.props.game.background_image,
                date: this.state.date,
                feedback: this.state.feedback,
                rating: this.state.rating,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        const res = await response.json()
        .catch((error) => {
        console.log(error.message)
        })
    };

    render() {
        return (
            <div>
            <Button className="button" onClick={this.toggle} style={{marginBottom: '10px'}}>Create Review</Button> 
            <Modal isOpen={!this.state.modal} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle} style={{
                marginRight: "auto",
                marginLeft: "auto",
              }}>Create Review</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.handleCreate}>
                    <div className="createreviewlabel">
                        <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {this.props.game.name}
                        </span>
                        <br />
                        <span>
                        {this.props.game.background_image}
                        </span>
                        <br />
                        <Input 
                        onChange={(e) => this.setState({date: e.target.value})}
                        name="date"
                        placeholder="date of review"
                        value={this.state.date}
                        required 
                        style={{ textAlign: "center", marginTop: '25px' }}
                        />
                        <br />
                        <Input 
                        onChange={(e) => this.setState({feedback: e.target.value})}
                        name="feedback"
                        placeholder="Enter your review"
                        value={this.state.feedback}
                        required
                        style={{ textAlign: "center" }}/>
                        <br />
                        <Input 
                        onChange={(e) => this.setState({rating: e.target.value})}
                        type="number"
                        name="rating"
                        placeholder="Rate this game(1 being the worst and 5 being the best"
                        value={this.state.rating}
                        required
                        style={{ textAlign: "center", marginBottom: '10px' }}/>
                    </div>
                    <div>
                        <Button className="submitreviewbtn" onClick={this.handleCreate} style={{ display: 'flex', justifyContent: 'center', marginRight: 'auto', marginLeft:'auto' }}>Create Review</Button>
                    </div>
            </Form>
            </ModalBody>
            </Modal>
            </div>
            )
    }
}

export default CreateReview


import React, { Component, useState} from 'react'
import { Form, FormGroup, FormText, Label, Input, Button, InputGroup,  Modal, 
    ModalBody, ModalHeader, InputGroupAddon } from "reactstrap";

type CreateReviewVars = {
    gametitle: string,
    date: string,
    feedback: string,
    rating: number | string,
    owner: number,
    modal: boolean
}

type CreateReviewProps = {
    token: string,
    game: any
}

class CreateReview extends Component<CreateReviewProps, CreateReviewVars> {
    constructor(props: CreateReviewProps) {
        super(props)
        this.state = {
            gametitle: "",
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
        console.log(res)
    }

    render() {
        return (
            <div>
            <Button className="button" onClick={this.toggle}>Create Review</Button> 
            <Modal isOpen={!this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Create Review</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.handleCreate}>
                    <div className="createreviewlabel">
                        {/* Enter Game Title */}
                        <span>
                        {this.props.game.name}
                        </span>
                        <br />
                        <Input 
                        onChange={(e) => this.setState({date: e.target.value})}
                        name="date"
                        placeholder="date of review"
                        value={this.state.date}
                        required/>
                        <br />
                        <Input 
                        onChange={(e) => this.setState({feedback: e.target.value})}
                        name="feedback"
                        placeholder="Enter your review"
                        value={this.state.feedback}
                        required/>
                        <br />
                        <Input 
                        onChange={(e) => this.setState({rating: e.target.value})}
                        type="number"
                        name="rating"
                        placeholder="Rate this game(1 being the worst and 5 being the best"
                        value={this.state.rating}
                        required/>
                    </div>
                    <div>
                        <Button className="submitreviewbtn" onClick={this.handleCreate}>Create Review</Button>
                    </div>
            </Form>
            </ModalBody>
            </Modal>
            </div>
            )
    }
}

export default CreateReview
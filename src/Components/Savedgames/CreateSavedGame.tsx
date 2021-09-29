import React, { Component, useState} from 'react'
import { Form, Input, Button, Modal, 
    ModalBody, ModalHeader } from "reactstrap";
import './Saved.css'
    
type SavedGameVars = {
    gametitle: string,
    genre: string,
    description: string,
    platform: string,
    owner: number,
    modal: boolean
}

type SavedGameProps = {
    token: string,
}

class CreateSavedGame extends Component<SavedGameProps, SavedGameVars> {
    constructor(props: SavedGameProps ) {
        super(props)
        this.state = {
            gametitle: "",
            genre: "",
            description: "",
            platform: "",
            owner: 0,
            modal: true
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    handleSumbit = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/savedgame/savedcreate`, {
            method: "POST",
            body: JSON.stringify({
                gametitle: this.state.gametitle,
                genre: this.state.genre,
                description: this.state.description,
                platform: this.state.platform,
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
            <Button className="createsavedbtn" onClick={this.toggle}>Create Saved Game</Button> 
            <Modal isOpen={!this.state.modal} toggle={this.toggle}>
            <ModalHeader className="createsavedheader" toggle={this.toggle}>Create Game</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.handleSumbit}>
                    <div className="savedgamelabel">
                    <Input
                onChange={(e) => this.setState({gametitle: e.target.value})}
                name="gametitle"
                className="createsavedinput"
                placeholder="Enter game title"
                value={this.state.gametitle}
                required/><br />
                <Input 
                onChange={(e) => this.setState({genre: e.target.value})}
                name="genre"
                className="createsavedinput"
                placeholder="Enter Genre"
                value={this.state.genre}
                required /> <br />
                <Input 
                onChange={(e) => this.setState({description: e.target.value})}
                name="description"
                className="createsavedinput"
                placeholder="Enter game description"
                value={this.state.description}
                required /> <br />
                <Input 
                onChange={(e) => this.setState({platform: e.target.value})}
                name="platform"
                className="createsavedinput"
                placeholder="Platform"
                value={this.state.platform}
                required />
                    </div>
                    <div>
                        <Button className="createsavedbtn" onClick={this.handleSumbit} >Create</Button>
                    </div>
            </Form>
            </ModalBody>
            </Modal>
            </div>
            )
    }
}

export default CreateSavedGame



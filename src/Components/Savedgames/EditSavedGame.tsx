import * as React from 'react';
import { Component } from 'react';
import { 
    Button, 
    Form, 
    Label, 
    Input,
    Modal, 
    ModalBody, 
    ModalHeader
} from 'reactstrap';

type EditGameVars = {
    gametitle: string,
    genre: string,
    description: string,
    platform: string,
    modal: boolean
}

type EditGameProps = {
    token: string,
    myPosts: any,
    fetchMySavedGames: Function
}

class EditSavedGame extends Component<EditGameProps, EditGameVars> {
    constructor(props: EditGameProps) {
        super(props)
        this.state = {
            gametitle: this.props.myPosts.gametitle,
            genre: this.props.myPosts.genre,
            description: this.props.myPosts.description,
            platform: this.props.myPosts.platform,
            modal: true,
        }
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleUpdate = (e: any) => {
        e.preventDefault();
        fetch(`http://localhost:3000/savedgame/savedupdate/${this.props.myPosts.id}`, {
            method: "PUT",
            body: JSON.stringify({
                gametitle: this.state.gametitle,
                genre: this.state.genre,
                description: this.state.description,
                platform: this.state.platform
            }),
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((response) => response.json()
        ).then ((data) => {
            this.setState({
                gametitle: "",
                genre: "",
                description: "",
                platform: ""
            })
                this.toggle()
                this.props.fetchMySavedGames();
            console.log(data)
        })
    }


    render() {
        return (
            <div className="editsavedmain">
                <div className="editsavedmaindiv">
                    <Button className="editsavedbtn" onClick={this.toggle}>Edit Saved Game!</Button>
                    <Modal isOpen={!this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update Item</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleUpdate}> 
                        <h1>Edit Post!</h1>
                            <Label>Game Name:</Label>
                            <Input type="text" onChange={(e) => this.setState({gametitle: e.target.value})}/>
                        <br />
                            <Label>Genre:</Label>
                            <Input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
                        <br />
                            <Label>Description:</Label>
                            <Input type="text" onChange={(e) => this.setState({description: e.target.value})}/>
                        <br />
                            <Label>Platform:</Label>
                            <Input type="text" onChange={(e) => this.setState({platform: e.target.value})}/>
                        <br />
                        <Button>Update Game!</Button>
                    </Form>
                    </ModalBody>
                    </Modal>
                </div>
            </div>
            )
    }
}


export default EditSavedGame;
import React, { Component } from 'react'
import {Button} from 'reactstrap';

type DeleteGameVars = {

}

type DeleteGameProps = {
    token: string,
    myPosts: any,
    fetchMySavedGames: Function
}

class DeleteSavedGame extends Component <DeleteGameProps, DeleteGameVars> {
    constructor(props: DeleteGameProps) {
        super(props);
        this.state = {

        }
    }

    deleteGame = () => {
        fetch(`http://localhost:3000/savedgame/saveddelete/${this.props.myPosts.id}`, {
            method: "DELETE",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        }).then((response) => response.json()
        ).then ((data) => {
            this.props.fetchMySavedGames()
        })
    }

    render(){
        return (
            <div>
                <Button className="button" id="deletesavedbtn" type="submit" onClick={this.deleteGame}>Delete Saved Game</Button>
            </div>
        )
    }
}

export default DeleteSavedGame
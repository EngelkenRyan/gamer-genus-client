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

    deleteGame = async () => {
        await fetch(`http://localhost:3000/savedgame/saveddelete/${this.props.myPosts.id}`, {
            method: "DELETE",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        }).then((response) => response.json()
        ).then ((data) => {
            this.props.fetchMySavedGames()
        }).catch((error) => {
            console.log(error.message)
            })
        };

    render(){
        return (
            <div>
                <Button className="deletesavedbtn" type="submit" onClick={this.deleteGame}>Delete Saved Game</Button>
            </div>
        )
    }
}

export default DeleteSavedGame
import { Edit } from '@material-ui/icons';
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CreateSavedGame from './CreateSavedGame'
import DeleteSavedGame from './DeleteSavedGame';
import EditSavedGame from './EditSavedGame';

type SavedMineVars = {
    gametitle: string,
    genre: string,
    description: string,
    platform: string,
    myPosts: any[],
}

type SavedMineProps = {
    token: string
}


class SavedGamesMine extends Component<SavedMineProps, SavedMineVars> {
    constructor(props: SavedMineProps) {
        super(props)
        this.state = {
            gametitle: "",
            genre: "",
            description: "",
            platform: "",
            myPosts: [],
        }
    }

    componentDidMount() {
        this.fetchSavedGames()
    }

    fetchSavedGames = () => {
    fetch(`http://localhost:3000/savedgame/savedmine`, {
        method: 'GET',
        headers: ({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.props.token}`
        })
    }).then(
        (response) => response.json()
    ).then((data) => {
        console.log(data)
        this.setState({
            myPosts: data
        })
    })
}
    
    render() {
        const { myPosts } = this.state;
        return (
        <div className="createsaveddiv">
            <CreateSavedGame token={this.props.token}/>
            <div className='main'>
                {myPosts.length > 0 && (
                    <div className='postsTable'>
                        {myPosts.map(myPosts => (
                            <div className='myPosts' key={myPosts.id}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Game Name</th>
                                            <th>Genre</th>
                                            <th>Description</th>
                                            <th>Platform</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{myPosts.gametitle}</td>
                                            <td>{myPosts.genre}</td>
                                            <td>{myPosts.description}</td>
                                            <td>{myPosts.platform}</td>
                                            <td><EditSavedGame token={this.props.token} myPosts={myPosts} fetchMySavedGames={this.fetchSavedGames} /></td>
                                            <td><DeleteSavedGame token={this.props.token} myPosts={myPosts} fetchMySavedGames={this.fetchSavedGames}/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        )
    }
}

export default SavedGamesMine
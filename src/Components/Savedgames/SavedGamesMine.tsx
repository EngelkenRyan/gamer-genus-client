import React, { Component } from 'react';
import { Card, CardActions, Typography, Grid, CardHeader } from '@material-ui/core';
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
    token: string,
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

    fetchSavedGames = async () => {
    await fetch(`http://localhost:3000/savedgame/savedmine`, {
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
    }).catch((error) => {
        console.log(error.message)
        })
    };
    
    render() {
        const { myPosts } = this.state;
        return (
            <div className="createsaveddiv">
            <CreateSavedGame token={this.props.token}/>
                {myPosts.length > 0 && (
                    <Grid container justify='center' className="createsavedgrid" style={{
                        textAlign: "center",
                        marginRight: "auto",
                        marginLeft: "auto", height: '70%', width: '70%'
                    }}>
                        {myPosts.map(myPosts => (
                            <Grid container xs={12} sm={5} justify='center' spacing={0}  style={{marginBottom: '25px'}}>
                            <div className='myPosts' key={myPosts.id}>
                            <Card variant="outlined" style={{ boxShadow: '0 8px 24px 0', backgroundColor: 'inherit', maxWidth: '300px', borderRadius: " 25px 25px 25px 25px"}}>
                                <CardHeader title={myPosts.gametitle}
                                subheader='Game Title' />
                                <Typography color='textSecondary'>
                                    Genre
                                </Typography>
                                <Typography>
                                        {myPosts.genre}
                                </Typography>
                                <Typography color='textSecondary'>
                                    Description
                                </Typography>
                                <Typography>
                                        {myPosts.description}
                                </Typography>
                                <Typography color='textSecondary'>
                                    Platform
                                </Typography>
                                <Typography>
                                        {myPosts.platform}
                                </Typography>
                                <CardActions className="savedminecardaction">
                                            <EditSavedGame token={this.props.token} myPosts={myPosts} fetchMySavedGames={this.fetchSavedGames} />
                                            <DeleteSavedGame token={this.props.token} myPosts={myPosts} fetchMySavedGames={this.fetchSavedGames}/>
                                            </CardActions>
                                </Card>
                            </div>
                            </Grid>
                        ))}
                        </Grid>
                )}
        </div>
        )
    }
}

export default SavedGamesMine
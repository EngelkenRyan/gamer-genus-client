import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import CreateReview from './ReviewCreate';

type DisplayGamesVars = {
    gamesList: any[],
    apiKey: string,
    searchTerm: string,
    create: boolean,
}

type DisplayGamesProps = {
    token: string,
}

class DisplayGames extends React.Component<DisplayGamesProps, DisplayGamesVars> {
    constructor(props: DisplayGamesProps) {
        super(props)
        this.state = {
            gamesList: [],
            apiKey: '75bf2e9cf0cf42a2ae29640a3379c0f1',
            searchTerm: '',
            create: false
        }
    }

    searchGames = async () => {
        await fetch (`https://api.rawg.io/api/games?key=${this.state.apiKey}&search=${this.state.searchTerm}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                gamesList: json.results,
                create: true
            })
        })
        console.log(this.state.gamesList)
    }

    updateSearchTerm = (e: any) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    resetSearchState = () => {
        this.setState({
            gamesList: [],
            create: false
        })
    }


    render() {
        return(
            <div>
                <div className='searchbar'>
                    <label>Search for a video game to review:
                        <input type='text' placeholder='Game Title' value={this.state.searchTerm} onChange={this.updateSearchTerm} />
                        <Button className='searchButton' onClick={this.searchGames}>Search</Button>
                </label>
                </div>
                <div className="displayresults">
                    {this.state.gamesList.map((games) => (
                        <ul>
                            <li><img src={games.background_image} style={{ width: 100, height: 100 }}/></li>
                            <li>{games.name}</li>   
                            <li>{games.released}</li>
                            <li><CreateReview token={this.props.token}/></li>
                        </ul>
                    ))}
                </div>
            </div>
        )
    }
}

export default DisplayGames
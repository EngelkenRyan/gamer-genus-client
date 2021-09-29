import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Container,
} from "@material-ui/core";
import CreateReview from "./ReviewCreate";

type DisplayGamesVars = {
  gamesList: any[];
  apiKey: string;
  searchTerm: string;
  create: boolean;
  gametitle: string;
  gameimg: any;
  gamegenre: string;
  platform: string;
};

type DisplayGamesProps = {
  token: string;
};

class DisplayGames extends React.Component<
  DisplayGamesProps,
  DisplayGamesVars
> {
  constructor(props: DisplayGamesProps) {
    super(props);
    this.state = {
      gamesList: [],
      apiKey: "75bf2e9cf0cf42a2ae29640a3379c0f1",
      searchTerm: "",
      create: false,
      gametitle: "",
      gameimg: "",
      gamegenre: "",
      platform: "",
    };
  }

  searchGames = async () => {
    await fetch(
      `https://api.rawg.io/api/games?key=${this.state.apiKey}&search=${this.state.searchTerm}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          gamesList: json.results,
          create: true,
        });
      }).catch((error) => {
    console.log(error.message)
    })
};

  updateSearchTerm = (e: any) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  resetSearchState = () => {
    this.setState({
      gamesList: [],
      create: false,
    });
  };

  render() {
    return (
      <div>
        <div className="searchbar" style={{
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto",
                marginBottom: "1%"
            }}>
          <label>
            Search for a video game to review:
            <input
              type="text"
              placeholder="Game Title"
              value={this.state.searchTerm}
              onChange={this.updateSearchTerm}
            />
            <Button className="searchButton" onClick={this.searchGames}>
              Search
            </Button>
          </label>
        </div>
        <div className="displayresults">
          <Grid container justify="center" style={{
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto", height: '70%', width: '70%'
            }}>
            {this.state.gamesList.map((games) => {
              return (
                <Grid container xs={12} sm={4} justify='center' spacing={0} max-width='400px' style={{marginBottom: '25px'}}>
                  <Card variant="outlined">
                    <CardMedia
                      component="img"
                      image={games.background_image}
                      style={{
                        height: 150,
                        marginRight: "auto",
                        marginLeft: "auto",
                      }}
                    />
                    <CardContent>
                      {games.name}
                      <br />
                      {games.released}
                    </CardContent>
                  <CreateReview token={this.props.token} game={games} />
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default DisplayGames;

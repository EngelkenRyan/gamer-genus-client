import React, { Component } from 'react';
import { Card, CardActions, CardContent,CardMedia, Typography, Grid, CardHeader } from '@material-ui/core';
import ReviewDelete from './ReviewDelete';
import ReviewUpdate from './ReviewUpdate'

type ReviewMineVars = {
    gametitle: string,
    gameimage: any,
    date: string,
    feedback: string,
    rating: number | string,
    myReviews: any[],
}

type ReviewMineProps = {
    token: string
}

class ReviewMine extends Component<ReviewMineProps, ReviewMineVars> {
    constructor(props: ReviewMineProps) {
        super(props)
        this.state = {
            gametitle: "",
            gameimage: "",
            date: "",
            feedback: "",
            rating: "",
            myReviews: [],
        }
    }

    componentDidMount() {
        this.fetchReviewMine()
    }

    fetchReviewMine = async () => {
        await fetch(`http://localhost:3000/review/mine`, {
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
                myReviews: data
            })
        }).catch((error) => {
            console.log(error.message)
            })
        };

    render() {
        const { myReviews } = this.state;
        return(
            <div className="reviewMine">
                <h1 className="reviewminehead">My Reviews</h1>
                {myReviews.length > 0 && (
                    <Grid container justify='center' className="reviewMineGrid"  style={{
                        textAlign: "center",
                        marginRight: "auto",
                        marginLeft: "auto", height: '70%', width: '70%'
                    }}>
                        {myReviews.map(myReviews => (
                            <Grid container xs={12} sm={5} justify='center' spacing={0} max-width='400px' style={{marginBottom: '25px'}}>
                            <div className='myReviews' key={myReviews.id}>
                                <Card variant="outlined" style={{ boxShadow: '0 8px 24px 0', backgroundColor: 'inherit', maxWidth: '300px', borderRadius: " 25px 25px 25px 25px"}}>
                                        <CardHeader 
                                            title={myReviews.gametitle}
                                            subheader={myReviews.date} 
                                            />
                                            <CardMedia
                                            component="img"
                                            image={myReviews.gameimage} style={{height: 150, marginRight: "auto", marginLeft: "auto" }}/>
                                            <CardContent>
                                            <Typography color="textSecondary">
                                            Review:
                                            </Typography>
                                            <Typography>
                                            {myReviews.feedback}    
                                            </Typography>
                                            <br />
                                            <Typography color="textSecondary">
                                            Rating:
                                            </Typography>
                                            <Typography>
                                            {myReviews.rating}
                                            </Typography>
                                            </CardContent>
                                            <CardActions className="reivewminecardactions">
                                            <ReviewUpdate token={this.props.token} myReviews={myReviews} fetchMyReviews={this.fetchReviewMine}/>
                                            <ReviewDelete token={this.props.token} myReviews={myReviews} fetchMyReviews={this.fetchReviewMine}/>
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

export default ReviewMine
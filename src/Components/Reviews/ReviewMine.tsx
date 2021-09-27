import React, { Component } from 'react';
import { Card, CardActions, CardContent,CardMedia, Button, Typography } from '@material-ui/core';
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

    fetchReviewMine = () => {
        fetch(`http://localhost:3000/review/mine`, {
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
        })
    }

    render() {
        const { myReviews } = this.state;
        return(
            <Card variant="outlined">
                {myReviews.length > 0 && (
                    <div className='reviewmineTable'>
                        {myReviews.map(myReviews => (
                            <div className='myReviews' key={myReviews.id}>
                                            <CardMedia
                                            component="img"
                                            image={myReviews.gameimage} style={{ width: 100, height: 100, marginRight: "auto", marginLeft: "auto" }}/>
                                            <CardContent>
                                            <Typography gutterBottom variant="h5">
                                            Gametitle: <br />
                                            {myReviews.gametitle}   
                                            </Typography>
                                            <Typography gutterBottom>
                                            <br />
                                            {myReviews.date}    
                                            </Typography>
                                            <Typography gutterBottom>
                                            <br />
                                            {myReviews.feedback}    
                                            </Typography>
                                            <Typography gutterBottom>
                                            <br />
                                            {myReviews.rating}
                                            </Typography>
                                            </CardContent>
                                            <CardActions>
                                            <ReviewUpdate token={this.props.token} myReviews={myReviews} fetchMyReviews={this.fetchReviewMine}/>
                                            <ReviewDelete token={this.props.token} myReviews={myReviews} fetchMyReviews={this.fetchReviewMine}/>
                                            </CardActions>
                            </div>
                        ))}
                    </div>
                )}

            </Card>
        )
    }
}

export default ReviewMine
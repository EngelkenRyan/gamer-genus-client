import React, { Component } from 'react'
import { Card, CardActions, CardContent,CardMedia, Button, Typography, Grid } from '@material-ui/core';

type ReviewAllVars = {
    gametitle: string,
    gameimage: any,
    date: string,
    feedback: string,
    rating: number | string,
    myReviews: any[],
}

type ReviewAllProps = {
    token: string | null
}


class ReviewAll extends Component<ReviewAllProps, ReviewAllVars> {
    constructor(props: ReviewAllProps) {
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
        this.fetchReviewAll();
    }

    fetchReviewAll = () => {
        fetch(`http://localhost:3000/review/`, {
            method: "GET",
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
            <Card variant="outlined" style={{maxWidth: '350px', marginRight: "auto", marginLeft: "auto"  }}>
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
                            </div>
                        ))}
                    </div>
                )}

            </Card>
        )
    }
}

export default ReviewAll


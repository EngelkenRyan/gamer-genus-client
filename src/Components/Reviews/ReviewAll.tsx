import React, { Component } from 'react'
import { Card, CardContent,CardMedia, Typography, Grid, CardHeader } from '@material-ui/core';

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

    fetchReviewAll = async () => {
        await fetch(`http://localhost:3000/review/`, {
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
        }).catch((error) => {
            console.log(error.message)
            })
        };

    render() {
        const { myReviews } = this.state;
        return(
            <div className='reviewAll'>
                <h1 className="reviewallhead">All Reviews</h1>
            {myReviews.length > 0 && (
                <Grid container justify='center' className="reviewAllGrid" style={{
                    textAlign: "center",
                    marginRight: "auto",
                    marginLeft: "auto", height: '70%', width: '70%'
                }}> 
                {myReviews.map(myReviews => (
                        <Grid container xs={12} sm={5} justify='center' spacing={0} style={{marginBottom: '25px'}} >
                            <div className='allReviews' key={myReviews.id}>
                                <Card variant="outlined" style={{ boxShadow: '0 8px 24px 0', backgroundColor: 'inherit', maxWidth: '300px', borderRadius: " 25px 25px 25px 25px"}}>
                                    <CardHeader 
                                        title={myReviews.gametitle}
                                        subheader={myReviews.date}
                                    />
                                            <CardMedia
                                            component="img"
                                            image={myReviews.gameimage} style={{ height: 150, marginLeft: 'auto', marginRight: 'auto'}}/>
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

export default ReviewAll
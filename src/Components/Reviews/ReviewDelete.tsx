import React, { Component } from 'react'
import {Button} from 'reactstrap';


type ReviewDeleteVars = {

}

type ReviewDeleteProps = {
    token: string,
    myReviews: any,
    fetchMyReviews: Function
}

class ReviewDelete extends Component <ReviewDeleteProps, ReviewDeleteVars> {
    constructor(props: ReviewDeleteProps) {
        super(props);
        this.state = {

        }
    }
    
    deleteReview = () => {
        fetch(`http://localhost:3000/review/delete/${this.props.myReviews.id}`, {
            method: "DELETE",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        }).then((response) => response.json()
        ).then ((data) => {
            this.props.fetchMyReviews()
        })
    }

    render(){
        return (
            <div>
                <Button className="button" id="deletereviewbtn" type="submit" onClick={this.deleteReview}>Delete Saved Game</Button>
            </div>
        )
    }
}

export default ReviewDelete
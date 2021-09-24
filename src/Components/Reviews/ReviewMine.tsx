import React, { Component } from 'react';
import { Table } from 'reactstrap';
import ReviewDelete from './ReviewDelete';
import ReviewUpdate from './ReviewUpdate'

type ReviewMineVars = {
    gametitle: string,
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
            <div className="reviewminediv">
                <div className="reviewmain">
                {myReviews.length > 0 && (
                    <div className='reviewmineTable'>
                        {myReviews.map(myReviews => (
                            <div className='myReviews' key={myReviews.id}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Game Name</th>
                                            <th>Date</th>
                                            <th>Feedback</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{myReviews.gametitle}</td>
                                            <td>{myReviews.date}</td>
                                            <td>{myReviews.feedback}</td>
                                            <td>{myReviews.rating}</td>
                                            <td><ReviewUpdate token={this.props.token} myReviews={myReviews} fetchMyReviews={this.fetchReviewMine}/></td>
                                            <td><ReviewDelete token={this.props.token} myReviews={myReviews} fetchMyReviews={this.fetchReviewMine}/></td>
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

export default ReviewMine
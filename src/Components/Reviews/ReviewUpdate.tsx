import { Component } from 'react';
import { 
    Button, 
    Form, 
    Label, 
    Input,
    Modal, 
    ModalBody, 
    ModalHeader
} from 'reactstrap';

type ReviewUpdateVars = {
    gametitle: string,
    date: string,
    feedback: string,
    rating: number | string,
    modal: boolean
}

type ReviewUpdateProps = {
    token: string,
    myReviews: any,
    fetchMyReviews: Function
}

class ReviewUpdate extends Component<ReviewUpdateProps, ReviewUpdateVars> {
    constructor(props: ReviewUpdateProps) {
        super(props)
        this.state = {
            gametitle: this.props.myReviews.gametitle,
            date: this.props.myReviews.date,
            feedback: this.props.myReviews.feedback,
            rating: this.props.myReviews.rating,
            modal: true
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleReviewUpdate = async (e: any) => {
        e.preventDefault();
        await fetch(`http://localhost:3000/review/update/${this.props.myReviews.id}`, {
            method: "PUT",
            body: JSON.stringify({
                gametitle: this.state.gametitle,
                date: this.state.date,
                feedback: this.state.feedback,
                rating: this.state.rating
            }),
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((response) => response.json()
        ).then ((data) => {
            this.setState({
                gametitle: "",
                date: "",
                feedback: "",
                rating: ""
            })
                this.toggle()
                this.props.fetchMyReviews();
        }).catch((error) => {
            console.log(error.message)
            })
        };


    render() {
        return (
            <div className="updatereview">
                <div className="updatereviewmaindiv">
                    <Button className="updatereviewbtn" id="updatereviewbtn" onClick={this.toggle} style={{ marginRight: "auto", marginLeft: "auto", alignContent: 'center'}}>Update Review</Button>
                    <Modal isOpen={!this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Update Review</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleReviewUpdate}> 
                        <h1>Edit Review!</h1>
                            <Label>Game Name:</Label>
                            <span>
                            {this.state.gametitle}
                            </span>
                        <br />
                            <Label>Date Played:</Label>
                            <Input type="text" onChange={(e) => this.setState({date: e.target.value})}/>
                        <br />
                            <Label>Review:</Label>
                            <Input type="text" onChange={(e) => this.setState({feedback: e.target.value})}/>
                        <br />
                            <Label>Rating:</Label>
                            <Input type="number" onChange={(e) => this.setState({rating: e.target.value})}/>
                        <br />
                        <Button>Update Game!</Button>
                    </Form>
                    </ModalBody>
                    </Modal>
                </div>
            </div>
            )
    }
}

export default ReviewUpdate
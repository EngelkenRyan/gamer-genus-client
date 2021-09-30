import { Typography } from "@material-ui/core";
import React, { Component } from "react";
import { Form, Input, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/environment";
import "./Display.css";

type CreateReviewVars = {
  gametitle: string;
  gameimage: any;
  date: string;
  feedback: string;
  rating: number | string;
  owner: number;
  modal: boolean;
};

type CreateReviewProps = {
  token: string;
  game: any;
};

class CreateReview extends Component<CreateReviewProps, CreateReviewVars> {
  constructor(props: CreateReviewProps) {
    super(props);
    this.state = {
      gametitle: "",
      gameimage: "",
      date: "",
      feedback: "",
      rating: 0,
      owner: 0,
      modal: true,
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleCreate = async (e: any) => {
    e.preventDefault();
    const response = await fetch(`${APIURL}/review/create`, {
      method: "POST",
      body: JSON.stringify({
        gametitle: this.props.game.name,
        gameimage: this.props.game.background_image,
        date: this.state.date,
        feedback: this.state.feedback,
        rating: this.state.rating,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.token}`,
      },
    });
    const res = await response.json().catch((error) => {
      console.log(error.message);
    });
  };

  render() {
    return (
      <div>
        <Button className="submitreviewbtn" onClick={this.toggle}>
          Create Review
        </Button>
        <Modal isOpen={!this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="reviewcreateheader">
            Create Review
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleCreate}>
              <div className="createreviewlabel">
                <textarea readOnly className="textareacreate">
                  {this.props.game.name}
                </textarea>
                <textarea readOnly className="textareacreate">
                  {this.props.game.background_image}
                </textarea>
                <Input
                  onChange={(e) => this.setState({ date: e.target.value })}
                  className="reviewcreateinputs"
                  placeholder="date of review"
                  value={this.state.date}
                  required
                />
                <textarea
                  onChange={(e) => this.setState({ feedback: e.target.value })}
                  className="reviewcreateinputsfeedback"
                  placeholder="Enter your review"
                  value={this.state.feedback}
                  required
                />
                <Typography color="textSecondary">
                  Rate this game(1 being the worst and 5 being the best)
                </Typography>
                <Input
                  onChange={(e) => this.setState({ rating: e.target.value })}
                  type="number"
                  className="reviewcreateinputs"
                  placeholder="Rate this game(1 being the worst and 5 being the best)"
                  value={this.state.rating}
                  required
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="submitreviewbtn"
                  onClick={this.handleCreate}
                >
                  Create Review
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CreateReview;

import React, { Component } from "react";
import {Button, Form, Modal, ModalHeader, ModalFooter} from "reactstrap";
import Register from './Register'
import Login from "./Login";

type AuthVariables = {
  showLogin: boolean,
  buttonText: string,
  modal: boolean
}

type AuthProps = {
updateToken: (newToken: string) => void
token: string
}

class Auth extends Component<AuthProps, AuthVariables> {
constructor(props: AuthProps) {
super(props)
this.state = {modal: true, showLogin: true, buttonText: "Already a User?" };}



toggle = (): void => {
this.setState({modal: !this.state.modal})
}

componentDidMount() {
  if(localStorage.getItem("token")) {
    this.setState({modal: !this.state.modal})
  }
}

  handleClick = () => {
    if (this.state.showLogin === true) {
      this.setState({showLogin: false});
      this.setState({buttonText: "New User?"});
    } else {
      this.setState ({showLogin: true});
      this.setState({buttonText: "Already A User?"});
    }
  }

  render() {
  return (
    <div> 
    <Form onSubmit={(e) => e.preventDefault()}>
        <Modal isOpen={this.state.modal} >
          <div className="form-container">
            {this.state.showLogin === true ? (
              <Register updateToken={this.props.updateToken} token={this.props.token} toggle={this.toggle} />
            ) : (
              <Login updateToken={this.props.updateToken} token ={this.props.token}  toggle={this.toggle} />
            )}

            <ModalFooter>
              <Button color="secondary" onClick={this.handleClick}>
                  {this.state.buttonText}
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </Form>
</div>
  )
};
}
export default Auth;
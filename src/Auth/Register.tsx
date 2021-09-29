import React, { Component } from "react";
import { Form, FormGroup, FormText, Label, Input, Button, InputGroup,  Modal, 
  ModalBody, ModalHeader, InputGroupAddon } from "reactstrap";

type RegisterVars = {
  email: string,
  username: string,
  password: string,
  role: string,
  modal:  boolean
}

type RegisterProps = {
  updateToken: (newToken: string) => void
  token: string,
}

class Register extends Component<RegisterProps, RegisterVars> {
  constructor(props: RegisterProps ){
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      role: "",
      modal: true
    }
  }


  toggle = () => {
    this.setState({modal: !this.state.modal})
}


  handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        localStorage.setItem("role", data.user.role);
    }).catch((error) => {
      console.log(error.message)
      })
};

  render() {
    return (
      <div className="Register" style={{
        textAlign: "center",
        marginRight: "auto",
        marginLeft: "auto"
    }}>
        <Button onClick={this.toggle}>Create Account</Button>
        <Modal isOpen={!this.state.modal} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle} style={{marginBottom: "1%", marginTop: ".5%", textAlign: 'center', 
              marginRight: "auto",
              marginLeft: "auto",
          }}>Create Account</ModalHeader>
        <ModalBody>
        <Form onSubmit={this.handleSubmit} style={{
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto"
            }}>
          <FormGroup className="register-form" >
            <Label className="register-label" htmlFor="Email" >Email</Label><br />
            <Input
            onChange={(e) => this.setState({email: e.target.value})}
            type="email"
            name="email"
            placeholder="example@email.com"
            value={this.state.email} 
            required
            style={{marginBottom: "2%", marginTop: ".5%", textAlign: 'center', 
              marginRight: "auto",
              marginLeft: "auto",
              width: '50% '
          }}/>
          </FormGroup>
          <FormGroup className="register-form">
            <Label className="register-label" htmlFor="username">Username</Label><br />
            <Input 
            onChange={(e) => this.setState({username: e.target.value })}
            name="username"
            placeholder="username"
            value={this.state.username} 
            required
            style={{marginBottom: "2%", marginTop: ".5%", textAlign: 'center', 
            marginRight: "auto",
            marginLeft: "auto",
            width: '50%'
        }}/>
          </FormGroup>
          <FormGroup className="register-form">
            <Label className="register-label" htmlFor="Password">Password</Label><br />
            <Input 
            onChange={(e) => this.setState({password: e.target.value })}
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            required pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'
            style={{marginBottom: "2%", marginTop: ".5%", textAlign: 'center', 
            marginRight: "auto",
            marginLeft: "auto",
            width: '50% '
        }}/>
          </FormGroup>
          <FormGroup style={{marginBottom: "1%"}}>
            <select onChange={(e) => this.setState({role: e.target.value.toLowerCase() })} style={{marginBottom: "2%", width: '25%'}}>
            <option>User</option>
            <option>Admin</option>
            </select>
          </FormGroup>
            <Button type="submit" style={{marginBottom: ".5%"}}>Sign Up!</Button>
        </Form>
        </ModalBody>
        </Modal>
      </div>
    )
  }
}
export default Register
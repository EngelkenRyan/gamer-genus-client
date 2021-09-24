import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap"

type RegisterVars = {
  email: string,
  username: string,
  password: string,
  role: string,
}

type RegisterProps = {
  updateToken: (newToken: string) => void
  token: string,
  toggle: Function
}

class Register extends Component<RegisterProps, RegisterVars> {
  constructor(props: RegisterProps ){
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      role: ""
    }
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
    })
  }

  render() {
    return (
      <div style={{
        textAlign: "center",
        marginRight: "auto",
        marginLeft: "auto",
    }}>
        <h1>Sign up</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup className="register-form">
            <Label className="register-label" htmlFor="Email" >Email</Label><br />
            <Input
            onChange={(e) => this.setState({email: e.target.value})}
            type="email"
            name="email"
            placeholder="example@email.com"
            value={this.state.email} 
            required
            style={{marginBottom: "1%", marginTop: ".5%", textAlign: 'center'}}
            />
          </FormGroup>
          <FormGroup className="register-form">
            <Label className="register-label" htmlFor="username">Username</Label><br />
            <Input 
            onChange={(e) => this.setState({username: e.target.value })}
            name="username"
            placeholder="username"
            value={this.state.username} 
            required
            style={{marginBottom: "1%", marginTop: ".5%", textAlign: 'center'}}/>
          </FormGroup>
          <FormGroup className="register-form">
            <Label className="register-label" htmlFor="Password">Password</Label><br />
            <Input 
            onChange={(e) => this.setState({password: e.target.value })}
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            required
            style={{marginBottom: "1%", marginTop: ".5%", textAlign: 'center'}}/>
          </FormGroup>
          <FormGroup style={{marginBottom: "1%"}}>
            <select onChange={(e) => this.setState({role: e.target.value.toLowerCase() })}>
            <option>User</option>
            <option>Admin</option>
            </select>
          </FormGroup>
            <Button type="submit" style={{marginBottom: ".5%"}}>Sign Up!</Button>
        </Form>
      </div>
    )
  }
}
export default Register
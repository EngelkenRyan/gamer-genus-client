import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

type UserVars = {
    email: string,
    password: string
}

type LoginProps = {
    updateToken: (newToken: string) => void,
    token: string,
    toggle: () => void
}

class Login extends Component<LoginProps, UserVars> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    
    handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`http://localhost:3000/user/login`, {
          method: "POST",
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            this.props.updateToken(data.sessionToken);
            localStorage.setItem("role", data.user.role);
            // this.props.toggle();
        })
      }

      render() {
          return (
              <div                       style={{
                textAlign: "center",
                marginRight: "auto",
                marginLeft: "auto"
            }}>
                  <h1>Login</h1>
                  <Form onSubmit={this.handleSubmit}>
                      <FormGroup className="login-form">
                          <Label htmlFor="email" className="login-label">Email</Label><br />
                          <Input
                            onChange={(e) => this.setState({email: e.target.value})}
                            type="email"
                            name="email"
                            placeholder="example@email.com"
                            value={this.state.email} 
                            required
                            style={{marginBottom: "1%", marginTop: ".5%", textAlign: 'center'}}/>
                      </FormGroup>
                      <FormGroup className="login-form">
                          <Label htmlFor="password" className="login-label">Password</Label><br />
                          <Input 
                            onChange={(e) => this.setState({password: e.target.value })}
                            type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            required
                            style={{marginBottom: "1%", marginTop: ".5%", textAlign: 'center'}}/>
                      </FormGroup>
                      <Button type="submit" style={{marginBottom: ".5%"}}>Login</Button>
                  </Form>
              </div>
          )
      }
    }

    export default Login;
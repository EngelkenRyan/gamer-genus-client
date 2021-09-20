import React from 'react';
import {
    Navbar,
    Collapse,
    NavbarToggler,
    Nav,
    NavItem,
    Button,
    } from 'reactstrap';
    import {
        Link,
    } from 'react-router-dom';

type NavbarProps = {
    token: string,
    clearToken: () => void,
}

type NavbarVars = {
}

class Navigation extends React.Component<NavbarProps, NavbarVars> {
    constructor (props: NavbarProps) {
        super(props)
        this.state = {
        }
    };
    
    render() {
        return(
            <Navbar light expand="md" className="navbar">
                <Nav className="navlinks" navbar>
                    <NavItem>
                        <Link to='/savedgamesmine' className='navbarButton'>My Saved Games</Link>
                        </NavItem>
                    </Nav>
                    <div className="logoutbtn">
                        <Button onClick={this.props.clearToken}>Logout</Button>
                        </div>
                        </Navbar>
                        )
                    }
                }
                
export default Navigation


                {/* <Switch>
                    <Route exact path='/savedgamesmine'><SavedGamesMine token={this.props.token}/></Route>
                </Switch> */}
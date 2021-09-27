import React from 'react';
import {
    Navbar,
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
    isOpen: boolean;
}

class Navigation extends React.Component<NavbarProps, NavbarVars> {
    constructor (props: NavbarProps) {
        super(props)
        this.state = {
            isOpen: true
        }
    };

        
        render() {
            return(
                <Navbar light expand="md" className="navbar">
                <Nav className="navlinks" navbar>
                    <NavItem>
                        <Link to='/' className='navbarButton' style={{ textDecoration: 'none', color: 'black'}}>Home</Link>
                        <Link to='/savedgamesmine' className='navbarButton' style={{ textDecoration: 'none', color: 'black'}}>My Saved Games</Link>
                        <Link to='/reviewmine' className='navbarButton' style={{ textDecoration: 'none', color: 'black'}}>My Reviews</Link>
                        <Link to='/reviewall' className='navbarButton' style={{ textDecoration: 'none', color: 'black'}}>Review All</Link>
                        <Button onClick={this.props.clearToken}>Logout</Button>
                    </NavItem>
                    </Nav>
                        </Navbar>
                        )
                    }
                }
                
export default Navigation

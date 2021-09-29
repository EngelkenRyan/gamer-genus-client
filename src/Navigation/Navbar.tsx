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
                        <Link to='/' className='navbarButton' style={{ textDecoration: 'none', color: 'black', marginRight: '10px'}}>Home</Link>
                        <Link to='/savedgamesmine' className='navbarButton' style={{ textDecoration: 'none', color: 'black', marginRight: '10px'}}>My Saved Games</Link>
                        <Link to='/reviewmine' className='navbarButton' style={{ textDecoration: 'none', color: 'black', marginRight: '10px'}}>My Reviews</Link>
                        <Link to='/reviewall' className='navbarButton' style={{ textDecoration: 'none', color: 'black', marginRight: '10px'}}>Review All</Link>
                        <Button onClick={this.props.clearToken} style={{ textDecoration: 'none', color: 'black', border: 'none', }}>Logout</Button>
                    </NavItem>
                    </Nav>
                        </Navbar>
                        )
                    }
                }
                
export default Navigation

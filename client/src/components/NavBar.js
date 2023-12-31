import React, { useContext } from 'react';
import { Context } from '../index';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const history = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{ color: "white", textDecoration: 'none' }} to={SHOP_ROUTE}>DeviceStore</NavLink>
                {user.isAuth ? <Nav className="ml-auto" style={{ color: "white" }}>
                    {user.isAdmin ? <Nav.Link onClick={() => history(ADMIN_ROUTE, {replace: true}) }>Admin Panel</Nav.Link> : null}
                    <Nav.Link onClick={() => history(BASKET_ROUTE, {replace: true}) }>Basket</Nav.Link>
                        <Nav.Link onClick={() => logOut()}>Log Out</Nav.Link>
                    </Nav> : <Nav className="ml-auto" style={{ color: "white" }}>
                        <Nav.Link onClick={() => history(LOGIN_ROUTE)}>Authorization</Nav.Link>
                    </Nav>
                }
                
            </Container>
        </Navbar>
    );
})

export default NavBar;

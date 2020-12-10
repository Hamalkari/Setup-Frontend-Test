import React from "react";
import { withRouter, NavLink, Switch, Route } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";

import Home from "../pages/Home";
import UserList from "../pages/UserList";
import UserEdit from "../pages/UserEdit";
import UserCreate from "../pages/UserCreate";

function Header(props) {
  const menuItems = [
    {
      to: "/",
      title: "Главная",
    },
    {
      to: "/users",
      title: "Пользователи",
    },
    {
      to: "/users/create",
      title: "Создать пользователя",
    },
  ];

  return (
    <div>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="navbarNav" />

        <Container>
          <Navbar.Collapse id="navbarNav">
            <Nav>
              {menuItems.map(({ to, title }) => (
                <Nav.Item className="nav-item" key={to}>
                  <Nav.Link as={NavLink} to={to} exact activeClassName="active">
                    {title}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/users"} exact component={UserList} />
        <Route path={"/users/create"} exact component={UserCreate} />
        <Route path={"/:id/edit"} exact component={UserEdit} />
      </Switch>
    </div>
  );
}

export default withRouter(Header);

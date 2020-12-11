import React from "react";
import { Link } from "react-router-dom";

import { Container, Button } from "react-bootstrap";

function Home(props) {
  return (
    <div className="p-4">
      <Container>
        <h1 className="h3 text-center mb-4">
          Тестовое задание frontend-разработчик SETUP
        </h1>

        <div className="btns-container text-center">
          <Button
            className="mr-3"
            variant="primary"
            as={Link}
            to="/users"
            exact
          >
            Список пользователей
          </Button>

          <Button variant="success" as={Link} to="/users/create" exact>
            Создать пользователя
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Home;

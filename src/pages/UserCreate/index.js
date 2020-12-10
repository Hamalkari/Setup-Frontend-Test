import React from "react";
import { Container } from "react-bootstrap";

import UserCreateForm from "./components/UserCreateForm";

function UserCreate(props) {
  return (
    <div className="p-4">
      <Container>
        <h1 className="h3 text-center mb-3">Создание пользователя</h1>

        <UserCreateForm />
      </Container>
    </div>
  );
}

export default UserCreate;

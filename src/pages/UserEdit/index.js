import React from "react";
import { Container } from "react-bootstrap";

import UserEditForm from "./components/UserEditForm";

function UserEdit(props) {
  return (
    <div className="p-4">
      <Container>
        <h1 className="h3 text-center mb-3">Изменение пользователя</h1>

        <UserEditForm />
      </Container>
    </div>
  );
}

export default UserEdit;

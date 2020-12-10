import React from "react";
import { useParams } from "react-router-dom";

import { Container } from "react-bootstrap";
import UserEditForm from "./components/UserEditForm";

function UserEdit(props) {
  const { id } = useParams();

  return (
    <div className="p-4">
      <Container>
        <h1 className="h3 text-center mb-3">Изменение пользователя</h1>

        <UserEditForm id={id} />
      </Container>
    </div>
  );
}

export default UserEdit;

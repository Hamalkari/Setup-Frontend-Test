import React from "react";

import UserTable from "./components/UserTable";

function UserList(props) {
  return (
    <div className="p-4">
      <h1 className="h3 text-center mb-4">Список пользователей</h1>

      <UserTable />
    </div>
  );
}

export default UserList;

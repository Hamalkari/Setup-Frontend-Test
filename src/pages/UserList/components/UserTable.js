import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { Pagination, Table, Button, Form, Modal } from "react-bootstrap";

import UserService from "../../../services/user.service";

function UserTablePagination({
  perPage,
  totalItems,
  currentPage,
  onPageChange,
}) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / perPage));
  }, [perPage, totalItems]);

  const paginationItems = useMemo(() => {
    return [...Array(totalPages)].map((_, i) => {
      const pageIndex = i + 1;

      return (
        <Pagination.Item
          key={pageIndex.toString()}
          active={pageIndex === currentPage}
          onClick={() => onPageChange(pageIndex)}
        >
          {pageIndex}
        </Pagination.Item>
      );
    });
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {paginationItems}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
}

function UserDeleteModalDialog({ user, showDeleteModal, onClose }) {
  return (
    <Modal
      size="lg"
      show={showDeleteModal}
      onHide={() => onClose(false, user.id)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение удаления</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-2">
          Вы действительно хотите удалить пользователя ?
        </div>

        <div>Электронный адрес - {user.email}</div>
        <div>ФИО - {user.fio}</div>
        <div>Номер телефона - {user.phone}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={() => onClose(true, user.id)}>
          Да
        </Button>

        <Button variant="danger" onClick={() => onClose(false, user.id)}>
          Нет
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function UserTableFilters({
  filterSearch,
  filterStatus,
  onFilterStatusChange,
  onFilterSearchChange,
}) {
  return (
    <Form>
      <div className="h3">Фильтры</div>
      <div className="d-flex flex-sm-row flex-column align-items-sm-end align-items-stretch">
        <Form.Control
          type="text"
          value={filterSearch}
          style={{ maxWidth: "500px" }}
          onChange={onFilterSearchChange}
          className="mr-3 mb-sm-0 mb-3"
          placeholder="Поиск по электронному адресу или телефону"
        />

        <Form.Group className="mb-0">
          <Form.Label htmlFor="filterStatus">Статус</Form.Label>

          <Form.Control
            as="select"
            id="filterStatus"
            value={filterStatus}
            onChange={onFilterStatusChange}
          >
            <option value="all">Все</option>
            <option value="client">Клиент</option>
            <option value="partner">Партнер</option>
            <option value="admin">Админ</option>
          </Form.Control>
        </Form.Group>
      </div>
    </Form>
  );
}

function UserTable(props) {
  const [users, setUsers] = useState(UserService.getList());
  const [totalItems, setTotalItems] = useState(0);
  const [filterSearch, setFilterSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const statusObj = {
    client: "Клиент",
    partner: "Партнер",
    admin: "Админ",
  };

  const handleChangePerPage = (el) => {
    setPerPage(Number(el.target.value));

    setCurrentPage(1);
  };

  const handleCloseDeleteModal = (isConfirm, id) => {
    setShowDeleteModal(false);

    if (isConfirm) {
      UserService.remove(id);

      setUsers([...UserService.getList()]);
    }
  };

  const usersTableData = useMemo(() => {
    const filteredUsers = users.filter(
      (user) =>
        (user.email.includes(filterSearch) ||
          user.phone.includes(filterSearch)) &&
        (filterStatus === "all" || user.status === filterStatus)
    );

    setTotalItems(filteredUsers.length);

    return filteredUsers.slice(
      perPage * (currentPage - 1),
      perPage * (currentPage - 1) + perPage
    );
  }, [users, filterSearch, filterStatus, perPage, currentPage]);

  return (
    <div>
      <div className="mb-4">
        <UserTableFilters
          filterStatus={filterStatus}
          filterSearch={filterSearch}
          onFilterStatusChange={(el) => setFilterStatus(el.target.value)}
          onFilterSearchChange={(el) => setFilterSearch(el.target.value)}
        />
      </div>

      <div className="table-container">
        <div className="table-up row justify-content-between mb-3">
          <div className="col-auto">
            <label>
              Показывать{" "}
              <select
                id="perPage"
                value={perPage}
                onChange={handleChangePerPage}
                className="form-control d-inline-block w-auto"
              >
                <option value="10">10</option>
                <option value="20">25</option>
                <option value="50">50</option>
              </select>{" "}
              пользователей
            </label>
          </div>

          <div className="col-auto">
            <Link to={"/users/create"} className="btn btn-primary">
              Создать пользователя
            </Link>
          </div>
        </div>

        <Table responsive>
          <thead>
            <tr>
              <th>Электронный адрес</th>
              <th>Пароль</th>
              <th>Телефон</th>
              <th>ФИО</th>
              <th>Статус</th>
              <th>Дата создания</th>
              <th>Дата последнего изменения</th>
              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {usersTableData.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.fio}</td>
                <td>{statusObj[user.status]}</td>
                <td>{moment(user.createdAt).format("DD.MM.YYYY hh:mm:ss")}</td>
                <td>{moment(user.updatedAt).format("DD.MM.YYYY hh:mm:ss")}</td>
                <td>
                  <div className="btn-group">
                    <Button
                      variant="success"
                      as={Link}
                      to={`${user.id}/edit`}
                      className="mr-3"
                      size="sm"
                    >
                      Изменить
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Удалить
                    </Button>

                    <UserDeleteModalDialog
                      showDeleteModal={showDeleteModal}
                      user={user}
                      onClose={(isConfirm, id) =>
                        handleCloseDeleteModal(isConfirm, id)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <UserTablePagination
          perPage={perPage}
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  );
}

export default UserTable;

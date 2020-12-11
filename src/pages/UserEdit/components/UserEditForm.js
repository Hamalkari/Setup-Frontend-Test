import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { now } from "moment";
import { useHistory, useParams } from "react-router-dom";

import { FormGroup, FormLabel, Button } from "react-bootstrap";
import UserService from "../../../services/user.service";

function UserEditForm(props) {
  const { id } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(() => UserService.getOne(id));

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Введите корректный email")
      .required("Электронный адрес обязателен для заполнения"),
    password: Yup.string().required("Пароль обязателен для заполнения"),
    phone: Yup.string().required("Телефон обязателен для заполнения"),
    fio: Yup.string().required("ФИО обязательно для заполнения"),
    status: Yup.mixed().oneOf(["client", "partner", "admin"]),
  });

  const initialValues = {
    email: user.email,
    password: user.password,
    phone: user.phone,
    fio: user.fio,
    status: user.status,
  };

  const handleSubmit = (values) => {
    const editUser = {
      ...values,
      updatedAt: now(),
    };

    const editedUser = UserService.edit(id, editUser);

    setUser(editedUser);

    toast.success("Пользователь успешно изменен!");

    history.push("/users");
  };

  const handleCancelEdit = () => {
    history.push("/users");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const { errors, touched, isValid } = formik;

        return (
          <Form>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="email">Электронный адрес</FormLabel>
              <Field
                type="text"
                name="email"
                id="email"
                className={`form-control ${
                  errors.email && touched.email ? "input-error" : ""
                }`}
              />
              <ErrorMessage name="email" component="span" className="error" />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <Field
                type="text"
                name="password"
                id="password"
                className={`form-control ${
                  errors.password && touched.password ? "input-error" : ""
                }`}
              />
              <ErrorMessage
                name="password"
                component="span"
                className="error"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="phone">Номер телефона</FormLabel>
              <Field
                type="text"
                name="phone"
                id="phone"
                className={`form-control ${
                  errors.phone && touched.phone ? "input-error" : ""
                }`}
              />
              <ErrorMessage name="phone" component="span" className="error" />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel htmlFor="fio">ФИО</FormLabel>
              <Field
                type="text"
                name="fio"
                id="fio"
                className={`form-control ${
                  errors.fio && touched.fio ? "input-error" : ""
                }`}
              />
              <ErrorMessage name="fio" component="span" className="error" />
            </FormGroup>
            <FormGroup className="mb-4">
              <FormLabel htmlFor="status">Статус пользователя</FormLabel>
              <Field
                as="select"
                className="form-control"
                name="status"
                id="status"
              >
                <option value="client">Клиент</option>
                <option value="partner">Партнер</option>
                <option value="admin">Админ</option>
              </Field>
            </FormGroup>

            <div className="btn-container text-center">
              <Button
                variant="success"
                className="mr-3"
                type="submit"
                disabled={!isValid}
              >
                Изменить
              </Button>

              <Button variant="danger" onClick={handleCancelEdit}>
                Отменить
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default UserEditForm;

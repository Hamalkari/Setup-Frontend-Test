import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { now } from "moment";
import { FormGroup, FormLabel, Button } from "react-bootstrap";

import UserService from "../../../services/user.service";

import * as Yup from "yup";

function UserCreateForm(props) {
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
    email: "",
    password: "",
    phone: "",
    fio: "",
    status: "client",
  };

  const handleSubmit = (values) => {
    const user = {
      id: uuidv4(),
      ...values,
      createdAt: now(),
      updatedAt: now(),
    };

    UserService.create(user);

    toast.success("Пользователь успешно создан");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;

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
              <ErrorMessage name="email" component="div" className="error" />
            </FormGroup>
            <FormGroup className="fmb-3">
              <FormLabel htmlFor="password">Пароль</FormLabel>
              <Field
                type="password"
                name="password"
                id="password"
                className={`form-control ${
                  errors.password && touched.password ? "input-error" : ""
                }`}
              />
              <ErrorMessage name="password" component="div" className="error" />
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
              <ErrorMessage name="phone" component="div" className="error" />
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
              <ErrorMessage name="fio" component="div" className="error" />
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
                variant="primary"
                type="submit"
                className="mr-3"
                disabled={!(isValid && dirty)}
              >
                Создать
              </Button>

              <Button variant="secondary" type="reset">
                Сбросить
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default UserCreateForm;

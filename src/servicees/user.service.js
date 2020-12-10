const users =
  localStorage.getItem("users") !== null
    ? JSON.parse(localStorage.getItem("users"))
    : [];

const getList = () => {
  return users;
};

const getOne = (id) => {
  const user = users.find((user) => user.id === id);

  return user;
};

const remove = (id) => {
  const userId = users.findIndex((user) => user.id === id);

  users.splice(userId, 1);

  localStorage.setItem("users", JSON.stringify(users));
};

const edit = (id, data) => {
  const user = users.find((user) => user.id === id);

  Object.assign(user, data);

  localStorage.setItem("users", JSON.stringify(users));

  return user;
};

const create = (user) => {
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
};

const UserService = {
  getList,
  getOne,
  remove,
  create,
  edit,
};

export default UserService;

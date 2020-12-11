const UserService = {
  users:
    localStorage.getItem("users") !== null
      ? JSON.parse(localStorage.getItem("users"))
      : [],

  getList() {
    return this.users;
  },

  getOne(id) {
    const user = this.users.find((user) => user.id === id);

    return user;
  },

  remove(id) {
    const userId = this.users.findIndex((user) => user.id === id);

    this.users.splice(userId, 1);

    localStorage.setItem("users", JSON.stringify(this.users));
  },

  edit(id, data) {
    const user = this.users.find((user) => user.id === id);

    Object.assign(user, data);

    localStorage.setItem("users", JSON.stringify(this.users));

    return user;
  },

  create(user) {
    this.users.push(user);

    localStorage.setItem("users", JSON.stringify(this.users));
  },
};

export default UserService;

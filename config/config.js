module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "start5_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PW || "root",
    database: process.env.DB || "start5_db",
    host: process.env.DB_HOST || "127.0.0.1",
    port: 3306,
    dialect: "mysql"
  }
};

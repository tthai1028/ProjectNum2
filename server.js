const express = require("express");
const session = require("express-session");
const db = require("./models");
const PORT = process.env.PORT || 4000;
const app = express();
const handlebars = require("express-handlebars");
const passport = require("./config/passport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({ secret: "teetee", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

db.sequelize.sync({ force: true}).then(() => {
  app.listen(PORT, () => {
    console.log("Listening on port %s", PORT);
  });
});

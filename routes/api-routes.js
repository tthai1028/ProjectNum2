// Requiring our models and passport as we've configured it
const db = require("../models");
const { Op } = require("sequelize");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.User.findOne({ where: { id: req.user.id } }).then(user => {
        console.log(user.favs);
        const queryArr = JSON.parse(user.favs).reduce(
          (a, b) => (a.push({ id: +b }), a),
          []
        );
        db.Player.findAll({
          where: {
            [Op.or]: queryArr
          }
        }).then(favs => res.send({ players: favs.map(a => a.dataValues), ...user })
        );
      });
    }
  });

  app.put("/api/fav/:action/:uId/:pId", async ({ params }, res) => {
    console.log(params);
    const { dataValues } = await db.User.findOne({ where: { id: params.uId } });
    const favs = JSON.parse(dataValues.favs);
    params.action === "add"
      ? favs.push(params.pId)
      : favs.splice(favs.indexOf(params.pId), 1);
    await db.User.update(
      { favs: JSON.stringify(favs) },
      {
        where: { id: params.uId }
      }
    );
    console.log(favs);
  });
};

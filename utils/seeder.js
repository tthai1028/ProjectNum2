const db = require("../models");
const csv = require("csvtojson");
const path = "../db/Start5_db.csv";

const runSeed = async () => {
  try {
    const seeds = await csv().fromFile(path);
    const mapped = seeds.map(a => {
      delete a["#"];
      return a;
    });
    await db.Player.bulkCreate(mapped);
  } catch (err) {
    console.log("run seed", err);
  }
};

module.exports = runSeed;

//runSeed();

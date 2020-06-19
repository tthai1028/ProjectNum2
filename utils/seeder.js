const db = require("../models");
const csv = require("csvtojson");
const path = "../db/Start5_db.csv";

const runSeed = async () => {
  try {
    const seeds = await csv().fromFile(path);
    console.log("seeds", seeds);
    const mapped = seeds.map(a => {
      delete a["#"];
      return a;
    });
    console.log("mapped", mapped);
    await db.Player.bulkCreate(mapped);
  } catch (err) {
    console.log("run seed", err);
  }
};

module.exports = runSeed;

//runSeed();

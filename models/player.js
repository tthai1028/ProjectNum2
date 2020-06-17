// Creating our User model
module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Player", {
    // The email cannot be null, and must be a proper email before creation
    PLAYER: DataTypes.STRING,
    GP: DataTypes.INTEGER,
    MIN: DataTypes.INTEGER,
    PTS: DataTypes.INTEGER,
    FGA: DataTypes.INTEGER,
    FGM: DataTypes.INTEGER,
    "FG%": DataTypes.DOUBLE,
    "3PM": DataTypes.INTEGER,
    "3PA": DataTypes.INTEGER,
    "3P%": DataTypes.DOUBLE,
    FTM: DataTypes.INTEGER,
    FTA: DataTypes.INTEGER,
    "FT%": DataTypes.DOUBLE,
    OREB: DataTypes.INTEGER,
    DREB: DataTypes.INTEGER,
    REB: DataTypes.INTEGER,
    AST: DataTypes.INTEGER,
    STL: DataTypes.INTEGER,
    BLK: DataTypes.INTEGER,
    TOV: DataTypes.INTEGER,
    EFG: DataTypes.DOUBLE,
    TS: DataTypes.DOUBLE,
    URL: DataTypes.TEXT
  });
};

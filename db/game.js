const { Sequelize, DataTypes } = require('sequelize');
const { STATES_GAME } = require('../config/constants');
const db = require('./connection');

const Game = db.define('Game', {
  height: {  type: DataTypes.INTEGER, allowNull: false },
  width: {  type: DataTypes.INTEGER, allowNull: false },
  mines: {  type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
  state: {type: DataTypes.STRING, defaultValue: STATES_GAME.PENDING}
}, 
{
    timestamps: true,
    tableName: 'games'
});


module.exports = Game;
const { Sequelize, DataTypes } = require('sequelize');
const db = require('./connection');

const Cell = db.define('Cell', {
  row: {  type: DataTypes.INTEGER, allowNull: false },
  column: {  type: DataTypes.INTEGER, allowNull: false },
  visible: {  type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  value: {type: DataTypes.INTEGER, allowNull: false},
  hasFlag: {  type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  hasQuestionMark: {  type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
  game_id: {  type: DataTypes.INTEGER, allowNull: false }

}, 
{
  timestamps: true,
  tableName: 'cells'
});




module.exports = Cell;
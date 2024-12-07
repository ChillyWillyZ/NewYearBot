const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    scores: {type: DataTypes.INTEGER, defaultValue: 0}, 
    tree: {type: DataTypes.INTEGER, defaultValue: 0},
    snow: {type: DataTypes.INTEGER, defaultValue: 0},
    fire: {type: DataTypes.INTEGER, defaultValue: 0}
})

module.exports = User;
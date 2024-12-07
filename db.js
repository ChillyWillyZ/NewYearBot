const {Sequelize} = require('sequelize');


module.exports = new Sequelize(
    'NewYearB',
    'ChillyWilly',
    '6763421qwE',
    {
        host: '77.223.107.138',
        port: '5432',
        dialect: 'postgres'
    }
);
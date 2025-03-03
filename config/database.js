const { Sequelize } = require('sequelize');
const sequelizeInstance = new Sequelize('meeting_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelizeInstance;
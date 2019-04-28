const Sequelize = require('sequelize');
const db = require('../config/database');

const Gig = db.define('gig', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  engine: {
    type: Sequelize.STRING
  },
  pickup: {
    type: Sequelize.STRING
  },
  rate_per_day: {
    type: Sequelize.STRING
  }
})

module.exports = Gig;



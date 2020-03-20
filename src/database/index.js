//const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Card = require('../app/models/Card');
const List = require('../app/models/List');

//mongoose.connect("mongodb://localhost:27017/kanbanapi", { useNewUrlParser: true,  useUnifiedTopology: true });
//mongoose.Promise = global.Promise;

const connection = new Sequelize(dbConfig);

User.init(connection);
Card.init(connection);
List.init(connection);

//module.exports = mongoose;
module.exports = connection;
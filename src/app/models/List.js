const { Model, DataTypes } = require('sequelize');
const User = require('../models/User');
const Card = require('../models/Card');

class List extends Model {
    static init(sequelize){
        super.init({
            title: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        }, {
            sequelize,
        })

        List.belongsTo(User, { foreignKey: 'userId' })
        Card.belongsTo(User, { foreignKey: 'userId' })
    }
}

module.exports = List;
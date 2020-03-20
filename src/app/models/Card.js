const { Model, DataTypes } = require('sequelize');

class Card extends Model {
    static init(sequelize){
        super.init({
            content: DataTypes.STRING,
            labels: DataTypes.STRING,
            priority: DataTypes.STRING,
            index: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            listId: DataTypes.INTEGER,
        }, {
            sequelize,
        })
        
    }
}

module.exports = Card;
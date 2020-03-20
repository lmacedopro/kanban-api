'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('cards', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        labels: {
            type: Sequelize.STRING,
        },
        priority: {
            type: Sequelize.STRING,
            alowNull: false,
            defaultValue: "normal",
    
        },
        index: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
        },
        created_at:{
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('cards');
  }
};

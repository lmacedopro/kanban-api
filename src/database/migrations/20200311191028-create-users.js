'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        }, 
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        check_email:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        phone: {
          type: Sequelize.STRING,
        },
        check_phone: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
  
        },
        photo: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        profile:{
          type: Sequelize.STRING,
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
      return queryInterface.dropTable('users');
  }
};

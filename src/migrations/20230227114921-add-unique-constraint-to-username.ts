import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (queryInterface: QueryInterface, Sequelize) => {
    await queryInterface.addConstraint('user', {
      fields: ['username'],
      type: 'unique',
      name: 'unique_username',
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize) => {
    await queryInterface.removeConstraint('user', 'unique_username');
  },
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      accountID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userID'
        },
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};

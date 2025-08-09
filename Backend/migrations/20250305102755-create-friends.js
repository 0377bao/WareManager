module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('friends', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userID'
        },
        onDelete: 'CASCADE'
      },
      friendId: {
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
    await queryInterface.dropTable('friends');
  }
};

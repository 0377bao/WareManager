module.exports = (sequelize, Sequelize) => {
  const Friends = sequelize.define('friends', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userID'
      }
    },
    friendId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userID'
      }
    }
  }, {
    tableName: 'Friends',
    timestamps: false,
  });

  return Friends;
};

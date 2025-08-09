module.exports = (sequelize, Sequelize) => {
    const RequestFriends = sequelize.define('requestFriends', {
      senderID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userID'
        }
      },
      receiverID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userID'
        }
      },
      status: {
        type: Sequelize.ENUM('pending', 'accepted', 'declined'),
        allowNull: false,
        defaultValue: 'pending'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    }, {
      tableName: 'RequestFriends',
      timestamps: false
    });
  
    return RequestFriends;
  };
  
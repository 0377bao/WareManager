module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define('Account', {
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
      allowNull: false
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
  }, {
    tableName: 'accounts',
    timestamps: false
  });

  Account.associate = (models) => {
    Account.belongsTo(models.User, { foreignKey: 'userID', as: 'users' });
  };

  return Account;
};

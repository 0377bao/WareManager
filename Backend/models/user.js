module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    userID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: true
    },
    gender: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true
    },
    background: {
      type: Sequelize.STRING,
      allowNull: true
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    User.belongsToMany(models.users, {
      as: 'friends',
      through: 'friends',
      foreignKey: 'userId',
      otherKey: 'friendId'
    });
  };
  User.associate = (models) => {
    User.hasOne(models.Account, { foreignKey: 'userID', as: 'accounts' });
  };

  return User;
};

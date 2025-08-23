module.exports = (sequelize, Sequelize) => {
    const Box = sequelize.define(
        'Box',
        {
            boxID: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            boxName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            width: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            length: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            remainingAcreage: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            maxAcreage: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            status: {
                type: Sequelize.ENUM('AVAILABLE', 'OCCUPIED', 'FULL', 'RESERVED', 'UNDER_MAINTENANCE'),
                allowNull: false,
                defaultValue: 'AVAILABLE',
            },
            floorID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'boxes',
            timestamps: true,
        },
    );

    Box.associate = (models) => {
        Box.belongsTo(models.Floor, { foreignKey: 'floorID' });
        Box.belongsToMany(models.Batch, {
            through: 'batch_boxes',
            foreignKey: 'boxID',
            otherKey: 'batchID',
            as: 'batches',
        });
    };

    return Box;
};

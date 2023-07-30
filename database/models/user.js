module.exports = (sequelize, DataType) => {
    const alias = 'User';

    const cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataType.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataType.STRING(50),
            allowNull: false
        },
        email: {
            type: DataType.STRING(100),
            allowNull: false
        },
        password: {
            type: DataType.STRING(100),
            allowNull: false
        },
        type: {
            type: DataType.STRING(20),
            allowNull: false
        },
        image: {
            type: DataType.STRING(255),
            allowNull: false
        }
    };

    const config = {
        tableName: 'users',
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    return User;
};

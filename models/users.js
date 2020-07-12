import  bcryptjs from 'bcryptjs';
module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('Users', {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(36),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        tableName: 'users',
        hooks: {
            beforeCreate: user => {
                const salt = bcryptjs.genSaltSync();
                user.password = bcryptjs.hashSync(user.password, salt);
            }
        }
    });
    
    Users.associate = (models) => {};

    User.prototype.isPassword = (encodedPassword, password) => {
        return bcryptjs.compareSync(password, encodedPassword);
    };

    return Users;

};
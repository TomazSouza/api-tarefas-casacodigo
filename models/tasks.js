module.exports = (sequelize, DataTypes) => {

    const Tasks = sequelize.define('Tasks', {
        id_task: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        task: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        priority: {
            type: DataTypes.STRING(7),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        start_date: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        end_date: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
            tableName: 'tasks'
    });


    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false,
                field: 'user_id',
                name: 'user_id'
            }
        });
    };

    return Tasks;
};
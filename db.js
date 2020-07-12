import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

//const config = require('./libs/config');

const Op = Sequelize.Op;

let db = null;

const operatorsAliases = {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
};

module.exports = app => {

    if (!db) {
        const config = app.libs.config;

        const sequelize = new Sequelize(
            config.database, 
            config.username, 
            config.password, 
            {
                host: 'localhost',
                dialect: 'mysql',
                operatorsAliases
            }
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, 'models');

        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            //console.log(model.name);
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach(key => {
            if(db.models[key].associate) {
                db.models[key].associate(db.models) 
            }
        });
        
    }
    return db;
};
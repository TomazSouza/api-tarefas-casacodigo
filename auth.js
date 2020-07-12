import passport from 'passport';
import Sequelize from 'sequelize';
import { Strategy } from 'passport-jwt';

module.exports = app => {

    const Users = app.db.models.Users;
    const cfg = app.libs.config;

    const strategy = new Strategy({ secretOrKey: cfg.jwtSecret }, (payload, done) => {

        const sequelize = new Sequelize();

        let sequelizeQuery = sequelize;
        let userEmail = req.body.email;
        let userPassword = req.body.password;

        sequelizeQuery.query("SELECT id_user, email FROM users WHERE id_users = :id ", {
            replacements: {
                id: payload.id
            },
            type: sequelizeQuery.QueryTypes.SELECT
        }).then(success => {

            let getEmail = success[0]['email'];
            let idUser = success[0]['id_user'];

            if (user) {
                return done(null, {
                    id_user: idUser,
                    email: getEmail
                })
            }
            return done(null, false);

        })
        .catch(error => done(error, null));

        /*Users.findById(payload.id)

        
            .then(user => {
                if (user) {
                    return done(null, {
                        id_user: user.id_user,
                        email: user.email
                    })
                }
                return done(null, false);
            })
            .catch(error => done(error, null));*/
    });

    passport.use(strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', cfg.jwtSession);
        }
    };

};
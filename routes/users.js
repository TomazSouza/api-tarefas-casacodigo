import Sequelize from 'sequelize';

module.exports = app => {
    const Op = Sequelize.Op;
    const Users = app.db.models.Users;

    app.get('/users/:id_user', (req, res) => {

        Users.findAll({ 
                where: { 
                    id_user: { [Op.eq]: req.params.id_user } 
                } 
            })
            .then(result => { 
                res.json( { user: result } ) 
            })
            .catch(error => {
                res.status(412).json({ message: error.message });
            });

    });

    app.delete('/users/:id_user', (req, res) => {
        Users.destroy({ where: { id_user: req.params.id_user } })
            .then(result => {
                res.json({ message: 'Usuario deletado com sucesso!' });
            })
            .catch(error => {
                res.status(412).json({ message: error.message });
            });
    });

    app.post('/users', (req, res) => {

        Users.create(req.body)
            .then(result => {
                //console.log(result);
                res.json({id_user: result.id_user});
            })
            .catch(error => {
                res.status(412).json({ message: error.message });
            });

    });

};
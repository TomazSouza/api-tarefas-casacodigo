module.exports = app => {

    const Tasks = app.db.models.Tasks;

    app.route('/tasks')
        .all(app.auth.authenticate())
        .get((req, res) => {
            // Lista tarefas
                Tasks.findAll({
                    where: { user_id: req.user.id_user }
                })
                .then(result => res.json({ tasks: result }))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .post((req, res) => {
            // "/tasks": Cadastra uma nova tarefa
            req.body.user_id = req.user.id_user;
            Tasks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        });

    app.route('/tasks/:id_task')
        .all(app.auth.authenticate())
        .get((req, res) => {
            // "/tasks/1": Consulta uma tarefa
                Tasks.findOne({ where: { 
                    id_task: req.params.id_task,
                    user_id: req.user.id_user
                }})
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .put((req, res) => {
            // "/tasks/1": Atualiza uma terefa
            Tasks.update(req.body, { where: {
                id_task: req.params.id_task,
                user_id: req.user.id_user
            }})
                .then(result => {
                    res.json({ message: 'Tarefa atualizada com sucesso!' });
                })
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .delete((req, res) => {
            // "/tasks/1": Exclui uma terefa
            Tasks.destroy({ where: 
                {
                    id_task: req.params.id_task,
                    user_id: req.user.id_user
                }
            })
                .then(result => {
                    res.json({ message: 'Tarefa excluída com sucesso!' });
                })
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });

        });



};


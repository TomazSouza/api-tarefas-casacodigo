module.exports = app => {

    app.db.sequelize.sync().done(() => {
        
        app.listen(app.get('port'), app.get('host'), () => {
            console.log(`NTask API - http://${app.get('host')}:${app.get('port')}`);
        });
    
    });

};
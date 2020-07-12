import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

module.exports = app =>{

    app.set('port', 3000);
    app.set('host', '192.168.0.6');
    app.set('json spaces', 4);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(app.auth.initialize());
    app.use(cors());
    app.use(helmet());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });

};
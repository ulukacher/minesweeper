const express = require('express');
const db = require('./db/connection')


class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.gamesPath = "/games";
        
        // this.dbConnection();

        this.middlewares();
        this.routes();
    }


    middlewares(){         
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.gamesPath, require("./routes/games"))
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log("Servidor corriendo en port", this.port );
        })
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

            // await db.sync({ force: true });

        } catch (error) {
            throw new Error( error );
        }

    }
}


module.exports = Server;
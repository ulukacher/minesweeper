const express = require('express');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.gamesPath = "/games";

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
}


module.exports = Server;
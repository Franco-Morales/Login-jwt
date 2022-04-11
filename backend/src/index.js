import  "dotenv/config";

import app from "./app";
import initMongo from "./database";


(async () => {
    try {
        let port = app.get('port');

        app.listen(port, () => {
            console.log(`Server on [ http://localhost:${port} ]`);
        });

        initMongo();

    } catch (error) {
        console.error(error);
    }
})();
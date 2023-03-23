const express = require('express');
const app = express();
const Remote = require('./remote')


const PORT = 8080 ;
app.use(express.json());
(async function(){
    try {
        app.listen(PORT, async () => {
            try {
                console.log(`App is started on port ${PORT}...`)
                await Remote.multipleTwoOperands(5, 5);
            } catch (error) {
                console.log(`error:`, error);
            }
        });

    } catch (e) {
        console.log("server error", e.message);
        process.exit(1);
    }
})()

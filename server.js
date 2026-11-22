require('dotenv').config();

const app=require('./src/app');

const conDB=require('./src/db/db');


conDB();

app.listen(3000, () => {
    console.log("server is running on post 3000");
})
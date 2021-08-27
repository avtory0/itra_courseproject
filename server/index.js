const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require('./models');


const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const collectionRouter = require("./routes/Collections");
app.use("/collect", collectionRouter);
const itemsRouter = require("./routes/Items");
app.use("/items", itemsRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);



db.sequelize.sync().then(() =>{
    app.listen(3001, () => {
        console.log('server running')
    });
});
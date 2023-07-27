require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleWare");
const path = require("path");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();
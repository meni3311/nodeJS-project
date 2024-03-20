const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const fileUpload = require('express-fileupload')
const { routesInit } = require("./routes/config_routes")
const app = express();

require("./db/mongoConect");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 * 5 }
}))

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());

routesInit(app);


app.get("/", (req, res) => {
    res.json({ msg: "hi lalaoh" });
})

const server = http.createServer(app);
const port = process.env.PORT || "3001";
server.listen(port);


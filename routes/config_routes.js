const route1 = require("./route1");
const route2 = require("./route2");
const cakesR = require("./cakes");
const carsR = require("./cars");
const iceR = require("./iceCreams");
const consolesR = require("./consoles");
const usersR = require("./users");
const cookieR = require("./cookie");
const fileUploadR = require("./fileUpload")

exports.routesInit = (app) => {
    app.use("/route1",route1);
    app.use("/route2",route2);
    app.use("/cakes",cakesR);
    app.use("/cars",carsR);
    app.use("/consoles",consolesR);
    app.use("/ice",iceR);
    app.use("/users", usersR);
    app.use("/cookie", cookieR);
    app.use("/fileUpload", fileUploadR)
}

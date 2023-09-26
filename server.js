const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");
const serverless = require("serverless-http");
const app = express();
const path = require("path");
app.use(compression({ threshold: 500 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV == "production") {
    console.log = function () { };
}


app.use(express.json());
const staticpath = path.join(__dirname, "./public");

app.use(express.static(staticpath));
app.use(express.static('images'));
app.get("/", (req, res) => {
    return res.send("Hello World!");
});
const labour = require("./route/labour_route");
const customer = require("./route/customer_route");
const customerwork = require("./route/customerwork_route");
const customerating = require("./route/customer_rating_route");
const startduty = require("./route/startduty_route");
const admin = require('./route/admin_route')
const privacy = require('./route/privacy_router')
const contact = require('./route/contact');
const payment = require('./route/payment_router');
const order = require('./route/order_router');
const notify = require('./route/notify_router')
const banner = require('./route/banner');
const terms = require('./route/terms');
const active = require('./route/active_users')
const invoice = require('./route/invoice_router')


app.use(labour);
app.use(customer);
app.use(customerwork);
app.use(customerating);
app.use(startduty);
app.use(admin);
app.use(privacy);
app.use(contact);
app.use(payment);
app.use(order);
app.use(notify);
app.use(banner);
app.use(terms);
app.use(active);
app.use(invoice)

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, }).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = { handler: serverless(app) };

const mongoose = require("mongoose");
const db = "mongodb+srv://spherex:spherex@cluster0.witlisi.mongodb.net/spherex?retryWrites=true&w=majority"


mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('error', (error) => console.log(error));




await mongoose.connect(db|| "mongodb+srv://ankit:ankit@cluster0.vkljao5.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
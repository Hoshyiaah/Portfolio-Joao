const express = require("express")
const mysql = require("mysql2")
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000

const app = express();
app.use(bodyParser.json());
app.use(cors());

const reservationRoutes = require('./api/reservation');
app.use('/api/reservation', reservationRoutes);

const reservedDatesRouter = require('./api/alrReserved');
app.use('/api/alrReserved', reservedDatesRouter);

const connexion = mysql.createConnection({
    host: 'localhost', //Server Name
    port: '3308', //Port
    user: 'root', //Database Server Username
    password: '', //Username Password
    database: 'portfolioex' //Database Name
})

connexion.connect((err) => {
    if(err) {
        console.error('Connexion error : '+err.stack)
        return;
    }
    console.log('connexion database succeed')
})

connexion.query("SELECT * FROM reservations", (err, rows, fields) => {
    if(err) throw err;
    console.log("data :", rows)
})

app.listen(port, () => (
    console.log('server is online')
))

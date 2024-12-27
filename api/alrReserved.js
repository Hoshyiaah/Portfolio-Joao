const express = require('express');
const cors = require('cors');
const mysql = require("mysql2");
const router = express.Router();

const app = express();
app.use(cors());

const connexion = mysql.createConnection({
    host: 'localhost', //Server Name
    port: '3308', //Port
    user: 'root', //Database Server Username
    password: '', //Username Password
    database: 'portfolioex' //Database Name
})

router.get('/', (req, res) => {
    const query = 'SELECT startDate, endDate FROM reservations';
    
    connexion.query(query, (err, results) => {
        if (err) {
            console.error('Error while getting database data', err);
            return res.status(500).json({ message: 'Server error' });
        }

        const reservedDates = [];

        results.forEach(row => {
            const start = new Date(row.startDate);
            const end = new Date(row.endDate);

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                reservedDates.push({
                    day: d.getDate(),
                    month: d.getMonth() + 1,
                    year: d.getFullYear()
                });
            }
        });

        res.json(reservedDates);
    });
});

module.exports = router;
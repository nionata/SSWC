const Example = require('../models/examples.server.model.js')
const express = require('../config/express')

exports.hello = function(req, res) {
    express.db.all("SELECT * FROM FLOWERS", (err, rows) => {
        res.send(rows)
    })
};
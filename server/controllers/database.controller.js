const sqlite3 = require('sqlite3').verbose();

let db;

exports.initiate = function() {
    db = new sqlite3.Database('./server/controllers/db/flowers2019.db', (err) => {
        if(err) {
            console.log(err.message);
        }
    
        else console.log('Connected to flowers2019 database.');
    });
};

exports.close = function() {
    db.close((err) => {
        if(err) return console.error(err.message);
    
        console.log('Closed the database connection.');
    });
};

executeQuery = function(query, params, res) {
    //console.log(params);
    return new Promise(resolve => {
        db.run(sanitize(query), params, function(err) {
            if(err) res.status(404).send(err);
            
            resolve();
        });
    });
    
};

executeRecentSightings = function(query, params, sightings) {

    return new Promise(resolve => {
        db.all(sanitize(query), params, (err, rows) => {
            if(err) console.log(err);

            else
            {
                rows.forEach((row) => {
                    //console.log(row);
                    sightings.push(row);
                });
            }

            resolve();
        });
    });
}

executeGetFlowers = function(flowers) {

    return new Promise(resolve => {
        let query = 'SELECT * FROM FLOWERS;';
        db.all(sanitize(query), [], (err, rows) => {
            if(err) console.log(err);

            else
            {
                rows.forEach((row) => {
                    flowers.push(row);
                });
            }

            resolve();
        });
    });
}

exports.getFlowers = async function(req, res) {
    let flowers = [];

    await executeGetFlowers(flowers);

    res.send(await flowers);
}

exports.recentSightings = async function(req, res) {
    let comname = req.flower;
    let query = 'SELECT * FROM SIGHTINGS WHERE NAME=? ORDER BY SIGHTED DESC LIMIT 10;';

    let sightings = [];

    await executeRecentSightings(query, [comname], sightings);

    res.send(await sightings);
};

exports.updateFlower = async function(req, res) {
    let genus = req.genus;
    let species = req.species;
    let comname = req.comname;

    let flower = req.flower;

    let queryFlowers = 'UPDATE FLOWERS SET GENUS=?, SPECIES=?, COMNAME=? WHERE COMNAME=?;';
    let querySightings = 'UPDATE SIGHTINGS SET NAME=? WHERE NAME=?;';

    await executeQuery(queryFlowers, [genus, species, comname, flower], res);
    await executeQuery(querySightings, [comname, flower], res);

    console.log(`Row(s) updated: ${this.changes}`);
    res.send(`Row(s) updated: ${this.changes}`);
};

exports.newSighting = async function(req, res) {
    let name = req.name;
    let person = req.person;
    let location = req.location;
    let sighted = req.sighted;

    let query = 'INSERT INTO SIGHTINGS VALUES(?, ?, ?, ?);';

    await executeQuery(query, [name, person, location, sighted], res);

    console.log(`A row has been inserted with rowid ${this.lastID}`);
    res.send(`A row has been inserted with rowid ${this.lastID}`);
};

exports.deleteFlower = async function(req, res) {
    let queryFlowers = 'DELETE FROM FLOWERS WHERE COMNAME=?;';
    let querySightings = 'DELETE FROM SIGHTINGS WHERE NAME=?';;

    await executeQuery(queryFlowers, [req.flower], res);
    await executeQuery(querySightings, [req.flower], res);

    console.log(`Row(s) deleted ${this.changes}`);
    res.send(`Row(s) deleted ${this.changes}`);
};

exports.deleteSighting = async function(req, res) {
    let name = req.name;
    let person = req.person;
    let location = req.location;
    let sighted = req.sighted;

    let query = 'DELETE FROM SIGHTINGS WHERE NAME=? AND PERSON=? AND LOCATION=? AND SIGHTED=?;';

    await executeQuery(query, [name, person, location, sighted], res);

    console.log(`Row(s) deleted ${this.changes}`);
    res.send(`Row(s) deleted ${this.changes}`);
};

exports.getFlower = function(req, res, next, id) {
    if(req) req.flower = decodeURIComponent(id);

    next();
}

exports.getSighting = function(req, res, next, id) {
    let parts = decodeURIComponent(id).split('#');
    
    try{
        req.name = parts[0];
        req.person = parts[1];
        req.location = parts[2];
        req.sighted = parts[3];
    }catch(e) {
        res.status(404).send('Error: Sighting not formatted properly!');
    }
    
    next();
}

exports.getUpdatedFlower = function(req, res, next, id) {
    let parts = decodeURIComponent(id).split('#');

    try{
        req.genus = parts[0];
        req.species = parts[1];
        req.comname = parts[2];
    }catch(e) {
        res.status(404).send('Error: Flower not formatted properly!');
    }

    next();
}

sanitize = function(query) {
    return query;
};
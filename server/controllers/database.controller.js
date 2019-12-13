const sqlite3 = require('sqlite3').verbose();
const imagesearch = require('../imagesearch');

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
    console.log(params);
    return new Promise(resolve => {
        db.run(sanitize(query), params, function(err) {
            if(err && !res.headersSent) res.status(404).send(err);

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

executeCheckMember = function(req, res) {

    return new Promise(resolve => {
        let query = 'SELECT * FROM MEMBERS WHERE NAME=?;';
        db.all(sanitize(query), [req.member], (err, rows) => {
            if(err) console.log(err);

            if(rows.length > 0) {
                req.session.user = req.member
                res.send(true);
            } else {
                res.send(false);
            } 

            resolve();
        });
    })
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
    if(!res.headersSent) res.send(`Row(s) updated: ${this.changes}`);
};

exports.newSighting = async function(req, res) {
    let name = req.name;
    let person = req.person;
    let location = req.location;
    let sighted = req.sighted;

    let query = 'INSERT INTO SIGHTINGS VALUES(?, ?, ?, DATE(?));';

    await executeQuery(query, [name, person, location, sighted], res);

    console.log(`A row has been inserted with rowid ${this.lastID}`);
    if(!res.headersSent) res.send(`A row has been inserted with rowid ${this.lastID}`);
};

exports.deleteFlower = async function(req, res) {
    let queryFlowers = 'DELETE FROM FLOWERS WHERE COMNAME=?;';
    let querySightings = 'DELETE FROM SIGHTINGS WHERE NAME=?;';;

    await executeQuery(queryFlowers, [req.flower], res);
    await executeQuery(querySightings, [req.flower], res);

    console.log(`Row(s) deleted ${this.changes}`);
    if(!res.headersSent) res.send(`Row(s) deleted ${this.changes}`);
};

exports.deleteSighting = async function(req, res) {
    let name = req.name;
    let person = req.person;
    let location = req.location;
    let sighted = req.sighted;

    let query = 'DELETE FROM SIGHTINGS WHERE NAME=? AND PERSON=? AND LOCATION=? AND SIGHTED=?;';

    await executeQuery(query, [name, person, location, sighted], res);

    console.log(`Row(s) deleted ${this.changes}`);
    if(!res.headersSent) res.send(`Row(s) deleted ${this.changes}`);
};

exports.ping = async function(req, res) {
    return res.send(req.session.user)
}

exports.checkMember = async function(req, res) {
    await executeCheckMember(req, res);
}

exports.addMember = async function(req, res) {

    return new Promise(resolve => {
        let query = 'INSERT INTO MEMBERS VALUES(?, ?, ?);';
        db.all(sanitize(query), [req.member, new Date(), 0], (err, rows) => {
            if(!err) {
                req.session.user = req.member
                res.send(true);
            } else {
                console.log(err);
                res.send(false);
            } 

            resolve();
        });
    })
}

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

exports.getMember = function(req, res, next, id) {
    req.member = id;

    next();
}

getFlowerNames = async function(names) {
    return new Promise((resolve) => {
        let query = 'SELECT * FROM FLOWERS;';
        db.all(query, [], (err, rows) => {
            if(err) console.log(err);
    
            rows.forEach((row) => {
                names.push(row.COMNAME);
            });

            resolve();
        });
    });
}

exports.addFlowerImages = async function() {
    let addColQuery = 'ALTER TABLE FLOWERS ADD IMAGE VARCHAR;';
    db.run(addColQuery, [], function(err) {
        if(err) console.log(err);
    });

    let flowers = [];
    await getFlowerNames(flowers);
    console.log(flowers);

    let flowerImages = []; 
    await imagesearch.getFlowerImages(flowers, flowerImages);
    console.log(flowerImages);

    for(let i = 0; i < flowers.length; i++)
    {
        let flower = flowers[i];
        let imageUrl;
        for(let j = 0; j < flowerImages.length; j++)
        {
            if(flowerImages[j].flower === flower)
            {
                imageUrl = flowerImages[j].imageUrl;
                break;
            }
        }

        let query = 'UPDATE FLOWERS SET IMAGE=? WHERE COMNAME=?;';

        db.run(query, [imageUrl, flower], function(err) {
            if(err) console.log(err);
        });
    }
};

exports.addFlowerImagesIfNeeded = function() {
    let query = 'SELECT * FROM FLOWERS;';
    db.all(query, [], (err, rows) => {
        //console.log(rows);

        if(err || typeof(rows) === 'undefined' || typeof(rows[0].IMAGE) === 'undefined' || rows[0].IMAGE === null)
        {
            console.log('Adding flower images...');
            this.addFlowerImages();
        }
        else
        {
            console.log('Flower images already in table.');
        }
    }); 
};

exports.createIndices = function() {
    console.log('Creating indices...');
    let queries = ['CREATE INDEX IF NOT EXISTS NAMEINDEX ON SIGHTINGS(NAME);', 'CREATE INDEX IF NOT EXISTS PERSONINDEX ON SIGHTINGS(PERSON);', 'CREATE INDEX IF NOT EXISTS LOCATIONINDEX ON SIGHTINGS(LOCATION);', 'CREATE INDEX IF NOT EXISTS SIGHTEDINDEX ON SIGHTINGS(SIGHTED);'];

    for(let i = 0; i < queries.length; i++)
    {
        db.run(queries[i], [], function(err) {
            if(err) console.log(err);
        });
    }
};

exports.createLogs = function() {
    console.log('Creating logs...');
    let tableQueries = ['CREATE TABLE IF NOT EXISTS FLOWERSLOG(GENUS VARCHAR, SPECIES VARCHAR, COMNAME VARCHAR, UPDATEDON DATETIME);', 'CREATE TABLE IF NOT EXISTS FLOWERSDELETES(GENUS VARCHAR, SPECIES VARCHAR, COMNAME VARCHAR, DELETEDON DATETIME);', 'CREATE TABLE IF NOT EXISTS SIGHTINGSLOG(NAME VARCHAR, PERSON VARCHAR, LOCATION VARCHAR, SIGHTED DATETIME, UPDATEDON DATETIME);', 'CREATE TABLE IF NOT EXISTS SIGHTINGSDELETES(NAME VARCHAR, PERSON VARCHAR, LOCATION VARCHAR, SIGHTED DATETIME, DELETEDON DATETIME);'];
    let triggerQueries = ['CREATE TRIGGER IF NOT EXISTS FLOWERLOGINSERTTRIG AFTER INSERT ON FLOWERS BEGIN INSERT INTO FLOWERSLOG VALUES(NEW.GENUS, NEW.SPECIES, NEW.COMNAME, DATE(\'now\')); END;', 'CREATE TRIGGER IF NOT EXISTS FLOWERLOGUPDATETRIG AFTER UPDATE ON FLOWERS BEGIN INSERT INTO FLOWERSLOG VALUES(NEW.GENUS, NEW.SPECIES, NEW.COMNAME, DATE(\'now\')); END;', 'CREATE TRIGGER IF NOT EXISTS FLOWERDELETESTRIG AFTER DELETE ON FLOWERS BEGIN INSERT INTO FLOWERSDELETES VALUES(OLD.GENUS, OLD.SPECIES, OLD.COMNAME, DATE(\'now\')); END;', 'CREATE TRIGGER IF NOT EXISTS SIGHTINGLOGINSERTTRIG AFTER INSERT ON SIGHTINGS BEGIN INSERT INTO SIGHTINGSLOG VALUES(NEW.NAME, NEW.PERSON, NEW.LOCATION, NEW.SIGHTED, DATE(\'now\')); END;', 'CREATE TRIGGER IF NOT EXISTS SIGHTINGLOGUPDATETRIG AFTER UPDATE ON SIGHTINGS BEGIN INSERT INTO SIGHTINGSLOG VALUES(NEW.NAME, NEW.PERSON, NEW.LOCATION, NEW.SIGHTED, DATE(\'now\')); END;', 'CREATE TRIGGER IF NOT EXISTS SIGHTINGDELETESTRIG AFTER DELETE ON SIGHTINGS BEGIN INSERT INTO SIGHTINGSDELETES VALUES(OLD.NAME, OLD.PERSON, OLD.LOCATION, OLD.SIGHTED, DATE(\'now\')); END;'];

    for(let i = 0; i < tableQueries.length; i++)
    {
        let tableQuery = tableQueries[i];

        db.run(tableQuery, [], function(err) {
            if(err) console.log(err);
        });
    }

    for(let i = 0; i < triggerQueries.length; i++)
    {
        let triggerQuery = triggerQueries[i];

        db.run(triggerQuery, [], function(err) {
            if(err) console.log(err);
        });
    }
}

sanitize = function(query) {
    return query;
};
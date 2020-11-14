const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const expressSession = require('express-session');

app.use(expressSession({
    name: "humanSessionCookie",
    human: "express session human",
    resave: false,
    saveUninitialized: false
}));

const human = require("./human.js");

const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

app.post('/login', (req,res) => {

    let user = req.body.user;
    let password = req.body.password;

    let user_data = login_data.get(user);
    if (user_data == null) {
        res.status(404).send("Not found");
        return;
    }
    if (user_data.password == password) {
        console.log("User " + user + " credentials valid");
        req.session.user = user;
        res.json(true);
        return;
    }
    res.status(403).send("Unauthorized");
});

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})

app.get('/human', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    res.json(human.getAllIDsForOwner(req.session.user));
    return;
});

app.get('/human/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = human.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }

    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    res.json(s);
} );

app.post('/human', (req, res)=> {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = human.create(req.session.user, req.body.human);
    if (s == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(s);
});

app.put('/human/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = human.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }
    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }
    s.update(req.body.human);

    res.json(s.id);
});

app.delete('/human/:id', (req, res) => {
    if (req.session.user == undefined) {
        res.status(403).send("Unauthorized");
        return;
    }

    let s = human.findByID(req.params.id);
    if (s == null) {
        res.status(404).send("Not found");
        return;
    }

    if (s.owner != req.session.user) {
        res.status(403).send("Unauthorized");
        return;
    }

    s.delete();
    res.json(true);
})

const port = 3030;
app.listen(port, () => {
    console.log("User Login Example up and running on port " + port);
});
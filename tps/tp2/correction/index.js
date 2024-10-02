'use strict;';

import express from 'express';
import faker from 'faker';
import cors from 'cors';
import bodyParser from 'body-parser';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

// Initialisation serveur
const app = express();
// Sécurité
app.use(cors());
// Configuration parser body
app.use(bodyParser.json());

// Configuration Faker
faker.locale = 'fr';


/* Routes Express */
// Route /
app.get('/', (req, res) => {
    res.send('Server is OK :)');
});

// Récupération de tous les paris avec SQLite
app.get('/paris', async (req, res) => {
    const sqlQuery = 'SELECT rowid, * FROM paris ORDER BY date DESC';

    try {
        const paris = await db.all(sqlQuery);

        return res.send(paris);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Ajout d'un pari avec SQLite
app.post('/paris', async (req, res) => {
    const { auteur, cheval } = req.body;

    // const auteur = req.body.auteur;
    // const cheval = req.body.cheval;

    const sqlQuery = 'INSERT INTO paris VALUES(?, ?, DATETIME(\'now\', \'localtime\'))';

    try {
        await db.run(sqlQuery, [auteur, cheval]);

        return res.status(201).send('Pari créé');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Génération de 10 paris aléatoires avec SQLite
app.post('/paris/generate', async (req, res) => {
    let sqlQuery = 'INSERT INTO paris VALUES';
    const values = [];

    const NB_VALUES = 10;
    for (let i = 0; i < NB_VALUES; i++) {
        const auteur = faker.name.firstName();
        const cheval = faker.random.number({ min: 1, max: 10 });

        sqlQuery += '(?, ?, DATETIME(\'now\', \'localtime\'))';
        if (i !== (NB_VALUES - 1)) {
            sqlQuery += ',';
        } else {
            sqlQuery += ';';
        }
        values.push(auteur, cheval);
    }

    try {
        await db.run(sqlQuery, values);

        return res.status(201).send('10 Paris créés');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Suppression d'un pari avec SQLite
app.delete('/paris/:id', async (req, res) => {
    const { id } = req.params;

    const sqlQuery = 'DELETE FROM paris WHERE rowid = ?';

    try {
        await db.run(sqlQuery, id);

        return res.status(200).send('Pari supprimé');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


/* Partie SQLite */
let db;
async function initDatabase() {
    // Connexion à la base de donnée avec SQLite
    db = await open({ filename: 'database-phe.db', driver: sqlite3.Database });

    // Initialisation de la table paris
    await db.exec('DROP TABLE IF EXISTS paris');
    await db.exec('CREATE TABLE paris(auteur TEXT, cheval INTEGER, date TEXT)');
    console.log('Table paris créée');

    console.log('Base de donnée initialisée');
}


/* Démarrage BDD et serveur */
initDatabase().then(() =>
    app.listen(3000, () =>
        console.log('Serveur phe-backend démarré !'),
    ),
);

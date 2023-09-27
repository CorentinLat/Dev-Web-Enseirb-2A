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
// TODO

// Récupération de tous les paris avec SQLite
// TODO

// Ajout d'un pari avec SQLite
// TODO

// Génération de 10 paris aléatoires avec SQLite
// TODO

// Suppression d'un pari avec SQLite
// TODO


/* Partie SQLite */
let db;
async function initDatabase() {
    // Connexion à la base de donnée avec SQLite
    db = await open({ filename: 'database-phe.db', driver: sqlite3.Database });

    // Initialisation de la table paris
    // TODO

    console.log('Base de donnée initialisée');
}


/* Démarrage BDD et serveur */
initDatabase().then(() =>
    app.listen(3000, () =>
        console.log('Serveur phe-backend démarré !'),
    ),
);

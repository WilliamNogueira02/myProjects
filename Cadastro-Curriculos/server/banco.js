const Database = require('better-sqlite3');
const db = new Database('curriculos.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS curriculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        telefone TEXT NOT NULL UNIQUE,
        endereco TEXT NOT NULL,
        objetivo TEXT,
        formacao TEXT NOT NULL,
        experiencia TEXT,
        habilidades TEXT,
        arquivo TEXT
    )
`);

console.log(db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all());
module.exports = db;
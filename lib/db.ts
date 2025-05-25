import Database from 'better-sqlite3';

declare global {
  // eslint-disable-next-line no-var
  var db: Database.Database | undefined;
}

let db: Database.Database;

if (!global.db) {
  db = new Database('db.sqlite');
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      give TEXT NOT NULL,
      receive TEXT NOT NULL,
      link TEXT NOT NULL,
      discord TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  global.db = db;
} else {
  db = global.db;
}

export default db;
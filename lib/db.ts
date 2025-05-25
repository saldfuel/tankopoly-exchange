import Database from 'better-sqlite3';

let db: Database.Database;

if (!globalThis.db) {
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
  globalThis.db = db;
} else {
  db = globalThis.db;
}

export default db;
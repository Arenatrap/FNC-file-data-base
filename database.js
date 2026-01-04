const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./discord_data.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS servers (
    server_id TEXT PRIMARY KEY,
    name TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS channels (
    channel_id TEXT PRIMARY KEY,
    server_id TEXT,
    name TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    username TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    message_id TEXT PRIMARY KEY,
    server_id TEXT,
    channel_id TEXT,
    user_id TEXT,
    content TEXT,
    timestamp TEXT
  )`);
});

module.exports = db;
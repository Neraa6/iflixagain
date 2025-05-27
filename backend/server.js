// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());


// POST: simpan email
app.post('/emails', (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: 'Email tidak valid (harus Gmail)' });
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  db.emails.push({ email });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json({ message: 'Email berhasil disimpan' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// POST: simpan email
app.post('/emails', (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: 'Email tidak valid (harus Gmail)' });
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  db.emails.push({ email });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json({ message: 'Email berhasil disimpan' });
});

// GET: tampilkan semua email
app.get('/emails', (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  res.json(db.emails);
});


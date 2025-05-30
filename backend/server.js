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



function readDB() {
  const raw = fs.readFileSync(dbPath);
  return JSON.parse(raw);
}

// POST: simpan email
app.post('/emails', (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.endsWith('@gmail.com') || !password) {
    return res.status(400).json({ error: 'Email (harus Gmail) dan password wajib diisi' });
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  // Cek duplikat
  const exists = db.emails.find(user => user.email === email);
  if (exists) {
    return res.status(400).json({ error: 'Email sudah terdaftar' });
  }

  db.emails.push({ email, password });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(201).json({ message: 'Akun berhasil didaftarkan' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// GET: tampilkan semua email
app.get('/emails', (req, res) => {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  res.json(db.emails);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const user = db.emails.find(u => u.email === email && u.password === password);
  if (user) {
    return res.status(200).json({ message: 'Login berhasil', user });
  } else {
    return res.status(401).json({ error: 'Email atau password salah' });
  }
});

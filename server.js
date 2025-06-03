const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

// Load data from file
function loadData() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
  }
  const raw = fs.readFileSync(DB_FILE);
  return JSON.parse(raw);
}

// Save data to file
function saveData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Gagal baca data' });
    const users = JSON.parse(data);
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      res.status(200).json({ message: 'Login berhasil', user });
    } else {
      res.status(401).json({ message: 'Email atau password salah' });
    }
  });
});

// Create new user
app.post('/users', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  const data = loadData();
  data.users.push({ email, password });
  saveData(data);

  res.status(201).json({ message: 'User created', email });
});

// Get all users
app.get('/users', (req, res) => {
  const data = loadData();
  res.json(data.users);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_DB = path.join(__dirname, "users.json");
const SECRET_KEY = "supersecretkey123"; // Bunu production'da .env dosyasına al

// Kullanıcıları oku
const readUsers = () => {
  if (!fs.existsSync(USERS_DB)) return [];
  const data = fs.readFileSync(USERS_DB);
  return JSON.parse(data);
};

// Kullanıcıları kaydet
const saveUsers = (users) => {
  fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
};

// Register endpoint
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Eksik alanlar var" });
  }

  const users = readUsers();
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Email zaten kayıtlı" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, email, password: hashedPassword };
  users.push(newUser);
  saveUsers(users);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, {
    expiresIn: "1d",
  });

  res.json({
    message: "Kayıt başarılı",
    user: { id: newUser.id, username: newUser.username, email: newUser.email },
    token,
  });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.email === email);
  if (!user)
    return res.status(400).json({ message: "Email veya şifre yanlış" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Email veya şifre yanlış" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1d",
  });

  res.json({
    message: "Giriş başarılı",
    user: { id: user.id, username: user.username, email: user.email },
    token,
  });
});

// Middleware ile token doğrulama örneği (isteğe bağlı)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});

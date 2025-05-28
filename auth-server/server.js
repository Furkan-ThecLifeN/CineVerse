const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const users = []; // Basit hafızada kullanıcılar (gerçek projede DB olur)

app.post("/signup", (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "Eksik alan var" });
  }
  // Kullanıcı var mı kontrol et
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: "Bu email zaten kayıtlı" });
  }
  // Yeni kullanıcı oluştur
  const newUser = { email, password, username, avatarUrl: null };
  users.push(newUser);
  res.json({ username, email, avatarUrl: null });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Eksik alan var" });
  }
  // Kullanıcıyı bul
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "Email veya şifre yanlış" });
  }
  res.json({
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
  });
});

app.listen(5000, () => {
  console.log("Backend server 5000 portunda çalışıyor");
});

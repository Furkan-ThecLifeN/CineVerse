import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = 5000;
const SECRET = "your_secret_key"; // production’da .env’den alman önerilir
const USERS_FILE = path.resolve("users.json");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    return [];
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

// Kayıt
app.post("/register", async (req, res) => {
  const { username, nickname, email, password } = req.body;

  if (!username || !nickname || !email || !password) {
    return res.status(400).json({ message: "Tüm alanlar gereklidir." });
  }

  const users = await readUsers();
  const emailExists = users.find((u) => u.email === email);
  const nicknameExists = users.find((u) => u.nickname === nickname);

  if (emailExists || nicknameExists) {
    return res
      .status(400)
      .json({
        message: "Bu e-posta veya takma ad (nickname) zaten kullanılıyor.",
      });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    nickname,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  await writeUsers(users);

  const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: "1d" });
  return res.status(201).json({
    user: {
      id: newUser.id,
      username: newUser.username,
      nickname: newUser.nickname,
      email: newUser.email,
    },
    token,
  });
});

app.post("/login", async (req, res) => {

  const {
    identifier,
    email: emailField,
    nickname: nicknameField,
    password,
  } = req.body;
  const lookup = identifier || emailField || nicknameField;

  if (!lookup || !password) {
    return res
      .status(400)
      .json({
        message: "Email/Nickname (veya identifier) ve şifre gereklidir.",
      });
  }

  const users = await readUsers();
  const user = users.find((u) => u.email === lookup || u.nickname === lookup);

  if (!user) {
    console.log("[LOGIN] Kullanıcı bulunamadı:", lookup);
    return res.status(401).json({ message: "Kullanıcı bulunamadı." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("[LOGIN] Şifre yanlış. Kullanıcı:", lookup);
    return res.status(401).json({ message: "Şifre hatalı." });
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });
  return res.json({
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
    },
    token,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

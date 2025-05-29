require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Comment = require("./models/Comment");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Middleware: Kullanıcı doğrulama
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token gerekli" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user)
      return res.status(401).json({ message: "Geçersiz kullanıcı" });
    next();
  } catch {
    return res.status(401).json({ message: "Geçersiz token" });
  }
};

// Kayıt
app.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "Eksik alan var" });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Bu email zaten kayıtlı" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, username });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({
    token,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
  });
});

// Giriş
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Email veya şifre yanlış" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({
    token,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatarUrl,
  });
});

// Yorumları getir
app.get("/comments", async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 });
  res.json(comments);
});

// Yorum ekle
app.post("/comments", authMiddleware, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Yorum boş olamaz" });
  const comment = await Comment.create({
    userId: req.user._id,
    username: req.user.username,
    avatarUrl: req.user.avatarUrl,
    text,
  });
  res.json(comment);
});

// Yorum güncelle
app.put("/comments/:id", authMiddleware, async (req, res) => {
  const { text } = req.body;
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Yorum bulunamadı" });
  if (String(comment.userId) !== String(req.user._id)) {
    return res.status(403).json({ message: "Yetkisiz" });
  }
  comment.text = text;
  await comment.save();
  res.json(comment);
});

// Yorum sil
app.delete("/comments/:id", authMiddleware, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: "Yorum bulunamadı" });
  if (String(comment.userId) !== String(req.user._id)) {
    return res.status(403).json({ message: "Yetkisiz" });
  }
  await comment.remove();
  res.json({ message: "Yorum silindi" });
});

// Server başlat
app.listen(5000, () => {
  console.log("Server 5000 portunda çalışıyor");
});

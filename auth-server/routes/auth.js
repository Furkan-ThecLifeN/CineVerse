const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Kayıt
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Tüm alanlar zorunludur." });

  try {
    // Kullanıcı var mı kontrolü
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: "Kullanıcı zaten kayıtlı." });

    // Şifre hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Dönüşte şifreyi göndermiyoruz
    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// Giriş
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email ve şifre gereklidir." });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Kullanıcı bulunamadı." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Şifre yanlış." });

    res.json({
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

module.exports = router;

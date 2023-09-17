const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const secretKey = "mySecretKey123!@#";

app.use(bodyParser.json());
app.use(cors());

const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Поиск пользователя по имени и паролю (здесь вы можете использовать любой способ аутентификации)
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Генерация JWT токена
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  res.json({ token });
});

// Запуск сервера
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware para tratar JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir requisições CORS da origem correta
app.use(cors({
  origin: 'http://localhost:3001', // Origem do frontend (React)
}));

// Configuração de conexão com o MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',  // Endereço do servidor MySQL
  port: 3306,
  user: 'root',       // Usuário do MySQL
  password: 'Sd.iago12',  // Senha do MySQL
  database: 'login',  // Nome do banco de dados
});

// Testa a conexão com o banco de dados MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ', err);
    return;
  }
  console.log('Conectado ao MySQL!');
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Valida se os dados foram enviados corretamente
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  // Query para verificar as credenciais do usuário
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro no MySQL:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    // Verifica se algum usuário foi encontrado com as credenciais
    if (results.length > 0) {
      return res.json({ message: 'Login bem-sucedido!' });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  });
});

// Rota de cadastro
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Valida se os dados foram enviados corretamente
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  // Query para inserir um novo usuário no banco de dados
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar usuário no MySQL:', err);
      return res.status(500).json({ message: 'Erro no servidor.' });
    }

    return res.json({ message: 'Cadastro bem-sucedido!' });
  });
});

// Inicia o servidor na porta 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
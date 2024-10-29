import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Atualiza os campos do formulário
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Valida os campos obrigatórios
  const validateFields = () => {
    const { name, email, password } = formData;
    const newErrors = {};
    if (!email) newErrors.email = 'Email é obrigatório.';
    if (!password) newErrors.password = 'Senha é obrigatória.';
    if (!isLogin && !name) newErrors.name = 'Nome é obrigatório no cadastro.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envia a requisição de login/cadastro
  const handleSubmit = async () => {
    if (!validateFields()) return;
    const endpoint = isLogin ? 'login' : 'register';
    
    try {
      const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      response.ok ? onLoginSuccess() : alert(data.message);
    } catch (error) {
      alert('Erro ao buscar');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>

      {!isLogin && (
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
      )}
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <button onClick={handleSubmit}>{isLogin ? 'Entrar' : 'Cadastrar'}</button>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Criar Conta' : 'Já tem uma conta? Faça Login'}
      </button>
    </div>
  );
}

export default Login;
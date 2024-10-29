import React, { useState } from 'react';
import Header from "./component/Header/Header";
import Footer from "./component/Footer";
import Slider from "./component/Carossel/Slider";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Estado de autenticação

  // Função para ser passada ao Login.js para atualizar o estado após o login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);  // Atualiza o estado para indicar que o usuário fez login
  };

  return (
    <>
      {/* Exibe a tela de login se o usuário não estiver autenticado */} 
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* Se autenticado, exibe a página principal */} 
          <Login/>
          <Header />
          <Slider />
          <Home />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
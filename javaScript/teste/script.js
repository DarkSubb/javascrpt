document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Enviar dados de login para o servidor
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Login bem-sucedido!');
              // Redirecionar para a página inicial, por exemplo
              window.location.href = 'index.html';
          } else {
              alert('Falha no login!');
          }
      });
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // Enviar dados de cadastro para o servidor
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, password: newPassword })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Cadastro bem-sucedido!');
              // Redirecionar para a página de login, por exemplo
              window.location.href = 'login.html';
          } else {
              alert('Falha no cadastro!');
          }
      });
});

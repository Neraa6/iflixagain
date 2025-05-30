  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorDiv = document.getElementById('loginError');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        errorDiv.style.display = 'block';
        return;
      }

      const data = await response.json();
      console.log(data.message);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      errorDiv.style.display = 'none';
      window.location.href = "../dashboard.html"; // arahkan ke dashboard
    } catch (error) {
      console.error('Login error:', error);
      errorDiv.style.display = 'block';
    }
  });